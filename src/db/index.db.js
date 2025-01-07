import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`\n Mongo DB Connected !!`)
    } catch (error) {
        console.log('Mongo Db Error',error)   
    }
}

export default connectDB