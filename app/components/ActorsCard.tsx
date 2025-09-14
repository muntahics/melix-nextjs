import Image from "next/image"
import Link from "next/link"
import type { JSX } from "react"

type actor = {
    id: number
    name: string
    profile_path: string | null
    known_for_department: string
}

export default function ActorsCard({id,name,profile_path,known_for_department}:actor):JSX.Element{
    return(
        <div className="rounded-2xl border-4 border-gray-500 px-2 py-2 text-amber-50 shadow-2xl hover:transition-transform transition-discrete duration-300 ease-in-out delay-150 hover:scale-105">
            <Link href={`/actors/${id}`}>
                <Image className="rounded-2xl" src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt="name" width={250} height={300}></Image>
                <h2 className="mt-2 block text-center max-w-[250px] text-lg">{name}</h2>
                <h3 className="text-center max-w-[250px]">{known_for_department}</h3>

            </Link>
        </div>
    )
}