import MovieCard from "./components/MovieCard";
import type { JSX } from "react";
import Fetch from "./utilities/Fetch";

export default async function Home() {


const data = await Fetch(`https://api.themoviedb.org/3/movie/popular`)
const genreData = await Fetch('https://api.themoviedb.org/3/genre/movie/list?language=en')
 
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
    release_date: string;
    title: string;
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
        <MovieCard 
          key={movie.id}
          poster={movie.poster_path}
          title={movie.title}
          id={movie.id}
          date={movie.release_date}
          genre_ids = {movie.genre_ids}
          genres = {genres}
        />
      ))}
      </div>
    </>
  );
}
