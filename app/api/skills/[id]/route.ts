import SkillModel from "../../../../models/skill";
import { NextResponse } from "next/server";

export async function PUT(request: any, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await request.json();
  await SkillModel.findByIdAndUpdate(id, data);
  return NextResponse.json({ message: " updated" }, { status: 200 });
}

export async function GET(request: any, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await SkillModel.findOne({ _id: id });
  return NextResponse.json( data , { status: 200 });
}
export async function DELETE(request: any, { params }: { params: { id: string } }) {
  const { id } = params;
  await SkillModel.findByIdAndDelete(id);
  return NextResponse.json({ message: " deleted" }, { status: 200 });
}

