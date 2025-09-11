import Image from "next/image"
import Link from "next/link"
import type { JSX } from "react"


type genre = {
    id: number,
    name: string
}

export default function SearchCard({poster, title, id, date, genre_ids, genres, media_type}:{poster:string, title:string, id:number, date:string, genre_ids:number[], genres: genre[], media_type:string}):JSX.Element{
    
   
    let genreNames: string[] = []
    const getGenres =    ()=>(genres.map((genre:genre)=>genre_ids.map((item)=>item===genre.id?genreNames.push(genre.name):null)))
    getGenres()

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
            <Link href={media_type=='movie'?`/movie/${id}`:`/tvshows/${id}`}>
                <Image className="rounded-2xl" src={poster===null?`/placehold.png`:`https://image.tmdb.org/t/p/w500/${poster}`} alt="name" width={250} height={300}></Image>
                <h2 className="mt-2 block text-center max-w-[250px] text-lg">{title}</h2> 
                <h3 className="text-center max-w-[250px]">{humanReadableRelease} | {genreNames.join(', ')}</h3>
                <h3 className="text-center max-w-[250px] uppercase text-gray-300 text-sm">{media_type}</h3>

            </Link>
        </div>
    )
}