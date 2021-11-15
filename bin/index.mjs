import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const NEWS_PATH = path.join(process.cwd(), '/../content');

function getNewsFilenames() {
  return (
    fs
      .readdirSync(NEWS_PATH)
      // Only include md(x) files
      .filter((filename) => /\.mdx?$/.test(filename))
      // Exclude README.md
      .filter((filename) => filename !== 'README.md')
  );
}

function getNews(metaOnly) {
  const newsFilenames = getNewsFilenames();

  const news = newsFilenames.map((filename) => {
    const fullPath = path.join(NEWS_PATH, filename);
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
  });

  // Sort by date descending, i.e.
  //   2021-11-11
  //   2021-11-10
  return news.sort((news1, news2) =>
    news1.data.date < news2.data.date ? 1 : -1
  );
}

function saveNews(type, data) {
  if (type === 'meta') {
    // Write all news meta to one single file
    fs.writeFileSync(
      path.join(NEWS_PATH, '/../bin/data/meta.json'),
      JSON.stringify(data)
    );
  } else {
    // Clean up bin/data/news/
    fs.rmdirSync(path.join(NEWS_PATH, '/../bin/data/news/'), {
      recursive: true,
    });
    fs.mkdirSync(path.join(NEWS_PATH, '/../bin/data/news/'), {
      recursive: true,
    });

    // Write every news to the corresponding file named {permalink}.json
    // under bin/data/news/
    for (const item of data) {
      const fullPath = path.join(
        NEWS_PATH,
        `/../bin/data/news/${item.data.permalink}.json`
      );

      if (!fs.existsSync(fullPath)) {
        // Create the file if it doesn't exist
        fs.writeFileSync(fullPath, JSON.stringify(item));
      } else {
        // Throw an error if the file already exists
        throw new Error(
          `Set another different permalink for ${item.data.title}! File ${fullPath} already exists!`
        );
      }
    }
  }
}

saveNews('meta', getNews(true));
saveNews('news', getNews());
