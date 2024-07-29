import User  from "../models/userModel.js";
export const adminMiddleware = async (req, res, next) => {
    try {
      const { id } = req.query;
      console.log(id);
  
      if (!id) {
        return next(new ErrorHandler('Login Required', 401));
      }
  
      const user = await User.findById(id);
      if (!user) {
        return next(new ErrorHandler('Invalid Credentials', 401));
      }
      if (user.role !== 'Admin') {
        return next(new ErrorHandler('Bad Request', 403));
      }
  
      next();
    } catch (error) {
      next(new ErrorHandler('Server Error', 500));
    }
  };
