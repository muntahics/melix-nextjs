"use client"

import { useRouter } from "next/navigation";
import type { ChangeEvent } from 'react';


type Season = {
    _id: number;
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
}

export default function EpisodeTopView({id,season_number,seasons}:{id:number,season_number:number,seasons:Season[]}){
    const router = useRouter();
    
      const handleChange = (e:ChangeEvent<HTMLSelectElement>) => {
        const path = e.target.value;
        if (path) {
          router.push(path);
        }
      };
    return(
        <>
            <span className="text-xl">Select Season: </span>
            <select name="seasons" id="seasons" value={`/tvshows/${id}/season/${season_number}/episode/1`} onChange={handleChange} className="px-4 py-1 bg-amber-800 rounded-sm">
                {seasons.map((item:Season)=>(
                    <option key={item.season_number} className="rounded-2xl" value={`/tvshows/${id}/season/${item.season_number}/episode/1`}>{item.season_number}</option>
                ))}
            </select><br />
            
        </>
    )
}