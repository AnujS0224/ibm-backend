import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
  },
  email: { 
    type: String,
    required: true, 
    unique: true
  },
  password: { 
    type: String,
    required: true 
  },
  bio:{
    type:String,
    required:true
  },
  subjects: { 
    type: [String],
    required: true 
  },
  availability: {
    type: String, 
    required: true
  },
  ratings: { 
    type: Number, 
    default: 0 
  },
  reviews: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Review' 
  }]
});

const Tutor = mongoose.model('Tutor', tutorSchema);
export default Tutor;
