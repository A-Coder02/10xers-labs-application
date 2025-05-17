const bcrypt = require("bcryptjs");
const { generateTokens, verifyToken } = require("../utils/auth");
const supabase = require("../supabase");

const allowedRoles = ["admin", "user"];
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth APIs
 */
const registerUser = async (req, res) => {
  /* #swagger.tags = ['Users']
    #swagger.description = 'Update term and condition config'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: {
            email: "",
            password: "",
            role: ""
        }
    }
        */
  const { email, password, role } = req.body;

  // Validate role
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      error: "Invalid role. Allowed roles: admin, user.",
      status: false,
    });
  }

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email and password are required", status: false });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user in Supabase
    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password: hashedPassword, role }])
      .select();

    if (error)
      return res.status(500).json({ error: error.message, status: false });

    // Generate tokens right after registration
    const tokens = generateTokens({ email, role });

    res.status(201).json({
      message: "User registered successfully",
      data,
      tokens, // send access_token and refresh_token here
      status: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message, status: false });
  }
};

const loginUser = async (req, res) => {
  /* #swagger.tags = ['Users']
    #swagger.parameters['body'] = {
        in: 'body',
        schema: {
            email: "",
            password: "",
        }
    }
        */
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, email, password, role")
      .eq("email", email)
      .single();

    if (error || !data)
      return res
        .status(400)
        .json({ error: "Invalid credentials", status: false });

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ error: "Invalid credentials", status: false });

    // Generate tokens
    const tokens = generateTokens({ email, role: data.role });
    res.status(200).json({
      data: { id: data.id, email: data.email, role: data.role },
      tokens,
      status: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message, status: false });
  }
};

const getAccessToken = (req, res) => {
  // #swagger.tags = ['Users']
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
