import { Plus } from "lucide-react"

interface EditorProps {
  title: string
  content: string
  onTitleChange: (value: string) => void
  onContentChange: (value: string) => void
}

export default function Editor({ title, content, onTitleChange, onContentChange }: EditorProps) {
  return (
    <div className="py-8">
      <div className="flex">
        <div className="mr-4 pt-2">
          <button
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
            aria-label="Add content"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1">
          <div
            className="border-b border-transparent"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => onTitleChange(e.currentTarget.textContent || "")}
            onBlur={(e) => onTitleChange(e.currentTarget.textContent || "")}
            className="block w-full text-5xl font-serif text-gray-300 focus:text-gray-900 focus:outline-none mb-4 empty:before:content-['Title'] empty:before:text-gray-300"
            data-placeholder="Title"
          >
            {title}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => onContentChange(e.currentTarget.textContent || "")}
            onBlur={(e) => onContentChange(e.currentTarget.textContent || "")}
            className="block w-full text-xl text-gray-400 focus:text-gray-700 focus:outline-none mt-4 empty:before:content-['Tell_your_story...'] empty:before:text-gray-300"
            data-placeholder="Tell your story..."
          >
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}

