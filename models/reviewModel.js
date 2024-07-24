import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
  reviewText: {
    type: String,
    required: true 
    },
  rating: { 
    type: Number,
    required: true 
    },
  reviewedEntityId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true 
    },
  reviewedEntityType: { 
    type: String,
    enum: ['Tutor', 'TuitionCenter'], 
    required: true 
    },
  createdAt: { 
    type: Date, 
    default: Date.now 
    }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
