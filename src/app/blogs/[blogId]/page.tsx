import blogs from "@/data/blogs.json"
import Image from "next/image"

type Props = {
  params: {
    blogId: string
  }
}

export default function BlogDetailPage({ params }: Props) {
  const blog = blogs.find((b) => b.id === params.blogId)

  if (!blog) return <p className="text-center mt-10">Blog not found.</p>

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        By {blog.author} · {new Date(blog.date).toDateString()}
      </p>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, "<br />") }}
      />
    </div>
  )
}
