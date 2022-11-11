import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userRepo from "../repo/userRepo";


const loginLogic = async (email, password) => {
    const user = await userRepo.getUserByEmail(email)
    if (user == null) {
      return {accessToken:"user not found"}
    }
    try {
      const compare = await bcrypt.compare(password.trim(),user.password.trim())
      if (compare) {
        const tokenData = {
          id: user.id,
          username: user.username,
          firstName:user.firstName,
          lastName:user.lastName,
          email: user.email,
          address:user.address,
        };
        const accessToken = await jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:"7d"})
        return {accessToken:accessToken}
      } else {
        return {accessToken:"incorrect password"}
        
      }
    } catch (error) {
      return {accessToken:"error"}
      
    }
  }

export {loginLogic}