import { useEffect, useState } from "react";
import type { BlogPost } from "./types"
import axios from "axios";
import { BACKEND_URL } from "../../config";

// export const blogPosts: BlogPost[] = [
//   {
//     id: "1",
//     title: "How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing",
//     content:
//       "No need to create a fancy and modern website with hundreds of pages to make money online. — Making money online is the dream for many...",
//     date: "Dec 3, 2023",
//     author: {
//       name: "Peter V.",
//       avatar: "/placeholder.svg?height=40&width=40",
//     },
//     category: "Side Hustle",
//     readTime: "3 min read",
//     image: "/placeholder.svg?height=200&width=300",
//     memberOnly: true,
//     selectedForYou: false,
//   },
//   {
//     id: "2",
//     title: "To PM2, or Not to PM2: Embracing Docker for Node.js",
//     content:
//       "We've got this teeny-tiny service written Node.js, and like all services in the world its availability is very important to us. we're talking BC-era code here! Back in those dark ages, Docker didn't exist yet. We had to...",
//     date: "Oct 2, 2023",
//     author: {
//       name: "Payam Saderi",
//       avatar: "/placeholder.svg?height=40&width=40",
//     },
//     category: "Docker",
//     readTime: "4 min read",
//     image: "/placeholder.svg?height=200&width=300",
//     memberOnly: false,
//     selectedForYou: true,
//   },
//   {
//     id: "3",
//     title: "Google Has Finally Dethroned ChatGPT",
//     content:
//       "They Finally Did It — When you look at what Google has just achieved, it's no wonder OpenAI suddenly released Sora a few hours later to...",
//     date: "Feb 22, 2024",
//     author: {
//       name: "Ignacio de Gregorio",
//       avatar: "/placeholder.svg?height=40&width=40",
//     },
//     category: "AI",
//     readTime: "5 min read",
//     image: "/placeholder.svg?height=200&width=300",
//     memberOnly: true,
//     selectedForYou: false,
//   },
// ]


export const useBlogs = ()=>{
  const [blogPosts,setBlogPosts] = useState<BlogPost[]>([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/blog/bulk`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response)=>{
        setBlogPosts(response.data.blogs);
        console.log(response.data.blogs);
        setLoading(false);
      })
    },[]);

  return {blogPosts,loading};
}

