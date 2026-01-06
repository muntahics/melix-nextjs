import type { JSX } from "react"
import Fetch from "@/app/utilities/Fetch"
import ActorsCard from "../components/ActorsCard"




type known_for = {
    adult?: boolean;           // or required depending on type
    backdrop_path?: string | null;
    id: number;
    media_type: 'movie' | 'tv' | string;
    original_language?: string;
    original_title?: string;   // movies
    overview: string;
    poster_path?: string | null;
    release_date?: string;     // for movies
    first_air_date?: string;    // for TV
    title?: string;             // movies
    name?: string;              // TV shows
    vote_average?: number;
    vote_count?: number;
    popularity?: number;
}

type actor = {
    adult: boolean;
    gender: number;            // 0 = not specified (?) or 1/2 etc depending on TMDB
    id: number;
    known_for: known_for[];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string | null;
}


export async function generateMetadata() {
    return {
        title: `Actors`,
        description: `Tv-Show Details`
    };
}

export default async function ActorsPage(): Promise<JSX.Element> {
    const details = await Fetch(`https://api.themoviedb.org/3/person/popular`)
    const actors = details.results
    // console.log(actors)
    return (
        <div className="flex flex-row flex-wrap gap-10 justify-center items-stretch mt-8">
            {actors.map((item: actor) => (
                <ActorsCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    profile_path={item.profile_path}
                    known_for_department={item.known_for_department}
                />
            ))}
        </div>
    )
}