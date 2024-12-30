const mongoose = require('mongoose');
const { Schema } = mongoose;

const skillSchema = new Schema(
  {
    skillType: {
      type: String,
      required: true,
      enum: ["frontend", "backend", "database"],
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Skill', skillSchema);
