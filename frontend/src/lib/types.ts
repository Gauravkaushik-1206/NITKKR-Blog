export interface Author {
    name: string
    avatar: string
  }
  
  export interface BlogPost {
    id: string
    title: string
    excerpt: string
    date: string
    author: Author
    category: string
    readTime: string
    image?: string
    memberOnly: boolean
    selectedForYou?: boolean
  }
  
  