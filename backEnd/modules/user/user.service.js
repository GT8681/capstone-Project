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
export const getUserById = async (userId) => {
      const user = await User.findById(userId).select('-password');
      return user;
} 



export const toggleFavoriteService = async (userId, playerId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Utente non trovato");

  // Verifichiamo se il player è già presente
  const isFavorite = user.favorites.includes(playerId);

  if (isFavorite) {
    // Se esiste, lo togliamo
    return await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: playerId } },
      { new: true }
    );
  } else {
    // Se non esiste, lo aggiungiamo
    return await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: playerId } },
      { new: true }
    );
  }
};
// Funzione per gestire il toggle del preferito
export const toggleFavoriteServiceList = async (userId, playerId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Utente non trovato");

  // Se l'ID c'è già lo togliamo (pull), altrimenti lo aggiungiamo (addToSet evita duplicati)
  const isFavorite = user.favorites.includes(playerId);
  
  if (isFavorite) {
    user.favorites.pull(playerId);
  } else {
    user.favorites.push(playerId);
  }

  await user.save();
  return user.favorites; // Restituiamo l'array aggiornato
};

export const getFavoritePlayersService = async (userId) => {
  // .populate('favorites') è la chiave: trasforma gli ID in dati completi
  const user = await User.findById(userId).populate('favorites');
  if (!user) throw new Error("Utente non trovato");
  
  return user.favorites; // Restituisce l'array di oggetti Player
};



