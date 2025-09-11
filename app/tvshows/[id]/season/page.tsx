import type { JSX } from "react"
import Fetch from "@/app/utilities/Fetch"
import SeasonCard from "@/app/components/SeasonCard"
type ParamsProps = {
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

export default async function SeasonPage({params}:ParamsProps):Promise<JSX.Element>{
    const {id} = await params
    const details = await Fetch(`https://api.themoviedb.org/3/tv/${id}`)
    const seasons = details.seasons
    // console.log(seasons)
    
    return(
        <div className="flex flex-row flex-wrap gap-10 justify-center items-stretch mt-8">
            {seasons.map((item:any)=>(
                <SeasonCard 
          key={item.id}
          tmdb_id={id}
          poster={item.poster_path}
          title={item.name}
          id={item.id}
          date={item.air_date}
          season_number = {item.season_number}
          episode_count = {item.episode_count}
        />
            ))}

            </div>
        
    )
}