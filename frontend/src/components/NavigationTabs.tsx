import { useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export default function NavigationTabs() {
  const [activeTab, setActiveTab] = useState("for-you")

  return (
    <div className="border-b border-gray-200">
      <div className="flex items-center">
        <button className="p-3 text-gray-500 hover:bg-gray-100 rounded-full">
          <Plus className="h-5 w-5" />
        </button>
        <nav className="flex space-x-8 ml-4">
          <button
            onClick={() => setActiveTab("for-you")}
            className={cn(
              "py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap",
              activeTab === "for-you"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
            )}
          >
            For you
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={cn(
              "py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap",
              activeTab === "following"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
            )}
          >
            Following
          </button>
        </nav>
      </div>
    </div>
  )
}

