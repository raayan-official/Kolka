const express = require('express');
const Reviews = require('./reviews.model');
const Product = require('../products/products.model');
const router = express.Router();

//post a review
router.post("/post-review", async (req, res) => {
    try {
        const { comment, rating, productId, userId } = req.body;

        // Validate required fields
        if (!comment || !rating || !productId || !userId) {
            return res.status(400).json({ message: "All fields are required: comment, rating, productId, userId" });
        }

        // Upsert review (update if exists, create otherwise)
        await Reviews.findOneAndUpdate(
            { productId, userId },
            { comment, rating, productId, userId },
            { new: true, upsert: true }
        );

        // Calculate new average rating for the product
        const reviews = await Reviews.find({ productId });
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;

            // Update the product rating
            const product = await Product.findByIdAndUpdate(
                productId, 
                { rating: averageRating }, 
                { new: true, runValidators: false }
            );

            if (!product) {
                return res.status(404).json({ message: "Product not found." });
            }
        }

        res.status(200).json({ message: "Review processed successfully", reviews });
    } catch (error) {
        console.error("Error posting review:", error.message);
        res.status(500).json({ message: "An error occurred while posting the review.", error: error.message });
    }
});

// Total reviews count 
router.get("/total-reviews", async (req, res) => {
    try {
        const totalReviews = await Reviews.countDocuments({});
        res.status(200).json({ totalReviews });
    } catch (error) {
        console.error("Error in /total-reviews route:", error.message);
        res.status(500).json({ message: "Failed to get the total review count.", error: error.message });
    }
});

//get reviews by userid

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query; // default page = 1, limit = 10
    
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid User ID format" });
    }

    try {
        const reviews = await Reviews.find({ userId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found" });
        }

        res.status(200).json({ reviews, page: parseInt(page), limit: parseInt(limit) });
    } catch (error) {
        console.error(`Error fetching reviews for userId: ${userId}`, error);
        res.status(500).json({ message: "Failed to fetch reviews for this user." });
    }
});


module.exports = router;
