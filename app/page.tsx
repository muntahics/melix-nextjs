import SearchCard from "@/app/components/SearchCard";
import type { JSX } from "react";
import Fetch from "@/app/utilities/Fetch";

export default async function Home() {


const data = await Fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US`)
const genreData = await Fetch('https://api.themoviedb.org/3/genre/movie/list?language=en')
 
const genres = genreData.genres

const results = data.results
// console.log(data.results)
  
  

// console.log(movies)
  return (
    <>
      <div className="flex flex-row flex-wrap gap-10 justify-center items-stretch mt-8">
              {results.map((item:any)=>(
                  <SearchCard 
                      key={item.id}
                      poster={item.poster_path}
                      title={item.title || item.name}
                      id={item.id}
                      date={item.release_date || item.first_air_date}
                      genre_ids={item.genre_ids}
                      genres={genres}
                      media_type={item.media_type}
                  />
              ))}
          </div>
    </>
  );
}
