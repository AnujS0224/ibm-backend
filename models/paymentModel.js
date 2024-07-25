import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  amount: { 
    type: Number, 
    required: true 
    },
    status: { 
      type: String,
      enum: ['paid', 'pending', 'rejected'], 
      default: 'pending', 
      required: true 
    },
    paymentIntentId:{
      type:String,
      required:true
    },
    
},{timestamps:true});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
