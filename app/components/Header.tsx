"use client";

import Link from "next/link";
// import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/app/utilities/Store";



export default function Header(){
  const [isActiveMenu, setIsActiveMenu] = useState(false)
  const [query, setQuery] = useState("");
  const router = useRouter();
  const setLoading = useSearchStore((state)=>state.setLoading)
  // const [loading, setLoading] = useState(false);
  useEffect(()=>{
    if (!query.trim()) return;
    else if(query.length<=2) return;
    setLoading(true)
    const debounce = setTimeout(()=>{
      router.push(`/search?query=${encodeURIComponent(query)}`)
      setLoading(false)
    },200)
    return () => clearTimeout(debounce);
  },[query,router, setLoading])

  const handleMenu = ()=>{

    setIsActiveMenu(!isActiveMenu)

  }

    return(
        <>
        <header className={`w-[100%-40px] ${isActiveMenu && `pb-6`} mt-2 rounded-xl mx-2 bg-slate-800 mb-2 sticky top-1 left-0 right-0 z-50`}>
          <nav className="flex flex-col w-full md:justify-center">
            <div className="flex flex-row justify-between md:items-center md:justify-center w-full">
              <div className="logo lg:flex-1 ml-2 md:ml-0 md:text-center">
                <Link href="/"><h1 className=" text-white px-2 py-2 rounded-sm text-3xl font-bold">Melix</h1></Link>
              </div>
              

              <div className="max-sm:hidden flex-row flex justify-end md:justify-center  mr-8 items-center flex-1 gap-5">
                <div className="hidden sm:block">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Movies & TV shows..."
          className="border bg-slate-600 rounded-xl px-2 py-1 w-full"
        />
        
              </div>
                <Link href="/"><span className="text-white text-xl font-bold block">Home</span></Link>
                <Link href="/movie"><span className="text-white text-xl font-bold block">Movies</span></Link>
                <Link href="/tvshows"><span className="text-white text-xl font-bold block">Tv-Shows</span></Link>
                <Link href="/actors"><span className="text-white text-xl font-bold block">Actors</span></Link>
              </div>

              <button className="text-white sm:hidden cursor-pointer text-center mt-2 mr-4 text-3xl" onClick={handleMenu}>☰</button>

            </div>
              {isActiveMenu && <div className=" flex-col flex justify-center items-center w-full gap-3">
                <Link href="/"><span className="text-white text-xl font-bold block">Home</span></Link>
                <Link href="/movie"><span className="text-white text-xl font-bold block">Movies</span></Link>
                <Link href="/tvshows"><span className="text-white text-xl font-bold block">Tv-Shows</span></Link>
                <Link href="/actors"><span className="text-white text-xl font-bold block">Actors</span></Link>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Movies & TV shows..."
                  className="border bg-slate-600 rounded-xl px-2 py-1 w-2/3"
                />
              </div>}
          </nav>
        </header>
        {/* <hr className="text-gray-400" /> */}
        </>
    )
}