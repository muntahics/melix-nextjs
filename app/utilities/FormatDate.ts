export default function FormatDate(release_date:string){
    function getOrdinal(n:number) {
  const s = ["th", "st", "nd", "rd"],
        v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const date = new Date(release_date);

const day = getOrdinal(date.getDate());
const month = date.toLocaleString("en-GB", { month: "long" });
const year = date.getFullYear();

const humanReadableRelease = `${day} ${month}, ${year}`;

return(humanReadableRelease)
}