import * as cheerio from "cheerio";

export async function GetImdbRating(url) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    const html = await res.text();

    const $ = cheerio.load(html);
    const rating = $("[data-testid='rating-button__aggregate-rating__score']").text().trim();

    return rating; // return plain string, not Response.json
  } catch (error) {
    console.error("Failed to scrape IMDB rating:", error);
    return null;
  }
}
