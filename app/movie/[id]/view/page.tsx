import type { JSX } from "react"
import MovieView from "@/app/components/MovieView"
import Fetch from "@/app/utilities/Fetch"

type ParamsProps={
    params: {id: number}
}

export default async function MovieViewPage({params}:ParamsProps):Promise<JSX.Element>{
    const {id}= await params
    const movie = await Fetch(`https://api.themoviedb.org/3/movie/${id}`)
    
    
    
    return(
        <>
        <main className="flex flex-col flex-wrap justify-center items-center h-150 md:h-screen">
            <MovieView 
                key={id}
                id={id}
                title={movie.title}
            />
        </main>
        <footer><p>Disclaimer: The contents of this website are publicly available.</p></footer>
        </>
    )
}