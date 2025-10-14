/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import blogs from "@/data/blogs.json"

export default function BlogPage() {
  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Latest Blogs</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link href={`/blogs/${blog.id}`} key={blog.id}>
            <div className="rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer bg-white">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-500 mb-3">
                  By {blog.author} · {new Date(blog.date).toDateString()}
                </p>
                <p className="text-gray-700 text-sm line-clamp-3">{blog.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
