import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

export const initDatabaseConnection = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Database connect successfully');
        
    } catch (error) {
        console.error('Database connection error');
        process.exit(1);
        
    }
}

export const startServer = async (PORT,app) => {
    await initDatabaseConnection();
    app.listen(PORT, () => {
        console.log(`Server in running on port ${PORT}`);
    } )

}
