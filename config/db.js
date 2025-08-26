import mongoose from "mongoose";
import "dotenv/config";

export const dbConnection = async () => {
  try {
    const mongodbAtlas = process.env.MONGODB_CONECTION
    await mongoose.connect(mongodbAtlas);
    console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos - Hable con el administrador");
  }
};
