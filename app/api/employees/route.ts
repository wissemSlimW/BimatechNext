import EmployeeModel from "../../../models/employee";

import { NextResponse } from "next/server";

export async function POST(request: any) {
  const data: Employee = await request.json();
  const employees: Employee[] = await EmployeeModel.find();
  const validateEmail = employees.some(u => u.email === data.email)
  if (validateEmail) {
    return NextResponse.json({ error: 'Email already in use.', }, { status: 400 });
  }
  await EmployeeModel.create(data);
  return NextResponse.json({ message: " Created" }, { status: 201 });
}

export async function GET() {
  const data = await EmployeeModel.find();
  return NextResponse.json(data);
}

