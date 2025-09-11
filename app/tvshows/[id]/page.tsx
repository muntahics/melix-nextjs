import type { JSX } from "react";
import Fetch from "@/app/utilities/Fetch";
import {GetImdbRating} from '@/app/server/GetImdbRating'
import TvDetails from "@/app/components/TvDetails";

type ParamsProps={
    params: {id: number}
}

export async function generateMetadata({ params }:ParamsProps) {
  const {id} = await params
  const details = await Fetch(`https://api.themoviedb.org/3/tv/${id}`)
    return {
    title: details.name,
    description: `Tv-Show Details`
  };
}

export default async function MovieDetailsPage({params}:ParamsProps): Promise<JSX.Element>{
    const {id} = await params
    const details = await Fetch(`https://api.themoviedb.org/3/tv/${id}`)
    const credits = await Fetch(`https://api.themoviedb.org/3/tv/${id}/credits`)
    const imdb_id = await Fetch(`https://api.themoviedb.org/3/tv/${id}/external_ids`)
    const imdbRating = (await GetImdbRating(`https://www.imdb.com/title/${imdb_id.imdb_id}/ratings/`))
    const directors = details.created_by.slice(0,2).map((item:any) => item.name).join(', ')
    
    // console.log(details.seasons)
    const cast = credits.cast.filter((item:any) => item.profile_path!=null).slice(0,5)
    .map((member:any) => ({
        id: member.id,
        character: member.character,
        name: member.name,
        profile_path: member.profile_path, 
    }));
// console.log(cast)
    return(
        <>
        <TvDetails
            key={details.id}
            id={details.id} 
            title={details.name}
            seasons={details.number_of_seasons}
            episodes={details.number_of_episodes}
            backdrop={details.backdrop_path}
            poster={details.poster_path}
            genres={details.genres}
            imdb={imdb_id.imdb_id}
            imdbRating={imdbRating}
            overview={details.overview}
            production_companies={details.production_companies}
            production_countries={details.production_countries}
            release_date={details.first_air_date}
            languages={details.spoken_languages}
            runtime={details.last_episode_to_air.runtime}
            cast={cast}
            directors={directors}

        />
        

        </>
    )
}