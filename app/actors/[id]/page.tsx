
import ActorsDetails from "@/app/components/ActorsDetails";
import Fetch from "@/app/utilities/Fetch";
import type { JSX } from "react";

type ParamsProps = {
    params: {id: number}
}

export default async function ActorsDetailsPage({params}:ParamsProps):Promise<JSX.Element>{
    const { id } = await params
    const details = await Fetch(`https://api.themoviedb.org/3/person/${id}`)
    const credits = await Fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits`)
    const genreData = await Fetch('https://api.themoviedb.org/3/genre/tv/list?language=en')
    // const genres = genreData.genres
    const known_for = credits.cast.sort((a:any, b:any) => b.popularity - a.popularity).slice(0,18)
    // console.log(known_for)
    
    return(
        <ActorsDetails 
            key={details.id}
            birthday={details.birthday}
            deathday={details.deathday}
            id={details.id}
            name={details.name}
            also_known_as={details.also_known_as[0]}
            place_of_birth={details.place_of_birth}
            profile_path={details.profile_path}
            biography = {details.biography}
            known_for = {known_for}
        />
    )
}