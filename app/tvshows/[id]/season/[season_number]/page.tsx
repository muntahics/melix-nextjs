import Fetch from "@/app/utilities/Fetch"
import type { JSX } from "react"
import EpisodeCard from "@/app/components/EpisodeCard"

type ParamsProps = {
    params: {id: number, season_number: number}
}

type CrewMember = {
  job: string;
  department: string;
  credit_id: string;
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

type GuestStar = {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};


type Episode = {
  air_date: string | null;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: CrewMember[]; // Or a more specific type like CrewMember[]
  guest_stars: GuestStar[]; // Or a more specific type like GuestStar[]
};

export async function generateMetadata({ params }:ParamsProps) {
  const {id, season_number} = await params
  const details = await Fetch(`https://api.themoviedb.org/3/tv/${id}`)
    return {
    title: details.name+` S`+season_number,
    description: `Tv-Show Details`
  };
}

export default async function MovieDetailsPage({params}:ParamsProps): Promise<JSX.Element>{
    const {id,season_number} = await params
    const details = await Fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}`)
    const episodes = details.episodes
    // console.log(episodes)
    return(
        <div className="flex flex-row flex-wrap gap-10 justify-center items-stretch mt-8">
            {episodes.map((item:Episode)=>(
                <EpisodeCard
                    key={item.id} 
                    tmdb_id={id}
                    poster={item.still_path}
                    title={item.name}
                    date={item.air_date || '2000-01-01'}
                    season_number={item.season_number}
                    episode_number={item.episode_number}
                />
            ))}
        </div>
    )
}