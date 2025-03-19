export interface Author {
    name: string
    avatar?: string
  }
  
  export interface BlogPost {
    authorId:string
    id: string
    title: string
    content: string
    date?: string
    author?: Author
    category?: string
    readTime?: string
    image?: string
    memberOnly?: boolean
    selectedForYou?: boolean
  }
  
  