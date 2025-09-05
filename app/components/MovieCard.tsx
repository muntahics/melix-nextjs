import Image from "next/image"
import Link from "next/link"


type genre = {
    id: number,
    name: string
}

export default function MovieCard({poster, title, id, date, genre_ids, genres}:{poster:string, title:string, id:number, date:string, genre_ids:number[], genres: genre[]}){
    
   
    let genreNames: string[] = []
    const getGenres =    ()=>(genres.map((genre:genre)=>genre_ids.map((item)=>item===genre.id?genreNames.push(genre.name):null)))
    getGenres()
    
    return(
        <div className="">
            <Link href={`/movie/${id}`}>
                <Image className="rounded-2xl" src={`https://image.tmdb.org/t/p/w500/${poster}`} alt="name" width={250} height={300}></Image>
                <h2 className="block text-center max-w-[250px] text-lg">{title}</h2>
                <h3 className="text-center max-w-[250px]">{date} | {genreNames.join(' ')}</h3>

            </Link>
        </div>
    )
}