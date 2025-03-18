import BlogPost from "@/components/BlogPost"
import { blogPosts } from "@/lib/blog-data"

export default function BlogFeed() {
  return (
    <div className="py-8 space-y-10">
      {blogPosts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  )
}

