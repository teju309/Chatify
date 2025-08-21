import { User } from "../models/user.model.js";

export const authCallBack = async(req, res, next) => {
  try{
     const { id, firstName, lastName, imageUrl } = req.body; 

     //chcek if user already exists
      let user=await User.findOne({ clerkId: id });
      
      if(!user){
        //create new user
        user=await User.create({
          clerkId: id,
          fullName: `${firstName} ${lastName}`,
          imageUrl
        });   
        console.log('New user created:', user);

      }
      res.status(200).json({ message: 'User logged in successfully', user });
  }
  catch(error){
    console.error('Error in authentication callback:', error);
    next(error);
  }
};