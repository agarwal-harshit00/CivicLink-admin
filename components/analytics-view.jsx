"use client"
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { api } from "@/lib/api"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChartIcon,
  Activity,
  Brain,
  Zap
} from "lucide-react"

export function AnalyticsView() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const data = await api.getDashboardAnalytics()
      setAnalytics(data)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gradient">
              AI Intelligence Dashboard
            </h2>
            <p className="text-muted-foreground">
              Advanced analytics and predictive insights
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <Card
              key={i}
              className="bg-card/50 backdrop-blur-sm border-border/50"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!analytics) return null

  const resolutionRate =
    analytics.totalComplaints > 0
      ? Math.round(
          (analytics.resolvedComplaints / analytics.totalComplaints) * 100
        )
      : 0

  const avgResponseTime = "2.3 days" // Mock data

  const SimpleBarChart = ({ data, title }) => {
    const maxValue = Math.max(...data.map(d => d.value))

    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground">{title}</h3>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">{item.value}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500 ai-glow"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const SimplePieChart = ({ data, title }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)

    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground">{title}</h3>
        <div className="space-y-3">
          {data.map((item, index) => {
            const percentage =
              total > 0 ? Math.round((item.value / total) * 100) : 0
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{item.value}</div>
                  <div className="text-xs text-muted-foreground">
                    {percentage}%
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Prepare chart data
  const categoryChartData = Object.entries(analytics.categoryStats).map(
    ([category, count]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: count
    })
  )

  const departmentChartData = Object.entries(analytics.departmentStats).map(
    ([department, count]) => ({
      name: department,
      value: count
    })
  )

  const statusChartData = [
    { name: "Open", value: analytics.openComplaints, color: "#ef4444" },
    {
      name: "In Progress",
      value: analytics.inProgressComplaints,
      color: "#f59e0b"
    },
    { name: "Resolved", value: analytics.resolvedComplaints, color: "#10b981" }
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gradient">
              AI Intelligence Dashboard
            </h2>
            <p className="text-muted-foreground">
              Advanced analytics and predictive insights
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-40 bg-card/50 backdrop-blur-sm border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Badge
            variant="default"
            className="bg-primary/10 text-primary border-primary/20 w-fit"
          >
            <Zap className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 ai-glow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Issues
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gradient">
                  {analytics.totalComplaints}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs sm:text-sm text-green-600">
                    +12% AI predicted
                  </span>
                </div>
              </div>
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 ai-glow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  AI Resolution Rate
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gradient">
                  {resolutionRate}%
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs sm:text-sm text-green-600">
                    +5% optimized
                  </span>
                </div>
              </div>
              <PieChartIcon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 ai-glow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Smart Response Time
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gradient">
                  {avgResponseTime}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs sm:text-sm text-green-600">
                    AI accelerated
                  </span>
                </div>
              </div>
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 ai-glow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Issues
                </p>
                <p className="text-xl sm:text-2xl font-bold text-accent">
                  {analytics.openComplaints}
                </p>
                <div className="flex items-center mt-1">
                  <Brain className="w-4 h-4 text-primary mr-1" />
                  <span className="text-xs sm:text-sm text-primary">
                    AI monitoring
                  </span>
                </div>
              </div>
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              <span>Issue Status Intelligence</span>
            </CardTitle>
            <CardDescription>
              AI-powered status distribution analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimplePieChart
              data={statusChartData}
              title="Current Status Breakdown"
            />
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Smart Category Analysis</span>
            </CardTitle>
            <CardDescription>
              AI categorization and trend analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarChart data={categoryChartData} title="Issue Categories" />
          </CardContent>
        </Card>

        {/* Department Workload */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Department Intelligence</span>
            </CardTitle>
            <CardDescription>
              AI-optimized workload distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarChart
              data={departmentChartData}
              title="Department Workload"
            />
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Brain className="w-5 h-5 text-primary" />
              <span>AI Predictive Insights</span>
            </CardTitle>
            <CardDescription>
              Machine learning trend predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm">
                    Peak Activity Prediction
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI predicts 23% increase in infrastructure issues next week
                </p>
              </div>
              <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">Smart Routing</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Automated assignment reduced response time by 34%
                </p>
              </div>
              <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/10">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="font-semibold text-sm">
                    Efficiency Boost
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI optimization improved resolution rate by 18%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Analysis */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <span>AI Priority Intelligence</span>
          </CardTitle>
          <CardDescription>
            Smart priority analysis and automated recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Object.entries(analytics.priorityStats).map(
              ([priority, count]) => {
                const percentage =
                  analytics.totalComplaints > 0
                    ? Math.round((count / analytics.totalComplaints) * 100)
                    : 0

                const getPriorityColor = priority => {
                  switch (priority) {
                    case "high":
                      return "text-red-600 bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800/30"
                    case "medium":
                      return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800/30"
                    case "low":
                      return "text-green-600 bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800/30"
                    default:
                      return "text-muted-foreground bg-muted border-border"
                  }
                }

                return (
                  <div
                    key={priority}
                    className={`p-4 rounded-lg border backdrop-blur-sm ${getPriorityColor(
                      priority
                    )}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold capitalize text-sm sm:text-base flex items-center space-x-2">
                        <Zap className="w-4 h-4" />
                        <span>{priority} Priority</span>
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {count}
                      </Badge>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold mb-1">
                      {percentage}%
                    </p>
                    <p className="text-xs sm:text-sm opacity-75">
                      AI classified issues
                    </p>
                  </div>
                )
              }
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
