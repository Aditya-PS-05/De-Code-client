import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://adityapratapsjnhh7654:VRSKTAazERkya17I@cluster0.cljziqp.mongodb.net/')
        console.log("connected to mongodb")
    } catch (error) {
        console.log(error)
    }
}

export default connectMongoDB