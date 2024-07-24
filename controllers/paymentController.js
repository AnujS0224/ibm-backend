import Payment from '../models/paymentModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);

export const createPayment = async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    const payment = new Payment({
      userId,
      amount,
      status: 'pending',
      paymentIntentId: paymentIntent.id,
    });
    await payment.save();
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: 'Error creating payment' });
  }
};

export const updatePaymentStatus = async (req, res) => {
  const { paymentIntentId, status } = req.body;
  try {
    const payment = await Payment.findOne({ paymentIntentId });
    payment.status = status;
    await payment.save();
    res.json({ message: 'Payment status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating payment status' });
  }
};
