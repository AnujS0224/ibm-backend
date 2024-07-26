import Tutor from '../models/tutorModel.js';
import { hashPassword } from "../helper/authhelper.js";

export const createTutorProfile = async (req, res, next) => {
  try {
    const { name, email, password, subjects, bio, availability,fees  } = req.body;
    const photo=req.file;

    if (!name || !email || !password || !bio || !subjects || !availability|| !fees ||!photo) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const subjectArray = subjects.split(',').map(subject => subject.trim());
    const feeObject = JSON.parse(fees);

     // Validate that fees include all subjects
     const missingFees = subjectArray.filter(subject => !(subject in feeObject));
     if (missingFees.length > 0) {
       return res.status(400).send({ message: `Missing fees for subjects: ${missingFees.join(', ')}` });
     }

    const existingTutor = await Tutor.findOne({ email });
    if (existingTutor) {
      return res.status(400).send({ message: 'Tutor profile already exists' });
    }

    const hashedPassword=await hashPassword(password)
    const tutor = new Tutor({
      name, 
      email, 
      password:hashedPassword,
      subjects:subjectArray, 
      bio,
      availability,
      fees: feeObject,
      photo:photo.path
     });
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
    const { name, email, subjects, bio, availability,fees } = req.body;
    const photo=req.file;
    const tutor=await Tutor.findById(id);
    
    if (!tutor) {
      return res.status(404).send({ message: 'Tutor not found' });
    }
    if (subjects) {
      tutor.subjects = subjects.split(','); // Handle comma-separated subjects
    }
    
    if (fees) {
      try {
        tutor.fees = JSON.parse(fees); // Parse fees if provided
      } catch (error) {
        return res.status(400).send({ message: 'Invalid fees format' });
      }
    }
    
    tutor.name=name|| tutor.name;
    tutor.email=email||tutor.email;
    tutor.bio=bio||tutor.bio;
    tutor.availability=availability||tutor.availability;
    if (photo) {
      tutor.photo = photo.path;
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

export const getAllTutors = async (req, res, next) => {
  try {
    const tutors = await Tutor.find();
    res.status(200).send({success:true,tutors});
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error fetching tutors',
      error,
    });
  }
};
