
import connectMongoDB from "@/libs/mongodb";
import Question from "@/models/Question";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    let output = []
  try {
    await connectMongoDB();

    const questions = await Question.find();
    output = questions;
    console.log(output)
  } catch (error) {
    console.error("Error fetching questions:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
  return NextResponse.json(output);
}
