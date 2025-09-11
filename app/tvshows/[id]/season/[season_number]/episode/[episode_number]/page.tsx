import type { JSX } from "react"
import Fetch from "@/app/utilities/Fetch"
import EpisodeView from "@/app/components/EpisodeView"
import EpisodeViewCard from "@/app/components/EpisodeViewCard"
import EpisodeTopView from "@/app/components/EpisodeTopView"
// import { useRouter } from "next/navigation";
type ParamsProps = {
    params: {id:number, season_number:number, episode_number:number}
}

export default async function EpisodeViewPage({params}:ParamsProps):Promise<JSX.Element>{

    const {id, season_number, episode_number} = await params
    const details = await Fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}`)
    const tv = await Fetch(`https://api.themoviedb.org/3/tv/${id}`)
        const episodes = details.episodes.filter((item:any)=>item.episode_type==='standard')
    console.log(tv.name)
    
    return(
        <>
        <main>
            <div className="relative top-20 max-sm:left-12 left-1/2 right-1/2">
            <EpisodeTopView 
                key={tv.seasons.id}
                id={Number(id)}
                season_number={season_number}
                seasons={tv.seasons}

            />
            <span className="text-xl">{tv.name}</span><br />
            <span className="text-lg">S{season_number}E{episode_number}</span>
            </div>
            <div className="flex flex-col flex-wrap justify-center items-center h-150 md:h-screen">
                <EpisodeView 
                    id={id}
                    season_number={season_number}
                    episode_number={episode_number}
                />
            </div>
            <div className="flex flex-row flex-wrap gap-10 justify-center items-stretch mt-8">
                        {episodes.map((item:any)=>(
                            <EpisodeViewCard
                                key={item.id} 
                                tmdb_id={id}
                                poster={item.still_path}
                                title={item.name}
                                date={item.air_date}
                                season_number={item.season_number}
                                episode_number={item.episode_number}
                                current_ep={episode_number}
                            />
                        ))}
                    </div>
        </main>
        <footer>Disclaimer: The contents of this website are publicly available.</footer>
        </>
    )
}