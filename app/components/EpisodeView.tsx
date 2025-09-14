"use client";

import { useState } from "react"

type Props = {
    id: number
    season_number:number
    episode_number:number
}

type Source = {
  name: string
  url: string
}

export default function EpisodeView({id, season_number, episode_number}:Props){
    
    const sources: Source[] = [
    {
      name: 'Vidfast',
      url: `https://vidfast.pro/tv/${id}/${season_number}/${episode_number}`,
    },

    {
      name: 'Vidsrc',
      url: `https://vidsrc.cc/v2/embed/tv/${id}/${season_number}/${episode_number}`,
    },
    
    {
      name: 'Vidlink',
      url: `https://vidlink.pro/tv/${id}/${season_number}/${episode_number}`,
    },
    {
      name: 'Videasy',
      url: `https://player.videasy.net/tv/${id}/${season_number}/${episode_number}`,
    },
    ]

    const [src, setSrc] = useState(sources[0].url)

    return(
            <>
            
            <div className="flex flex-col items-center justify-center bg-sky-800 w-auto h-auto p-1 rounded-2xl">
                {/* <h1 className="text-[min(10vw, 24px)]">{title}</h1> */}
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
                {sources.map((item:Source)=>(
                <button key={item.name} className="bg-sky-700 p-2 rounded-lg cursor-pointer" onClick={()=>setSrc(item.url)}>{item.name}</button>
            ))}
            </div>            
            </>
    )
}

