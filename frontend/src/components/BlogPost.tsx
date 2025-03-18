import { BookmarkIcon, MinusCircle, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BlogPost as BlogPostType } from "@/lib/types"

interface BlogPostProps {
  post: BlogPostType
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 min-w-0">
        <div className="flex items-center mb-2">
          <Avatar className="h-8 w-8 mr-3">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex items-center text-sm">
            <span className="font-medium">{post.author.name}</span>
            <span className="mx-1">·</span>
            <span className="text-gray-500">{post.date}</span>
            {post.memberOnly && (
              <>
                <span className="mx-1 text-gray-500">·</span>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>Member-only</span>
                </div>
              </>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold mb-2 leading-tight">{post.title}</h2>
        <p className="text-gray-700 mb-3 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800">
              {post.category}
            </Badge>
            <span className="text-sm text-gray-500">{post.readTime}</span>
            {post.selectedForYou && (
              <>
                <span className="text-sm text-gray-500">·</span>
                <span className="text-sm text-gray-500">Selected for you</span>
              </>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <BookmarkIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <MinusCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {post.image && (
        <div className="w-full md:w-40 h-32 relative flex-shrink-0">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover rounded w-full h-auto" />
        </div>
      )}
    </article>
  )
}

