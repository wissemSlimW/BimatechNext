import mongoose, { Schema } from "mongoose";

const skillSchema = new Schema(
  {
    name: String,
    status: Boolean,
  },
  {
    timestamps: true,
  }
);

const SkillModel = mongoose.models.Skill || mongoose.model("Skill", skillSchema);

export default SkillModel;
