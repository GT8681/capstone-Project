import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const initDatabaseConnection = async () => {
  const dbUri = process.env.DB_URL;

  if (!dbUri) {
    console.error('Variabile MONGO_URI mancante nel file .env o nelle variabili d’ambiente');
    process.exit(1);
  }

  try {
    await mongoose.connect(dbUri);
    console.log(`Database connesso con successo -> DB: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('Errore di connessione al database:', error.message);
    process.exit(1);
  }
};

export const startServer = async (PORT, app) => {
  await initDatabaseConnection();
  app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
  });
};
