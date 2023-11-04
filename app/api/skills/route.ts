import SkillModel from "../../../models/skill";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const data = await request.json();
  await SkillModel.create(data);
  return NextResponse.json({ message: " Created" }, { status: 201 });
}

export async function GET() {
  const data = await SkillModel.find();
  return NextResponse.json(data);
}

