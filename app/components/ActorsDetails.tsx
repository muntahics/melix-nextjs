import Image from "next/image"
import Link from "next/link"
import type { JSX } from "react"
import FormatDate from "../utilities/FormatDate"

type Props = {
    birthday: string
    deathday?: string
    id: number
    name: string
    also_known_as: string[]
    place_of_birth: string
    profile_path: string
    biography: string
    known_for: any
    instaId:string
}

export default function ActorsDetails({birthday, deathday, id, name, also_known_as, place_of_birth, profile_path, biography, known_for, instaId}:Props):JSX.Element{
    
    const currentYear = new Date().getFullYear()
    //  console.log(birthday)

    return(
        <main className="lg:flex lg:flex-col lg:justify-center lg:items-center">
            <div className="flex flex-col md:flex-row m-6 lg:max-w-360">
                <Image className="rounded-3xl hover:bg-blend-overlay" src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt="name" width={400} height={600}></Image>
                
                <div className="flex flex-col justify-start max-sm:gap-2 gap-4 md:ml-6">
                    <h1 className="text-amber-50 text-2xl font-bold font-mono mt-3 self-start">{name}</h1>
                    {instaId&&<span className="block text-gray-300"><Link href={`https://instagram.com/${instaId}`} target="__blank"><Image src="/insta.png" alt="Insta Id" width={50} height={50}/></Link></span>} 
                    {also_known_as&&<span className="block text-gray-300">Known As: {also_known_as}</span>} 
                    {deathday && <span className="block text-gray-300">Died: ${FormatDate(deathday)}</span>}
                    {birthday&&<span className="block text-gray-300">Born: {FormatDate(birthday)}</span>} 
                    {birthday&&<span className="block text-gray-300">Age: {currentYear - Number(birthday.slice(0,4))}</span>} 
                     
                    
                    {place_of_birth&&<span className="block text-gray-300">Birthplace: {place_of_birth}</span>} 
                    {/* <span className="block text-gray-300">Languages: {languages.map(item => item.english_name).join(', ')}</span>  */}
                    {/* <span className="block text-gray-300">Country: {production_countries.map(item=>item.name).join(', ')}</span>  */}

                    {biography&&<p className="inline text-gray-300"><span className="text-lg text-gray-300">Biography: </span>{biography}</p>}
                    {/* <span className="block text-gray-300">Company: {production_companies.map(item=>item.name).join(', ')}</span>  */}
                </div>                

            </div>
            
            <div className="inline-flex flex-row flex-wrap gap-10 border-3 rounded-xl border-gray-500 justify-center items-start p-4">
                <h1 className="self-start w-full">Known For:</h1>
                {
                    known_for.map((item:any) => (
                        <div key={Math.random().toString(36)} className="flex flex-col gap-2">
                            <Link href={item.media_type===`movie`?`/movie/${item.id}`:`/tvshows/${item.id}`}>
                                <div className="relative group w-[170px] cursor-pointer">
                                    <Image
                                      key={item.id}
                                      src={item.poster_path===null?`/placehold.png`:`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                      alt={item.title || item.name}
                                      width={170}
                                      height={170}
                                      className="rounded-2xl"
                                    />
                                    {/* Overlay */}
                                    <div
                                      className="absolute inset-0 rounded-2xl bg-gray-600/60 opacity-0 group-active:opacity-100 group-hover:opacity-100 transition-opacity">
                                    </div>
                                    <h2 className="text-center">{item.name || item.title}</h2>
                                <h2 className="text-center">{item.character}</h2>
                                <h2 className="text-center text-gray-400 uppercase">{item.media_type}</h2>
                                </div>

                                
                            </Link>
                        </div>

                        
                    ))
                }
            </div>
        </main>
    )
}