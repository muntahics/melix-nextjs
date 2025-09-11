"use client"

import { useRouter } from "next/navigation";

export default function EpisodeTopView({id,season_number,seasons}:{id:number,season_number:number,seasons:any}){
    const router = useRouter();
    
      const handleChange = (e:any) => {
        const path = e.target.value;
        if (path) {
          router.push(path);
        }
      };
    return(
        <>
            <span className="text-xl">Select Season: </span>
            <select name="seasons" id="seasons" value={`/tvshows/${id}/season/${season_number}/episode/1`} onChange={handleChange} className="px-4 py-1 bg-amber-800 rounded-sm">
                {seasons.map((item:any)=>(
                    <option key={item.season_number} className="rounded-2xl" value={`/tvshows/${id}/season/${item.season_number}/episode/1`}>{item.season_number}</option>
                ))}
            </select><br />
            
        </>
    )
}