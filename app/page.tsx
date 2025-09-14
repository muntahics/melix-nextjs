import SearchCard from "@/app/components/SearchCard";
import type { JSX } from "react";
import Fetch from "@/app/utilities/Fetch";

type Result = {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string;
  name?: string
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default async function Home(): Promise<JSX.Element> {


const data = await Fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US`)
const genreData = await Fetch('https://api.themoviedb.org/3/genre/movie/list?language=en')
 
const genres = genreData.genres

const results = data.results.filter((item:Result)=>(item.media_type==='movie'|| item.media_type==='tv'))
// console.log(results)
  
  

// console.log(movies)
  return (
    <>
      <div className="flex flex-row flex-wrap gap-10 justify-center items-stretch mt-8">
              {results.map((item:Result)=>(
                  <SearchCard 
                      key={item.id}
                      poster={item.poster_path}
                      title={item.title || item.name || 'Unknown'}
                      id={item.id}
                      date={item.release_date || item.first_air_date || '2000-01-01'}
                      genre_ids={item.genre_ids}
                      genres={genres}
                      media_type={item.media_type}
                  />
              ))}
          </div>
    </>
  );
}
