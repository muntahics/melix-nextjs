import TvCard from "../components/TvCard";
import type { JSX } from "react";
import Fetch from "../utilities/Fetch";

export async function generateMetadata() {
    return {
    title: `Tv-Shows`,
    description: `Tv Shows Page`
  };
}

export default async function TvShowsPage(){
    const data = await Fetch(`https://api.themoviedb.org/3/tv/popular`)
    const genreData = await Fetch('https://api.themoviedb.org/3/genre/tv/list?language=en')
     
    const genres = genreData.genres

      
      type Movie = {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        first_air_date: string;
        name: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
      };
      
      const movies:Movie[] = data.results
    // console.log(movies)
      return (
        <>
          <div className="flex flex-row flex-wrap gap-10 justify-center items-stretch mt-8">
            {movies.map((movie:Movie):JSX.Element=>(
            <TvCard 
              key={movie.id}
              poster={movie.poster_path}
              title={movie.name}
              id={movie.id}
              date={movie.first_air_date}
              genre_ids = {movie.genre_ids}
              genres = {genres}
            />
          ))}
          </div>
        </>
      );
    }