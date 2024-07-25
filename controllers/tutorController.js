import Tutor from '../models/tutorModel.js';
import { hashPassword } from "../helper/authhelper.js";

export const createTutorProfile = async (req, res, next) => {
  try {
    const { name, email, password, subjects, bio, availability } = req.body;
    const Tutorphoto=req.file;

    if (!name || !email || !password || !bio || !subjects || !availability||!Tutorphoto) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const existingTutor = await Tutor.findOne({ email });
    if (existingTutor) {
      return res.status(400).send({ message: 'Tutor profile already exists' });
    }

    const hashedPassword=await hashPassword(password)
    const tutor = new Tutor({ name, email, password:hashedPassword, subjects, bio, availability,Tutorphoto:Tutorphoto.path });
    await tutor.save();

    res.status(201).send({
      success:true,
      message:"Tutor created successfully",
      tutor
    });
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
      return res.status(404).send({ message: 'Tutor not found' });
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

export const updateTutorProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, subjects, bio, availability } = req.body;
    const Tutorphoto=req.file;
    const tutor=await Tutor.findById(id);
    
    if (!tutor) {
      return res.status(404).send({ message: 'Tutor not found' });
    }

    tutor.name=name|| tutor.name;
    tutor.email=email||tutor.email;
    tutor.subjects=subjects||tutor.subjects;
    tutor.bio=bio||tutor.bio;
    tutor.availability=availability||tutor.availability;
    if (Tutorphoto) {
      tutor.Tutorphoto = Tutorphoto.path;
    }
    const updateTutor=await tutor.save();
    res.status(200).json({
      success:true, message: 
      "Tutor updated successfully", 
      updateTutor 
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error updating tutor profile',
      error,
    });
  }
};

export const deleteTutorProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tutor = await Tutor.findByIdAndDelete(id);
    if (!tutor) {
      return res.status(404).send({ message: 'Tutor not found' });
    }
    res.status(200).send({ message: 'Tutor profile deleted successfully' });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error deleting tutor profile',
      error,
    });
  }
};