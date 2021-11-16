# news

## 步骤

如果需要新增一篇新闻，请按以下步骤：

1. 在 content 文件夹新建一个 `.mdx` 或者 `.md` 文件

2. 将以下内容复制到文件顶部（包括 `---`）：

  ```yml
  ---
  # 1. 新闻标题，必填，推荐与文件名一致
  title: 智排的诞生
  # 2. 新闻日期，必填，务必使用 "" 包裹
  date: "2021-07-02"
  # 3. 文章图片封面 URL 地址，可选；如果为空，则使用 https://source.unsplash.com/800x450/?city
  #    将图片上传到 images 文件夹后，将图片文件名（英文）填写到此处即可
  cover: /images/the-birth-of-smartpai.png
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

1. 如何在新闻内容内添加图片？

  将图片上传到 images 文件夹后，在 Markdown 文件中使用如下格式：

  ```md
  ![alt text](/images/name.jpg "title")
  ```

  即可引入图片，` "title"` 可选。

2. GitHub Actions 运行失败

  可能是因为新闻的 `permalink` 与其它新闻有冲突，请使用一个不同的 `permalink`！

## 说明

这个仓库存放网站首页的所有新闻，每次 main 分支有 commit 后，触发 GitHub Actions 运行 `bin/index.mjs`，将 Markdown 文章渲染成 JSON 文件，并上传到仓库的 build 分支，然后自动部署到 GitHub Pages，供网站请求使用，通过 ISR：https://vercel.com/docs/concepts/next.js/incremental-static-regeneration

至于图片，全部都存放在阿里云 OSS 上，图片上传到本仓库的 images 文件夹后，GitHub Actions 自动运行 `ossutil64` 命令，实现图片的同步。此外在代码仓库，还需要自定义图片的 loader，参考：https://nextjs.org/docs/api-reference/next/image#loader
