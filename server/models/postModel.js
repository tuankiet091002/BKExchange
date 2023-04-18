import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 50 },
    message: String,
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [String],
    selectedFile: String,
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        default: [],
    }],
    comments: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: String,
        time: { type: Date, default: Date.now() },
        default: [],
    }],
}, { timestamps: true, versionKey: false })

export default mongoose.model("Post", postSchema);