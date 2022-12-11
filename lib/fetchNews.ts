import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  // Graph QL query
  const query = gql`
    query MyQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "nz"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          author
          category
          country
          description
          image
          language
          published_at
          source
          title
          url
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;

  // Fetch function with Nextjs caching
  const res = await fetch(
    "https://cruzalta.stepzen.net/api/news-app/__graphql",
    {
      method: "POST",
      // If not dynamic, refresh every 20s
      cache: isDynamic ? "no-cache" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          categories: category,
          keywords: keywords,
        },
      }),
    }
  );

  console.log("Loading data for category >>> ", category, keywords);

  const newsResponse = await res.json();

  // Sort function by images vs not images present
  const news = sortNewsByImage(newsResponse.data.myQuery);

  // return result
  return news;
};

export default fetchNews;

// stepzen import curl "http://api.mediastack.com/v1/news?access_key=0438f5503f6a807dbc23f2903d224b33&countries=us%2Cgb&limit=100&offset=0&sort=published_desc"
