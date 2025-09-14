export default function GlobalLoading(){
    return(
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <div className="flex justify-center items-center border-8 border-l-slate-400 inset-2 rounded-full w-20 h-20 border-slate-600 animate-spin">
                
            </div>
            <p className="mt-2">Loading</p>
        </div>
    )
}