
type Options = {
    method: string;
    headers: {
        accept: string;
        Authorization: string;
    };
}

const options: Options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`
  }
};

export default async function Fetch(url:string){
   return(
    await fetch(url, options)
  .then(res => res.json())
  .catch(err => console.error(err))
   )
}

