import UserModel from '../models/userModel.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error fetching user profile',
      error,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).send({ message: 'Name and email are required' });
    }

    const user = await UserModel.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error updating user profile',
      error,
    });
  }
};
