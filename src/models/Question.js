
import mongoose, { Schema } from "mongoose"

const questionSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        testcases: {
            type: Array,
            required: true
        },
        answers: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    },
)

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema) 

export default Question