import Image from "next/image"

export default function NotFoundPage(){
    return(
        <div className="flex flex-col justify-center items-center w-screen h-screen animate-pulse">
            <Image className="rounded-full" src="/404.jpeg" alt="404" width={500} height={500} />
        </div>
    )
}