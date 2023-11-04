import EmployeeModel from "../../../../models/employee";
import { NextResponse } from "next/server";

export async function PUT(request: any, { params }: { params: { id: string } }) {
  const { id } = params;
  const data: Employee = await request.json();
  const employees: Employee[] = await EmployeeModel.find();
  const validateEmail = employees.some(u=>u._id!== id&&u.email===data.email)
  if (validateEmail) {
    return NextResponse.json({ error: 'Email already in use.' }, { status: 400 });
  }
  await EmployeeModel.findByIdAndUpdate(id, data);
  return NextResponse.json({ message: " updated" }, { status: 200 });
}

export async function GET(request: any, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await EmployeeModel.findOne({ _id: id });
  return NextResponse.json(data, { status: 200 });
}
export async function DELETE(request: any,{ params }: { params: { id: string } }) {
  const { id } = params;
  await EmployeeModel.findByIdAndDelete(id);
  return NextResponse.json({ message: " deleted" }, { status: 200 });
}
