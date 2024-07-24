import TuitionCenter from '../models/tuitioncenterModel.js';

export const createTuitionCenterProfile = async (req, res, next) => {
  try {
    const { userId, location,contactNumber, courses } = req.body;
    if (!userId || !location || !contactNumber || !courses) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const tuitionCenter = await new TuitionCenter({ userId, location,contactNumber, courses }).save();
    res.status(201).json(tuitionCenter);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error creating tuition center',
      error,
    });
  }
};

export const getTuitionCenterProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tuitionCenter = await TuitionCenter.findById(id).populate('reviews');
    if (!tuitionCenter) {
      return  res.status(404).send({ message: 'Tuition center not found' });
    }
    res.json(tuitionCenter);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error creating tuition center',
      error,
    });
  }
};

export const updateTuitionCenterProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tuitionCenter = await TuitionCenter.findByIdAndUpdate(id, req.body);
    if (!tuitionCenter) {
      return next(new ErrorHandler('Tuition center not found', 404));
    }
    res.json(tuitionCenter);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error updating tuition center profile',
      error,
    });
  }
};
