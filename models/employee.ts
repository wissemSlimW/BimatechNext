import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    birthDate: Date,
    address: String,
    department: String,
    position: String,
    salary: Number,
    hiringDate: Date,
    status: Boolean,
    profilePicture: String,
    skillIds: [String]
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default EmployeeModel;
