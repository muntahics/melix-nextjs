"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input"
export default function Header(){
    const [isActiveMenu, setIsActiveMenu] = useState(false)

  const handleMenu = ()=>{

    setIsActiveMenu(!isActiveMenu)

  }
    return(
        <>
        <header className={`w-[100%-40px] ${isActiveMenu && `pb-6`} mt-2 rounded-xl mx-2 bg-black mb-2`}>
          <nav className="flex flex-col w-full md:justify-center">
            <div className="flex flex-row justify-between md:items-center md:justify-center w-full">
              <div className="logo flex-1 ml-2 md:ml-0 md:text-center">
                <h1 className=" text-white px-2 py-2 rounded-sm text-3xl font-bold">Melix</h1>
              </div>
              

              <div className="max-sm:hidden flex-row flex justify-end md:justify-center  mr-8 items-center flex-1 gap-3">
                <div className="hidden sm:block">
                <Input type="text" placeholder="Search" className="bg-white rounded-2xl pl-2 w-60 h-8" />
              </div>
                <Link href="/"><span className="text-white text-xl font-bold block">Movies</span></Link>
                <Link href="/tv-shows"><span className="text-white text-xl font-bold block">Tv-Shows</span></Link>
                <Link href="/actors"><span className="text-white text-xl font-bold block">Actors</span></Link>
              </div>

              <button className="text-white sm:hidden cursor-pointer text-center mt-2 mr-4 text-3xl" onClick={handleMenu}>☰</button>

            </div>
              {isActiveMenu && <div className=" flex-col flex justify-center items-center w-full gap-3">
                <Link href="/"><span className="text-white text-xl font-bold block">Movies</span></Link>
                <Link href="/tv-shows"><span className="text-white text-xl font-bold block">Tv-Shows</span></Link>
                <Link href="/actors"><span className="text-white text-xl font-bold block">Actors</span></Link>
                <Input type="text" placeholder="Search" />
              </div>}
          </nav>
        </header>
        {/* <hr className="text-gray-400" /> */}
        </>
    )
}