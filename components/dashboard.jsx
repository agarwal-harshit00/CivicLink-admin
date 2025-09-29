  "use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  FileText,
  BarChart3,
  Settings,
  Bell,
  Menu,
  Sparkles,
  Zap,
  Brain
} from "lucide-react"
import { DashboardOverview } from "@/components/dashboard-overview"
import { ComplaintsList } from "@/components/complaints-list"
import { AnalyticsView } from "@/components/analytics-view"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigationItems = [
    { id: "overview", label: "AI Overview", icon: Brain },
    { id: "complaints", label: "Smart Issues", icon: FileText },
    { id: "analytics", label: "Intelligence", icon: BarChart3 },
    { id: "settings", label: "Configuration", icon: Settings }
  ]

  const NavigationContent = () => (
    <nav className="p-6">
      <div className="space-y-3">
        {navigationItems.map(item => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className="w-full justify-start text-sm font-medium transition-all duration-200 hover:scale-105"
              onClick={() => {
                setActiveTab(item.id)
                setSidebarOpen(false)
              }}
            >
              <Icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          )
        })}
      </div>
    </nav>
  )

  return (
    <div className="min-h-screen bg-background ai-gradient">
      <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 px-4 sm:px-6 py-4 ai-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 p-0 bg-card/95 backdrop-blur-xl"
              >
                <div className="flex items-center space-x-3 p-6 border-b border-border/50">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center ai-glow">
                    <Brain className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gradient">
                      CivicLink AI
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      Intelligent Municipal Platform
                    </p>
                  </div>
                </div>
                <NavigationContent />
              </SheetContent>
            </Sheet>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center ai-glow">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gradient">
                  CivicLink AI
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Intelligent Municipal Platform
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
            </Button>

            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">AI Administrator</p>
                <p className="text-xs text-muted-foreground">
                  Municipal Intelligence
                </p>
              </div>
              <Badge
                variant="default"
                className="bg-primary/10 text-primary border-primary/20"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </div>

            <Button variant="ghost" size="sm" className="text-accent">
              <Zap className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        <aside className="hidden md:block w-72 bg-card/50 backdrop-blur-xl border-r border-border/50 min-h-[calc(100vh-73px)]">
          <NavigationContent />
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-8">
          {activeTab === "overview" && <DashboardOverview />}
          {activeTab === "complaints" && <ComplaintsList />}
          {activeTab === "analytics" && <AnalyticsView />}
          {activeTab === "settings" && (
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <Settings className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gradient">
                    AI Configuration
                  </h2>
                  <p className="text-muted-foreground">
                    Advanced system settings and intelligence parameters
                  </p>
                </div>
              </div>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-primary" />
                    <span>Neural Network Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Configure AI processing and automation parameters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Advanced AI configuration panel coming soon...
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
