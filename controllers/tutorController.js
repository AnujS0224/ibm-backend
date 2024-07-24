import Tutor from '../models/tutroModel.js';

export const createTutorProfile = async (req, res, next) => {
  try {
    const { userId, subjects,bio, availability } = req.body;
    if (!userId || !bio|| !subjects || !subjects) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    // Check if the tutor already exists
    const existingTutor = await Tutor.findOne({ userId });
    if (existingTutor) {
      return res.status(400).send({ message: 'Tutor profile already exists' });
    }

    const tutor = new Tutor({ userId, subjects,bio, availability });
    await tutor.save();
    res.status(201).json(tutor);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error creating tutor profile',
      error,
    });
  }
};

export const getTutorProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tutor = await Tutor.findById(id);
    if (!tutor) {
      return next(new ErrorHandler('Tutor not found', 404));
    }
    res.json(tutor);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error fetching tutor profiles',
      error,
    });
  }
};

export const updateTutorProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tutor = await Tutor.findByIdAndUpdate(id, req.body);
    if (!tutor) {
      return res.status(404).send({
        success: false,
        message: 'Tutor not found',
      });
    }
    res.json(tutor);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error fetching tutor profile',
      error,
    });
  }
};