import { NextResponse } from "next/server"
import connectMongoDB from "@/libs/mongodb"
import Auth from "@/models/Auth"

export async function GET(req, { params }) {
    const { code } = params
    let output = {auth: false}
    
    const data = {
        client_id: 'xeD~vJrDuRV_vJvV', 
        client_secret: 'R6oghYrWAAuL2RA1atE2~2FFalec5f2X', 
        grant_type: 'authorization_code', 
        code: code, 
        redirect_uri: 'http://localhost:3000/callback'
    }

    const formData = new URLSearchParams();
    for (const key in data) {
        formData.append(key, data[key]);
    }

    const res = await fetch(`https://auth.delta.nitt.edu/api/oauth/token`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: formData
    })
    const resJSON = await res.json()
    console.log(resJSON)
    const auth = new Auth({
        accessToken: resJSON.access_token, 
        idToken: resJSON.id_token
    })

    if (resJSON.access_token) {
        try {
            await connectMongoDB()
            console.log("connected");
            // const auth = await Auth.create({accessToken: resJSON.access_token, idToken: resJSON.id_token})
            auth.save()
            output = {auth: true, id: auth.id}
        } catch(error) {
            console.log(error)
        }
    }

    return NextResponse.json(output)
}