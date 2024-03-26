
import mongoose, { Mongoose, Schema } from "mongoose"

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        id:{
            type: Number,
            required: true,
        },
        name : {
            type: String,
            required: true
        },
        phonenumber: {
            type: String,
            required: true
        },
        gender:{
            type: String,
            required: true
        },
        problemsSolved:[{
            type: Schema.Types.ObjectId,
            ref: 'Question' // Reference to the Question schema/model
        }]
    },
    {
        timestamps: true
    },
)

const User = mongoose.models.User || mongoose.model("User", userSchema) 

export default User