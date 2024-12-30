const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    projectTitle: {
      type: String,
      required: true,
      trim: true,
    },
    projectBrief: {
      type: String,
      required: true,
      trim: true,
    },
    projectImage: {
      type: String,
      required: true,
    },
    techSkill: {
      type: [Schema.Types.ObjectId],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Please select at least one tech skill",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
