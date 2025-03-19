import { useState } from "react"
import Header from "../components/Header"
import Editor from "../components/Editor"

export default function BlogEditor() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [saved, setSaved] = useState(true)

  const handleTitleChange = (value: string) => {
    setTitle(value)
    setSaved(false)
    // In a real app, you might want to add debounced auto-saving here
  }

  const handleContentChange = (value: string) => {
    setContent(value)
    setSaved(false)
    // In a real app, you might want to add debounced auto-saving here
  }

  const handleSave = () => {
    // In a real app, this would save to a database or API
    console.log("Saving:", { title, content })
    setSaved(true)
  }

  const handlePublish = () => {
    // In a real app, this would publish the post
    console.log("Publishing:", { title, content })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header saved={saved} onSave={handleSave} onPublish={handlePublish} />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4">
        <Editor
          title={title}
          content={content}
          onTitleChange={handleTitleChange}
          onContentChange={handleContentChange}
        />
      </main>
    </div>
  )
}

