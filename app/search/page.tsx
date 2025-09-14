
import Fetch from "../utilities/Fetch";
import SearchCard from "../components/SearchCard";

type BaseMedia = {
  id: number
  media_type: 'movie' | 'tv' | 'person';
  popularity: number;
  vote_count: number;
  vote_average: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  original_language: string;
  adult: boolean;
}

export async function generateMetadata() {
  
    return {
    title: `Search`,
    description: `Search Page`
  };
}

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
        {results.map((item:BaseMedia)=>(
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
  );
}
