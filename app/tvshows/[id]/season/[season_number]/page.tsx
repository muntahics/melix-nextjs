import Fetch from "@/app/utilities/Fetch"
import type { JSX } from "react"
import EpisodeCard from "@/app/components/EpisodeCard"

type ParamsProps = {
    params: {id: number, season_number: number}
}

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
            {episodes.map((item:any)=>(
                <EpisodeCard
                    key={item.id} 
                    tmdb_id={id}
                    poster={item.still_path}
                    title={item.name}
                    date={item.air_date}
                    season_number={item.season_number}
                    episode_number={item.episode_number}
                />
            ))}
        </div>
    )
}