import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { usePostReviewMutation } from '../../../redux/features/review/reviewsApi';

const PostAReview = ({ isModelOpen, handleClose }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  
  // State for comment, rating, and form submission status
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // Error message

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview] = usePostReviewMutation();

  // Handle rating click
  const handleRating = (star) => setRating(star);

  // Handle comment change
  const handleCommentChange = (e) => setComment(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newComment = {
      comment: comment,
      rating: rating,
      userId: user?._id,
      productId: id,
    };

    try {
      const response = await postReview(newComment).unwrap();
      setComment('');
      setRating(0);
      setErrorMessage(null);
      handleClose();
      refetch();
    } catch (error) {
      setErrorMessage('Failed to post review: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/90 items-center justify-center z-40 px-2 ${isModelOpen ? 'flex animate-fade-in' : 'hidden animate-fade-out'}`}>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Write a Review</h3>
          <button onClick={handleClose} className="text-2xl font-bold text-gray-600">&times;</button>
        </div>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-gray-700">Your Comment</label>
            <textarea
              rows="4"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write your review here..."
              className="w-full border border-gray-300 rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <p className="block text-gray-700">Rating</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-400'} text-xl`}
                  onClick={() => handleRating(star)}
                >
                  {rating >= star ? <i className="ri-star-fill"></i> : <i className="ri-star-line"></i>}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button onClick={handleClose} className="px-6 py-3 bg-gray-400 text-white rounded-lg">
              Cancel
            </button>

            <button type="submit" disabled={isSubmitting} className={`px-6 py-3 bg-primary text-white rounded-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAReview;
