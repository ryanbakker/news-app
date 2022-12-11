export default function sortNewsByImage(news: NewsResponse) {
  // Access data and filter
  const newsWithImage = news.data.filter((item) => item.image !== null);
  const newsWithoutImage = news.data.filter((item) => item.image == null);

  const sortedNewsResponse = {
    pagination: news.pagination,
    data: [...newsWithImage, ...newsWithoutImage],
  };

  return sortedNewsResponse;
}
