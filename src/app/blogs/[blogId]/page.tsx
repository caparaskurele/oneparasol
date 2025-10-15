import Image from "next/image";
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export default async function BlogPostPage({ params }: { params: { blogId: string } }) {
  const root = path.join(process.cwd(), "content", "blogs");
  const postPath = path.join(root, `${params.blogId}.md`);
  if (!fs.existsSync(postPath)) return <div>Post not found</div>;
  const file = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(file);

  const imageSrc = data.image || "/img/default-blog.png";

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Link href="/blogs" className="text-sm text-indigo-600 hover:underline">← Back to Blogs</Link>

      <h1 className="text-3xl font-bold mt-4 mb-6">{data.title}</h1>

      <div className="mb-6">
        <Image src={imageSrc} alt={data.title || "Blog image"} width={1200} height={700} className="rounded" priority />
      </div>

      <article className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </main>
  );
}
