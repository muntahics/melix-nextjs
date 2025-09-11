// app/search/page.tsx
import Image from "next/image";
import Fetch from "../utilities/Fetch";
import SearchCard from "../components/SearchCard";

export default async function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
  const {query} = await searchParams || "";
// console.log(searchParams)

  if (!query) {
    return <p className="text-center text-gray-400 mt-10">Please enter a search query.</p>;
  }

  const res = await fetch(
    `${process.env.BASE_URL}/api/search?query=${encodeURIComponent(query)}`,
    { cache: "no-store" } // always fresh
  );

  const genreData = await Fetch('https://api.themoviedb.org/3/genre/movie/list?language=en')
   
  const genres = genreData.genres
  const results = await res.json();

  return (
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
  );
}
