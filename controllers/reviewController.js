import Review from '../models/reviewModel.js';

export const createReview = async (req, res) => {
  try {
    const { userId, reviewText, rating, reviewedEntityId, reviewedEntityType } = req.body;

    if (!userId || !reviewText || rating == null || !reviewedEntityId || !reviewedEntityType) {
      return res.status(400).send({ message: 'All fields (userId, reviewText, rating, reviewedEntityId, reviewedEntityType) are required' });
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).send({ message: 'Rating must be a number between 1 and 5' });
    }

    const review = new Review({ userId, reviewText, rating, reviewedEntityId, reviewedEntityType });
    await review.save();
    res.status(201).send({ message: 'Review created successfully', review });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error creating review', error });
  }
};

export const getReviews = async (req, res) => {
  const { reviewedEntityId, reviewedEntityType } = req.query;

  if (!reviewedEntityId || !reviewedEntityType) {
    return res.status(400).send({ message: 'Both reviewedEntityId and reviewedEntityType are required' });
  }

  try {
    const reviews = await Review.find({ reviewedEntityId, reviewedEntityType });
    
    if (reviews.length === 0) {
      return res.status(404).send({ message: 'No reviews found for the specified entity' });
    }

    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error fetching reviews', error });
  }
};
