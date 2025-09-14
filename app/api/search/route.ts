import Fetch from "@/app/utilities/Fetch";
import { NextResponse } from "next/server";

type BaseMedia = {
  id: number
  media_type: 'movie' | 'tv' | 'person';
  popularity: number;
  vote_count: number;
  vote_average: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  original_language: string;
  adult: boolean;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const results = await Fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`
    );

    const filtered = results.results.filter(
      (item: BaseMedia) => item.media_type === "movie" || item.media_type === "tv"
    );
    // console.log(filtered)
    return NextResponse.json(filtered);
  } catch (error: unknown) {
  let message = "Something went wrong";

  if (error instanceof Error) {
    message = error.message; // safe access
  }

  return NextResponse.json(
    { error: message },
    { status: 500 }
  );
}
}
