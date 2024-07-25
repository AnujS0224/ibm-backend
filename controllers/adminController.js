import UserModel from '../models/userModel.js';
import Tutor from '../models/tutorModel.js';
import TuitionCenter from '../models/tuitioncenterModel.js';
import User from '../models/userModel.js';

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


export const getAllTutors = async (req,res)=>{
  try {
    const tutors = await Tutor.find();
    res.status(200).json({"Success":tutors});
  } catch (error) {
    res.status(502).json({"Error":error});
  }
};

export const getAllTuitionCenter = async (req,res)=>{
  try {
    const tuitionCenters = await TuitionCenter.find();
    res.status(200).json({"Success":tuitionCenters});
  } catch (error) {
    res.status(502).json({"Error":error});
  }
};

export const getAllStudents = async (req,res)=>{
  try {
    const students = await User.find({role:'Student'});
    res.status(200).json({"Success":students});
  } catch (error) {
    res.status(500).json({"Error":error});
  }
}

