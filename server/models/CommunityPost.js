import mongoose from 'mongoose';

const CommunityPostSchema = new mongoose.Schema({
  user: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
  },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: String }], // user ids
  comments: [
    {
      user: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        avatar: { type: String },
      },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

const CommunityPost = mongoose.model('CommunityPost', CommunityPostSchema);
export default CommunityPost;
