import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  lessons: [{
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    videoUrl: String,
    duration: Number // in minutes
  }],
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  thumbnail: String,
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Course', courseSchema);
