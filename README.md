# news

## 步骤

如果需要新增一篇新闻，按一下步骤：

1. 在 content 文件夹新建一个 `.mdx` 或者 `.md` 文件

2. 将以下内容加入到文件顶部（包括 `---`）：

  ```yml
  ---
  # 1. 新闻标题，必填，推荐与文件名一致
  title: 新闻标题
  # 2. 新闻日期，必填，务必使用 "" 包裹
  date: "2021-07-02"
  # 3. 文章图片封面 URL 地址，可选；如果为空，则使用 https://source.unsplash.com/800x450/?city
  cover: /news/the-birth-of-smartpai.png
  # 4. 文章 URL，必填
  permalink: the-birth-of-smartpai
  # 5. 关键词，必填，按以下格式
  keywords:
    - 关键词一
    - 关键词二
    - ……
  ---
  ```

3. 添加新闻正文后保存 Commit，待 GitHub Actions 运行成功后，再次访问网站，再刷新一次后，应该就能看到新发布的新闻了！

## 问题

如果 GitHub Actions 运行失败，可能是因为新闻的 `permalink` 与其它新闻有冲突，请使用一个不同的 `permalink`！

## 说明

这个仓库存放网站首页的所有新闻，每次 main 分支有 commit 后，触发 GitHub Actions 运行 `bin/index.mjs`，将 Markdown 文章渲染成 JSON 文件，并上传到仓库的 build 分支，然后自动部署到 GitHub Pages，供网站请求使用，通过 ISR：https://vercel.com/docs/concepts/next.js/incremental-static-regeneration
