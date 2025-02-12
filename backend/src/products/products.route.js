const express = require("express");
const mongoose = require("mongoose");
const Product = require("./products.model");
const User = require("../users/user.model"); // Import the User model
const Reviews = require("../reviews/reviews.model");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

// Post a product
router.post("/create-product", async (req, res) => {
  try {
    const { name, price, description, author } = req.body;

    // Validate required fields
    if (!name || !price || !author) {
      return res
        .status(400)
        .send({ error: "Name, price, and author are required" });
    }

    // Verify the author exists
    const existingAuthor = await User.findById(author);
    if (!existingAuthor) {
      return res.status(400).send({ error: "Invalid author ID" });
    }

    // Create and save the product
    const newProduct = new Product({ name, price, description, author });
    const savedProduct = await newProduct.save();

    //calculate the reviews

    const reviews = await Reviews.find({ productId: savedProduct._id });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const avarageRating = totalRating / reviews.length;
      savedProduct.rating = avarageRating;
      await savedProduct.save();
    }

    res.status(201).send(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .send({ error: "Failed to create product", details: error.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const {
      category,
      color,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    let filter = {};

    // Filter by category
    if (category && category !== "all") {
      filter.category = category;
    }

    // Filter by color
    if (color && color !== "all") {
      filter.color = color;
    }

    // Filter by price range
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }

    // Pagination setup
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));

    // Fetch products
    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "email")
      .sort({ createdAt: -1 });

    // Send response
    res.status(200).send({ products, totalPages, totalProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .send({ error: "Error fetching products", details: error.message });
  }
});

//get single product

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ error: "Invalid product ID" });
    }

    // Fetch product
    const product = await Product.findById(productId).populate(
      "author",
      "email username"
    );
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Fetch reviews
    const reviews = await Reviews.find({ productId }).populate(
      "userId",
      "username email"
    );
    res.status(200).send({ product, reviews });
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .send({ error: "Failed to fetch product", details: error.message });
  }
});

//update a product

router.patch("/update-product/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { ...req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating the product:", error);
    res.status(500).send({
      error: "Failed to update the product",
      details: error.message,
    });
  }
});

//delete a product

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const productId = req.params.id;

    // 1️⃣ Check if the productId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({
        error: "Invalid product ID",
        details: "The provided product ID is not a valid MongoDB ObjectId",
      });
    }

    // 2️⃣ Delete the product by ID
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // 3️⃣ Check if product was not found
    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    // 4️⃣ Delete related reviews for the product
    await Reviews.deleteMany({ productId: productId });

    // 5️⃣ Send success response
    res.status(200).send({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting the product:", error.stack); // Stack trace for better debugging

    if (error.name === "CastError") {
      return res.status(400).send({
        error: "Invalid product ID",
        details: error.message,
      });
    }

    res.status(500).send({
      error: "Failed to delete the product",
      details: error.message,
    });
  }
});


//get releted peoduct
router.get("/related/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Validate the product ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ 
        error: "Invalid product ID", 
        details: "The provided product ID is not a valid MongoDB ObjectId" 
      });
    }

    // 2️⃣ Find the product using its ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // 3️⃣ Build a regex for name matching
    const titleRegex = new RegExp(
      product.name
        .split(" ")
        .filter((word) => word.length > 1) // Remove small words like "a", "is", "of"
        .join("|"),
      "i"
    );

    // 4️⃣ Fetch related products
    const relatedProducts = await Product.find({
      _id: { $ne: id }, // Exclude the current product
      $or: [
        { name: { $regex: titleRegex } }, 
        { category: product.category }
      ]
    }).limit(10); // Limit to 10 related products for performance

    res.status(200).send({ 
      message: "Related products fetched successfully", 
      relatedProducts 
    });

  } catch (error) {
    console.error("Error fetching related products:", error.stack); // Log stack trace for debugging

    if (error.name === 'CastError') {
      return res.status(400).send({ 
        error: "Invalid product ID", 
        details: error.message 
      });
    }

    res.status(500).send({ 
      error: "Failed to fetch related products", 
      details: error.message 
    });
  }
});


module.exports = router;
