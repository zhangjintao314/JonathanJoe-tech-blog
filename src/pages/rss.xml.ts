import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site } from "@/data/site";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const base = import.meta.env.BASE_URL;
  return rss({
    title: site.name,
    description: site.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `${base}blog/${post.id}/`
    }))
  });
};
