import UserModel from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error fetching users',
      error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error deleting user',
      error,
    });
  }
};
