import MovieCard from "./components/MovieCard";
import type { JSX } from "react";

export default async function Home() {

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Nzc2NjJjZWFiMGVmNWQ2MmJiODEzZTVjMmZjMzI2MiIsIm5iZiI6MTYyNzczOTQ5OC43NjE5OTk4LCJzdWIiOiI2MTA1NTU2YWVlNDNlODAwNWUzN2VkYzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qoxwkY2hUynCBwpOQrRDNjRIwZfadirE5tpCU4ffGx4'
  }
};

const data = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  .then(res => res.json())
  .catch(err => console.error(err));

const genreData = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
                        .then(res => res.json())
                        .catch(err => console.error(err))  
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
      <div className="flex flex-row flex-wrap gap-10 justify-center items-baseline mt-8">
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
