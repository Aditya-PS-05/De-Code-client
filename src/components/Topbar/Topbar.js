"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useUser } from '@/context/UserContext'
// import Logout from "../Buttons/Logout";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { useRouter } from "next/navigation";
// import Timer from "../Timer/Timer";

const Topbar = () => {
  const router = useRouter();
  const {user} = useUser();
  useEffect(()=>{
    console.log(user);
  },[user])

  const handleLogout = () => {
    localStorage.removeItem("id");
    router.push("/page");
  };
  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer text-dark-gray-7">
      <div
        className={`flex w-full items-center justify-between max-w-[1200px] mx-auto `}
      >
        <Link href="/" className="h-[50px] flex-1">
          <Image
            src="/logo.png"
            alt="Logo"
            className="h-full"
            width={60}
            height={1000}
          />
        </Link>
        <div className="flex items-center space-x-4 flex-1 justify-end ">
            <div className="cursor-pointer group relative">
              {user && (
              <>
                <Link href={`/user/${user._id}`}>
                  <div className="cursor-pointer group relative">
                    <Image
                      src="/avatar.png"
                      alt="Avatar"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <div
                      className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-green p-2 rounded shadow-lg 
                z-40 group-hover:scale-100 scale-0 
                transition-all duration-300 ease-in-out"
                    >
                      <p className="text-sm">{user.name}</p>
                    </div>
                  </div>
                </Link>
              </>
              )}
            </div>
            <Link
              href="/auth"
              onClick={() => {
                
              }}
            >
              <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded hover:bg-brand-green hover:text-white"
                handleLogout
              >
                Logout
              </button>
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;