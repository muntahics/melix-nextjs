import type { JSX } from "react";
import Fetch from "@/app/utilities/Fetch";
import {GetImdbRating} from '@/app/server/GetImdbRating'
import MovieDetails from "@/app/components/MovieDetails";

type ParamsProps={
    params: {id: number}
}

export default async function MovieDetailsPage({params}:ParamsProps): Promise<JSX.Element>{
    const {id} = await params
    const details = await Fetch(`https://api.themoviedb.org/3/movie/${id}`)
    const credits = await Fetch(`https://api.themoviedb.org/3/movie/${id}/credits`)
    const imdbRating = (await GetImdbRating(`https://www.imdb.com/title/${details.imdb_id}/ratings/`))
    const directors = credits.crew.filter((member:any) => member.job === 'Director').map((item:any) => item.name).join(', ')
    // console.log(directors)
    const cast = credits.cast.filter((item:any) => item.order<=5)
    .map((member:any) => ({
        id: member.id,
        character: member.character,
        name: member.name,
        profile_path: member.profile_path,
    }));
// console.log(cast)
    return(
        <>
        <MovieDetails
            key={details.id}
            id={details.id} 
            title={details.title}
            backdrop={details.backdrop_path}
            poster={details.poster_path}
            genres={details.genres}
            imdb={details.imdb_id}
            imdbRating={imdbRating}
            overview={details.overview}
            production_companies={details.production_companies}
            production_countries={details.production_countries}
            release_date={details.release_date}
            languages={details.spoken_languages}
            runtime={details.runtime}
            cast={cast}
            directors={directors}

        />
        

        </>
    )
}