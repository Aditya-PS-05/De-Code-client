"use client";
import React, { useEffect, useState } from 'react'

function page({params}) {
  const {userId} = params
  const [user, setUser] = useState(null)
  const getUserId = userId;
  useEffect(() => {
    fetch(`http://localhost:3000/api/getUser/${getUserId}`)
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error("Error fetching problems:", error));
    console.log("user is ", user)
}, []);
  return (
    <div>
      {userId}
    </div>
  )
}

export default page