
import { NextResponse } from "next/server"
import connectMongoDB from "@/libs/mongodb"
import User from "@/models/User"

export async function GET(req, { params }) {
    const { getUserId } = params
    let output = []
    await connectMongoDB()
    let user = await User.findById(getUserId);
    console.log(user)
    output = user;
    return NextResponse.json(output)
}