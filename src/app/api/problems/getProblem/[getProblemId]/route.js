
import { NextResponse } from "next/server"
import connectMongoDB from "@/libs/mongodb"
import Question from "@/models/Question"

export async function GET(req, { params }) {
    const {getProblemId} = params
    console.log(getProblemId)
    let output = []
  try {
    await connectMongoDB();
    const question = await Question.findById(getProblemId);
    output = question;
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
  return NextResponse.json(output);
}