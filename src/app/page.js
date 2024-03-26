"use client"
import Navbar from "@/components/Navbar/Navbar";
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const {user} = useUser();
  useEffect(()=>{
    console.log("user in problem id page", user);
    if(user !== null){
      router.push('/problemspage');
    }
  },[user])
  return (
    <div className='bg-gradient-to-b to-green-800 from-black h-screen relative'>
			<div className='max-w-7xl mx-auto h-full'>
				<Navbar />
				<div className='text-white py-12 px-12 w-[80%] mx-auto my-20'>
          <h1 className='text-6xl font-mono text-center'>Unlock Your Coding Potential with D-Code</h1>
          <p className='font-mono my-10 text-center'>Join thousands of aspiring programmers from around the world in honing your skills, solving challenges, and pushing the boundaries of your coding capabilities.</p>
        </div>
			</div> 
		</div>
  );
}