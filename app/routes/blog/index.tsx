import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { readdir } from "node:fs/promises";

const fetchPostList = createServerFn({ method: "GET" }).handler(async () => {
  const posts = await readdir("./app/blog-posts");
  return posts.map((post) => post.replace(".md", ""));
});

export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
  loader: () => fetchPostList(),
});

function RouteComponent() {
  const posts = Route.useLoaderData();

  return (
    <div>
      {posts.map((post) => (
        <div key={post}>
          <Link to="/blog/$slug" params={{ slug: post }}>
            {post}
          </Link>
        </div>
      ))}
    </div>
  );
}
