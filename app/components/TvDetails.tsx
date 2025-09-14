import type { JSX } from "react";
import Image from "next/image";
// import { run } from "node:test";
// import { Heading1 } from "lucide-react";
import Link from "next/link";


type genre = {
    id: number,
    name: string
}

type cast = {
    id: number
    character: string
    name: string
    profile_path: string
}

type MovieDetailsProps = {
    id: number
    title: string
    seasons: number
    episodes: number
    poster: string
    genres: genre[]
    imdb: number
    imdbRating: string | null
    overview: string
    production_companies: {
        id: number
        logo_path: string
        name: string
        origin_country: string
    }[]
    production_countries: {
        iso_3166_1: string
        name: string

    }[]
    release_date: string
    languages: {
        english_name: string
        iso_639_1: string
        name: string
    }[]
    runtime: number
    cast: cast[]
    directors: string
}

export default function TvDetails({id, title, seasons, episodes, poster,genres, imdb, imdbRating, overview, production_companies, production_countries, release_date, languages, runtime, cast, directors}:MovieDetailsProps):JSX.Element{
    

    const genreNames = genres.map(item=>item.name).join(' | ')

    function getOrdinal(n:number) {
  const s = ["th", "st", "nd", "rd"],
        v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const date = new Date(release_date);

const day = getOrdinal(date.getDate());
const month = date.toLocaleString("en-GB", { month: "long" });
const year = date.getFullYear();
 
const humanReadableRelease = `${day} ${month}, ${year}`;

    
    return(
        <main className="lg:flex lg:flex-col lg:justify-center lg:items-center">
            <div className="flex flex-col md:flex-row m-6 lg:max-w-360">
                <Image className="rounded-3xl hover:bg-blend-overlay" src={`https://image.tmdb.org/t/p/w500/${poster}`} alt="name" width={400} height={600}></Image>
                
                <div className="flex flex-col justify-start max-sm:gap-2 gap-4 md:ml-6">
                    <h1 className="text-amber-50 text-2xl font-bold font-mono mt-3 self-start">{title}</h1>
                    <Link href={`/tvshows/${id}/season`}><button className="self-start bg-cyan-200 p-2 rounded-xl text-gray-800 cursor-pointer active:bg-amber-100 hover:bg-amber-300">Watch Now</button></Link>
                    <span className="block text-gray-300">Genre: {genreNames}</span> 
                    <span className="block text-gray-300">Total Seasons: {seasons}</span> 
                    <span className="block text-gray-300">Total Episodes: {episodes}</span> 
                    <span className="block text-gray-300">Runtime: {runtime >= 60 ? (Math.floor(runtime/60)+`h `+runtime%60+`m`) : (runtime%60+`m`)}</span> 
                    <span className="block text-gray-300">Release: {humanReadableRelease}</span> 
                    <span className="block self-baseline"><a href={`https://www.imdb.com/title/${imdb}/`} target="__blank"><Image src="/imdb.png" alt="Imdb Logo" width={50} height={20}></Image></a></span> 
                    <span className="block text-lg font-bold">{imdbRating}</span>
                    <span className="block text-gray-300">Created by: {directors}</span> 
                    <span className="block text-gray-300">Languages: {languages.map(item => item.english_name).join(', ')}</span> 
                    <span className="block text-gray-300">Country: {production_countries.map(item=>item.name).join(', ')}</span> 

                    <p className="inline text-gray-300"><span className="text-lg text-gray-300">Plot: </span>{overview}</p>
                    <span className="block text-gray-300">Company: {production_companies.map(item=>item.name).join(', ')}</span> 
                </div>                

            </div>
            <div className="inline-flex flex-row flex-wrap gap-10 border-3 rounded-xl border-gray-500 justify-center items-start p-4">
                <h1 className="self-start w-full">Cast:</h1>
                {
                    cast.map((item:cast) => (
                        <div key={item.id} className="flex flex-col gap-2">
                            <Link href={`/actors/${item.id}`}>
                                <div className="relative group w-[170px] cursor-pointer">
                                    <Image
                                      key={item.id}
                                      src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                                      alt={item.name}
                                      width={170}
                                      height={170}
                                      className="rounded-2xl"
                                    />
                                    {/* Overlay */}
                                    <div
                                      className="absolute inset-0 rounded-2xl bg-gray-600/60 opacity-0 group-active:opacity-100 group-hover:opacity-100 transition-opacity">
                                    </div>
                                    <h2 className="text-center">{item.name}</h2>
                                <h2 className="text-center text-gray-400">{item.character}</h2>
                                </div>

                                
                            </Link>
                        </div>

                        
                    ))
                }
            </div>
        </main>
    )
} 