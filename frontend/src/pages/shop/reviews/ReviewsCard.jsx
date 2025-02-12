import React, { useState } from 'react';
import CustomerIcon from '../../../assets/user.png';
import { formatDate } from '../../../utils/formateDate';
import Rating from '../../../components/RatingStar';
import PostAReview from './PostAReview';

const ReviewsCard = ({ reviews }) => {
    const [isModelOpen, setIsModelOpen] = useState(false);

    const handleOpenReviewModel = () => {
        setIsModelOpen(true);
    };

    const handleCloseReviewModel = () => {
        setIsModelOpen(false);
    };

    return (
        <div className="my-6 bg-white p-8 rounded-lg shadow-md">
            <div>
                {reviews && reviews.length > 0 ? (
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Customer Reviews</h2>
                        <div className="space-y-6">
                            {reviews.map((review, index) => (
                                <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b">
                                    {/* User Icon and Info */}
                                    <div className="flex flex-col items-center md:items-start gap-4 md:w-1/4">
                                        <img
                                            src={CustomerIcon}
                                            alt="Customer"
                                            className="w-20 h-20 rounded-full border-2 border-gray-200 shadow-md"
                                        />
                                        <div className="text-center md:text-left">
                                            <p className="text-lg font-semibold text-primary capitalize">{review?.userId?.username}</p>
                                            <p className="text-xs italic text-gray-500">{formatDate(review?.updatedAt)}</p>
                                        </div>
                                    </div>

                                    {/* Review Content */}
                                    <div className="md:w-3/4 space-y-2">
                                        {/* Rating */}
                                        <div className="flex items-center">
                                            <Rating rating={review?.rating} />
                                        </div>

                                        {/* Review Comment */}
                                        <div className="border-t pt-4 mt-4 text-gray-700">
                                            <p className="text-base">{review?.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600">No Reviews Yet.</p>
                )}
            </div>

            {/* Add Review Button */}
            <div className="mt-12 text-center">
                <button
                    onClick={handleOpenReviewModel}
                    className="px-8 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark focus:outline-none transition duration-300 transform hover:scale-105 active:scale-95"
                >
                    Add A Review
                </button>
            </div>

            {/* Review Modal */}
            <PostAReview isModelOpen={isModelOpen} handleClose={handleCloseReviewModel} />
        </div>
    );
};

export default ReviewsCard;
