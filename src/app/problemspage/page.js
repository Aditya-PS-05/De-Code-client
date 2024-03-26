"use client";
import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {useUser} from '@/context/UserContext';

export default function page() {
  const router = useRouter();
  // const [user, setUser] = useState(null);
  const { user, setUser } = useUser();
  useEffect(() => {
    const userId = localStorage.getItem("id");
    // console.log("user id is ", userId)
    if (userId) {
      fetch(`http://localhost:3000/api/user/${userId}`).then(async(res) => {
        console.log("currently in main problems page");
        // console.log(res);
        const resJSON = await res.json();
        // console.log(resJSON);
        setUser(resJSON);
    })
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    console.log("user from useContext api", user);
  }, [user]); // Log user only when it changes

  return (
    <main className="bg-dark-layer-2 min-h-screen">
      <Topbar />
      <h1 className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5">
        Problems
      </h1>

      <div className="relative overflow-x-auto mx-auto px-6 pb-10">
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b ">
            <tr>
              <th scope="col" className="px-1 py-3 w-0 font-medium">
                Status
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Title
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Difficulty
              </th>

              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Category
              </th>
            </tr>
          </thead>
          <ProblemsTable />
        </table>
      </div>
    </main>
  );
}
