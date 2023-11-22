import express from "express";
const router = express.Router();
import User from "../Model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//login
export const login = async (req, res) => {
    try{

      console.log(req.body);

    const { email, password } = req.body;
        // Find the user by their email (assumes unique email addresses)
        console.log(1);
      const user = await User.findOne({ email });
      console.log(2);
      if (!user) {
        console.log(3);
        return res.status(401).json({ error: 'User not found' });

      }
      // Compare the provided password with the stored hashed password
      // const passwordMatch = await bcrypt.compare(password, user.password);
      if (password != user.password) {
        console.log(4);
        return res.status(401).json({ error: 'Authentication failed' });
      }
      
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

      res.cookie('token', token);
      return res.json({ status: 'success', token });


    } catch (error) {

      return res.status(500).json({ error: 'Login failed' });

    }
  };

export default router;