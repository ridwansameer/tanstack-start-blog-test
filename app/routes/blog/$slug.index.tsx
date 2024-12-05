import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { z } from "zod";
import Markdown from "react-markdown";

const fetchBlogPost = createServerFn({ method: "GET" })
  .validator(z.string().optional())
  .handler(async ({ data: slug }) => {
    console.log(slug);
    const post = await readFile(`./app/blog-posts/${slug}.md`, "utf-8");
    const frontmatter = matter(post);
    return {
      title: frontmatter.data.title,
      content: frontmatter.content,
      date: frontmatter.data.date,
      author: frontmatter.data.author,
    };
  });

export const Route = createFileRoute("/blog/$slug/")({
  component: RouteComponent,
  loader: ({ params }) => fetchBlogPost({ data: params.slug }),
});

function RouteComponent() {
  const { title, content, date, author } = Route.useLoaderData();
  return (
    <div>
      <h1>{title}</h1>
      <p>{date.toLocaleDateString()}</p>
      <p>{author}</p>
      <Markdown>{content}</Markdown>
    </div>
  );
}
