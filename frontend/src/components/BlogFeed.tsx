import BlogPost from "@/components/BlogPost"
import { useBlogs } from "@/lib/blog-data"
// import { blogPosts } from "@/lib/blog-data"

export default function BlogFeed() {
  const {blogPosts, loading}= useBlogs();

  return (
    <div className="py-8 space-y-10">
      {blogPosts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  )
}

