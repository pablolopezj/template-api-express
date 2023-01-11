import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: false,
      // useFindAndModify: false,
    });

    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error database connect");
  }
};

export { dbConnection };
