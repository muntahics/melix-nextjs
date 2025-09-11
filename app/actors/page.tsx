import type { JSX } from "react"
import Fetch from "@/app/utilities/Fetch"
import ActorsCard from "../components/ActorsCard"

export async function generateMetadata() {
    return {
    title: `Actors`,
    description: `Tv-Show Details`
  };
}

export default async function ActorsPage():Promise<JSX.Element>{
    const details = await Fetch(`https://api.themoviedb.org/3/person/popular`)
    const actors = details.results
    // console.log(actors)
    return(
        <div className="flex flex-row flex-wrap gap-10 justify-center items-stretch mt-8">
            {actors.map((item:any)=>(
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