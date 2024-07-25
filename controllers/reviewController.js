import Review from '../models/reviewModel.js';
import Tutor from '../models/tutorModel.js';
import TuitionCenter from '../models/tuitioncenterModel.js';

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { userId, reviewText, rating, reviewedEntityId, reviewedEntityType } = req.body;

    if (!userId || !reviewText || rating == null || !reviewedEntityId || !reviewedEntityType) {
      return res.status(400).send({ message: 'All fields are required' });
    }


    let entity;
    if (reviewedEntityType === 'Tutor') {
      entity = await Tutor.findById(reviewedEntityId);
    } else if (reviewedEntityType === 'TuitionCenter') {
      entity = await TuitionCenter.findById(reviewedEntityId);
    }

    if (!entity) {
      return res.status(404).send({ message: `${reviewedEntityType} not found` });
    }

    const review =await new Review({ userId, reviewText, rating, reviewedEntityId, reviewedEntityType }).save();

    entity.reviews.push(review._id);
    await entity.save();

    res.status(201).send({ message: 'Review created successfully', review });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error creating review', error });
  }
};

// Get all reviews for a specific entity
export const getReviews = async (req, res) => {
  const { reviewedEntityId, reviewedEntityType } = req.query;

  if (!reviewedEntityId || !reviewedEntityType) {
    return res.status(400).send({ message: 'All the fields are required' });
  }

  try {
    const reviews = await Review.find({ reviewedEntityId, reviewedEntityType }).populate('userId');

    if (reviews.length === 0) {
      return res.status(404).send({ message: 'No reviews found for the specified entity' });
    }

    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error fetching reviews', error });
  }
};

// Delete a review by ID
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }

    let entity;
    if (review.reviewedEntityType === 'Tutor') {
      entity = await Tutor.findById(review.reviewedEntityId);
    } else if (review.reviewedEntityType === 'TuitionCenter') {
      entity = await TuitionCenter.findById(review.reviewedEntityId);
    }

    if (entity) {
      entity.reviews.pull(review._id);
      await entity.save();
    }

    await Review.deleteOne({ _id: id });

    res.status(200).send({ message: 'Review deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error deleting review', error });
  }
}
