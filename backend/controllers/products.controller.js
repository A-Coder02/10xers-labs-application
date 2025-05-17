const supabase = require("../supabase");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth APIs
 */

const createProduct = async (req, res) => {
  /* #swagger.tags = ['Products']
    #swagger.parameters['body'] = {
        in: 'body',
        schema: {
            name: "",
            img_url: "",
            description: "",
            price: 0,
            user_id: ""
        }
    }
        */

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
  res
    .status(201)
    .json({ data, message: "Product created successfully.", error: null });
};

const getProducts = async (req, res) => {
  /* #swagger.tags = ['Products'] */

  try {
    const { page = 1, limit = 10, email } = req.query;
    const currentPage = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const offset = (currentPage - 1) * pageSize;

    let countQuery = supabase
      .from("products")
      .select("*, user_id(id, email)", { count: "exact", head: true });

    if (email) {
      countQuery = countQuery.eq("user_id.email", email);
    }

    const { count, error: countError } = await countQuery;
    if (countError) {
      return res.status(500).json({ data: null, error: countError.message });
    }

    const totalPages = Math.ceil(count / pageSize);

    let query = supabase
      .from("products")
      .select("id, name, img_url, description, price, user_id")
      .range(offset, offset + pageSize - 1);

    if (email) {
      const userQuery = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();
      query = query.eq("user_id", userQuery.data.id);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ data: null, error: error.message });
    }

    res.status(200).json({
      data,
      message: "Products retrieved successfully.",
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
  res
    .status(200)
    .json({ data, message: "Product retrieved successfully.", error: null });
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
  res
    .status(200)
    .json({ data, message: "Product updated successfully.", error: null });
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
