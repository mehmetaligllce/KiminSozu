import mongoose from "mongoose"

const wordSchema = new mongoose.Schema({
    author: { type: String, required: true },
    text: { type: String, required: true },
})

export default mongoose.model("Word", wordSchema)