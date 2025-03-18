import BlogFeed from "@/components/BlogFeed"
import NavigationTabs from "@/components/NavigationTabs"
import PremiumBanner from "@/components/PremiumBanner"

export default function Blogs() {
  return (
    <div className="min-h-screen bg-white">
      <PremiumBanner />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavigationTabs />
        <BlogFeed />
      </div>
    </div>
  )
}

