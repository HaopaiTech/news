import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const NEWS_PATH = path.join(process.cwd(), '/../content');

function getNewsPaths() {
  return (
    fs
      .readdirSync(NEWS_PATH)
      // Only include md(x) files
      .filter((path) => /\.mdx?$/.test(path))
      // Exclude README.md
      .filter((path) => path !== 'README.md')
  );
}

function getNews(metaOnly) {
  const news = getNewsPaths();

  return news
    .map((filePath) => {
      const fullPath = path.join(NEWS_PATH, filePath);
      const { content, data } = matter(fs.readFileSync(fullPath));

      if (metaOnly) {
        return {
          data,
        };
      } else {
        return {
          content,
          data,
        };
      }
    })
    .sort((news1, news2) => (news1.data.date < news2.data.date ? 1 : -1));
}

function saveNews(filename, news) {
  fs.writeFileSync(
    path.join(NEWS_PATH, `/../data/${filename}.json`),
    JSON.stringify(news)
  );
}

saveNews('news', getNews());
saveNews('meta', getNews(true));
