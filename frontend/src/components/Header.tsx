import { Bell, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface HeaderProps {
  saved: boolean
  onSave: () => void
  onPublish: () => void
}

export default function Header({ saved, onSave, onPublish }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-black rounded-full mr-1"></div>
                <div className="h-8 w-4 bg-black rounded-full"></div>
              </div>
            </div>
            <div className="ml-4 flex items-center space-x-4">
              <span className="text-gray-900 font-medium">Draft in Kirags</span>
              <span className="text-gray-500">{saved ? "Saved" : "Saving..."}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={onPublish} className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2">
              Publish
            </Button>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreHorizontal className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-6 w-6" />
            </button>
            <Avatar className="h-8 w-8 bg-gray-500 text-white">
              <AvatarFallback>h</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}

