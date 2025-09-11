import Image from "next/image"
import Link from "next/link"
import type { JSX } from "react"




export default function SeasonCard({tmdb_id, poster, title, id, date, season_number, episode_count}:{tmdb_id:number, poster:string, title:string, id:number, date:string, season_number:number, episode_count: number}):JSX.Element{
    
   


    function getOrdinal(n:number) {
  const s = ["th", "st", "nd", "rd"],
        v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const rdate = new Date(date);

const day = getOrdinal(rdate.getDate());
const month = rdate.toLocaleString("en-GB", { month: "long" });
const year = rdate.getFullYear();

const humanReadableRelease = `${day} ${month}, ${year}`;
    
    return(
        <div className="rounded-2xl border-4 border-gray-500 px-2 py-2 text-amber-50 shadow-2xl hover:transition-transform transition-discrete duration-300 ease-in-out delay-150 hover:scale-105">
            <Link href={`/tvshows/${tmdb_id}/season/${season_number}`}>
                <Image className="rounded-2xl" src={poster===null?`/placehold1280x720.png`:`https://image.tmdb.org/t/p/w500/${poster}`} alt="name" width={250} height={300}></Image>
                <h2 className="mt-2 block text-center max-w-[250px] text-lg">{title}</h2>
                <h2 className="mt-2 block text-center max-w-[250px] text-lg">{season_number}</h2>
                <h2 className="mt-2 block text-center max-w-[250px] text-lg">Episodes: {episode_count}</h2>
                <h3 className="text-center max-w-[250px]">{humanReadableRelease}</h3>

            </Link>
        </div>
    )
}