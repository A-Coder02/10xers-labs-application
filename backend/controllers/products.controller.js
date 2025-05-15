const supabase = require("../supabase");

const createProduct = async (req, res) => {
  const { name, img_url, description, price, user_id } = req.body;
  if (!name || !price) {
    return res
      .status(400)
      .json({ data: null, error: "Name and price are required." });
  }

  const { data, error } = await supabase
    .from("products")
    .insert([{ name, img_url, description, price, user_id }])
    .single();

  if (error) {
    return res.status(500).json({ data: null, error: error.message });
  }
  res.status(201).json({ data, error: null });
};

const getProducts = async (req, res) => {
  try {
    // Extract query parameters for pagination and filtering
    const { page = 1, limit = 10, email } = req.query;

    // Convert page and limit to numbers
    const currentPage = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    // Calculate offset for pagination
    const offset = (currentPage - 1) * pageSize;

    // Supabase query to get the total count of products (with optional email filter)
    let countQuery = supabase
      .from("products")
      .select("id, user_id(id, email)", { count: "exact", head: true });

    if (email) {
      countQuery = countQuery.eq("user_id.email", email);
    }

    const { count, error: countError } = await countQuery;
    if (countError) {
      return res.status(500).json({ data: null, error: countError.message });
    }

    // Calculate total pages
    const totalPages = Math.ceil(count / pageSize);

    // Supabase query to fetch products with optional email filter and pagination
    let query = supabase
      .from("products")
      .select("id, name, img_url, description, price, user_id(id, email)")
      .range(offset, offset + pageSize - 1);

    if (email) {
      query = query.eq("user_id.email", email);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ data: null, error: error.message });
    }

    // Respond with paginated data and metadata
    res.status(200).json({
      data,
      pagination: {
        page: currentPage,
        limit: pageSize,
        totalItems: count,
        totalPages,
      },
      error: null,
    });
  } catch (err) {
    res.status(500).json({ data: null, error: err.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("products")
    .select("id, name, img_url, description, price, user_id(id, email)")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json({ data: null, error: error.message });
  }
  res.status(200).json({ data, error: null });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, img_url, description, price } = req.body;

  const { data, error } = await supabase
    .from("products")
    .update({ name, img_url, description, price })
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ data: null, error: error.message });
  }
  res.status(200).json({ data, error: null });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ data: null, error: error.message });
  }
  res
    .status(200)
    .json({ data: { message: "Product deleted successfully." }, error: null });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
