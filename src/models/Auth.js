import mongoose, { Schema } from "mongoose"

const authSchema = new Schema (
    {
        accessToken: {
            type: String,
            required: true
        },
        idToken: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }, 
    { bufferTimeoutMS: 60000 }
)

const Auth = mongoose.models.Auth || mongoose.model("Auth", authSchema) 

export default Auth