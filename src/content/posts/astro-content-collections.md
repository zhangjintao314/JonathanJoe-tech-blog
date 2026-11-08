---
title: "Astro Content Collections：让技术文章成为结构化内容"
description: "使用 schema 管理 Markdown 元数据，通过静态路由生成文章详情页。"
pubDate: 2026-11-07
author: "Jonathan Joe"
category: "Web Engineering"
tags: ["Astro", "Markdown", "TypeScript"]
---

# 为什么使用 Content Collections？

个人博客的文章不应该只是散落在页面里的字符串。Astro Content Collections 可以为 Markdown / MDX 内容定义 schema，并在构建阶段检查 frontmatter。

## 文章元数据

本项目在 `src/content.config.ts` 中定义 `posts` 集合：

```ts
const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([])
  })
});
```

这样，文章的标题、日期、标签等字段都有明确类型。

## 新建文章

在 `src/content/posts/` 下创建 Markdown 文件，填写 frontmatter，然后执行：

```bash
npm run dev
```

文章列表和详情页会从集合中自动读取内容，无需手动维护路由。
