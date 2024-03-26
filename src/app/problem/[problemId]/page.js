
"use client"
import Topbar from '@/components/Topbar/Topbar'
import Workspace from '@/components/Workspace/Workspace'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = ({params}) => {
  const [problem, setProblem] = useState([])
  const {problemId} = params;
  const router = useRouter()
  console.log("here is problemid in problem", problemId)

  const {user} = useUser();

  const baseURI = `http://localhost:3000/api/problems/getProblem/${problemId}`
  useEffect(() => {
    fetch(baseURI)
        .then(response => response.json())
        .then(data => setProblem(data))
        .catch(error => console.error("Error fetching problems:", error));
}, []);
useEffect(()=>{
  console.log("user in problem id page", user);
  if(user === null){
    router.push('/');
  }
},[user])
console.log(problem)
  return (
    <div>
        <Topbar problemPage={true} />
        <Workspace {...problem}/>
    </div>
  )
}

export default page