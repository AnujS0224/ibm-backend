import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
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
  photo: {
    type: String,
    default:"https://res.cloudinary.com/dxt2i61hy/image/upload/v1722313054/bwgirerdkidcjsc1bs6g.png",
  },
  role: {
    type: String,
    enum: ['Student','Admin'],
    default:"Student"
  },
  profileInfo: { 
    type: String
  },
},{timestamps:true});


const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
