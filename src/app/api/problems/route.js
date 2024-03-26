
import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Question from "@/models/Question";

export async function GET(req) {
  let output = { problem: false };

  const testCases = [
    { a: { type: "int", value: 100 }, b: { type: "int", value: 99 } },
    { a: { type: "int", value: 200 }, b: { type: "int", value: 1 } },
  ];
  const answers = [
    { type: "string", value: "199" },
    { type: "string", value: "201" },
  ];
  const newQuestion = new Question({
    description: "Sample question description",
    testcases: testCases,
    answers: answers,
  });

  try {
    await connectMongoDB();
    newQuestion
      .save()
      .then((question) => {
        console.log("Question saved successfully:", question);
        output = { problem: true, id: newQuestion.id };
        console.log(output);
      })
      .catch((error) => {
        console.error("Error saving question:", error);
        output = { error: "Error saving question" };
      });
  } catch (error) {
    console.log(error);
    output = { error: "Error connecting to MongoDB" };
  }

  return NextResponse.json(output);
}