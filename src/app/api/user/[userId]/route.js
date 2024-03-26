
import { NextResponse } from "next/server"
import connectMongoDB from "@/libs/mongodb"
import Auth from "@/models/Auth"
import User from "@/models/User"

export async function GET(req, { params }) {
    const {userId} = params
    // console.log("userId in /api/user/userId", userId)
    let output = []
  try {
    await connectMongoDB();
    console.log("Here is the Id", userId)
    const result = await Auth.findById(userId);
    console.log("result is", result)
    const res = await fetch("https://auth.delta.nitt.edu/api/resources/user", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${result.accessToken}`
        }
    })

    const resJSON = await res.json()
    // Check if the user already exists in the User collection
    let user = await User.findOne({ email: resJSON.email });
    if (!user) {
        // If the user does not exist, create a new User document
        user = new User({
            email: resJSON.email,
            id: resJSON.id,
            name: resJSON.name,
            phonenumber: resJSON.phoneNumber,
            gender: resJSON.gender,
            problemsSolved: []
        });
        user.save();
    }
    console.log("res result in user/userId", resJSON)
    console.log("user in user/userId", resJSON)
    output = user;
    // console.log("here is the output", output)
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
  return NextResponse.json(output);
}