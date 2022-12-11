import { categories } from "../constants";
import fetchNews from "../lib/fetchNews";

async function Homepage() {
  // Fetch news data
  const news: NewsResponse = await fetchNews(categories.join(","));

  console.log(news);

  return <div>{/* NewsList */}</div>;
}

export default Homepage;
