"use client";

import { useState } from "react"

type Props = {
    id: number
    title: string
}

export default function MovieView({id, title}:Props){
    
    const sources = [
    {
      name: 'Vidfast',
      url: `https://vidfast.pro/movie/${id}`,
    },

    {
      name: 'Vidsrc',
      url: `https://vidsrc.cc/v2/embed/movie/${id}`,
    },
    
    {
      name: 'Vidlink',
      url: `https://vidlink.pro/movie/${id}`,
    },
    {
      name: 'Videasy',
      url: `https://player.videasy.net/movie/${id}`,
    },
    ]

    const [src, setSrc] = useState(sources[0].url)

    return(
            <>
            
            <div className="flex flex-col items-center justify-center bg-sky-800 w-auto h-auto p-1 rounded-2xl">
                <h1 className="text-[min(10vw, 24px)]">{title}</h1>
                <iframe
                  id="my-player"
                  src={src}
                  title="My Player"
                  frameBorder={0}
                  allowFullScreen
                  className="rounded-2xl md:w-[800px] md:h-[500px]"
                />

            </div>
            <div className="inline-flex flex-row gap-4 mt-2">
                {sources.map((item:any)=>(
                <button key={item.name} className="bg-sky-700 p-2 rounded-lg cursor-pointer" onClick={()=>setSrc(item.url)}>{item.name}</button>
            ))}
            </div>            
            </>
    )
}

