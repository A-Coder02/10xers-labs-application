const bcrypt = require("bcryptjs");
const { generateTokens, verifyToken } = require("../utils/auth");
const supabase = require("../supabase");

const allowedRoles = ["admin", "user"];

const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  // Validate role
  if (!allowedRoles.includes(role)) {
    return res
      .status(400)
      .json({ error: "Invalid role. Allowed roles: admin, user." });
  }

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user in Supabase
    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password: hashedPassword, role }])
      .select();

    if (error) return res.status(500).json({ error: error.message });

    // Generate tokens right after registration
    const tokens = generateTokens({ email, role });

    res.status(201).json({
      message: "User registered successfully",
      data,
      tokens, // send access_token and refresh_token here
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, email, password, role")
      .eq("email", email)
      .single();

    if (error || !data)
      return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Generate tokens
    const tokens = generateTokens({ email, role: data.role });
    res.status(200).json({
      data: { id: data.id, email: data.email, role: data.role },
      tokens,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decoded = verifyToken(refreshToken, "refresh");
    const newTokens = generateTokens({
      email: decoded.email,
      role: decoded.role,
    });
    res.status(200).json(newTokens);
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAccessToken,
};
