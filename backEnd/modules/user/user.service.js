import User from './user.model.js';
import bcrypt from 'bcrypt';

export const getUsers = async () =>{
      return await User.find();
}

export const uploadUserPassword = async (userId,oldPassword,newPassword) => {
 
      const user = await User.findById(userId);
      if(!user) throw new Error('Utente non trovato');

      const isMatch = await bcrypt.compare(oldPassword,user.password);
      if(!isMatch) throw new Error ('La vecchia password e errata')
      
       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(newPassword,salt);
       
       return await user.save();

}