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
import { api } from "@/lib/api"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  MapPin
} from "lucide-react"

export function DashboardOverview() {
  const [analytics, setAnalytics] = useState(null)
  const [recentComplaints, setRecentComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsData, complaintsData] = await Promise.all([
          api.getDashboardAnalytics(),
          api.getComplaints()
        ])

        setAnalytics(analyticsData)
        setRecentComplaints(complaintsData.slice(0, 5))
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 sm:p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-slate-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const getPriorityColor = priority => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = status => {
    switch (status) {
      case "open":
        return <AlertTriangle className="w-4 h-4" />
      case "in-progress":
        return <Clock className="w-4 h-4" />
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Dashboard Overview
        </h2>
        <Badge variant="outline" className="text-xs w-fit">
          Last updated: {new Date().toLocaleTimeString()}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Complaints
                </p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">
                  {analytics?.totalComplaints || 0}
                </p>
              </div>
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Open Issues
                </p>
                <p className="text-xl sm:text-2xl font-bold text-red-600">
                  {analytics?.openComplaints || 0}
                </p>
              </div>
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  In Progress
                </p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                  {analytics?.inProgressComplaints || 0}
                </p>
              </div>
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Resolved</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  {analytics?.resolvedComplaints || 0}
                </p>
              </div>
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Complaints */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Complaints</CardTitle>
            <CardDescription>
              Latest issues reported by citizens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComplaints.map(complaint => (
                <div
                  key={complaint.id}
                  className="flex items-start space-x-3 p-3 rounded-lg border border-slate-200"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(complaint.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {complaint.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Badge
                        variant={getPriorityColor(complaint.priority)}
                        className="text-xs"
                      >
                        {complaint.priority}
                      </Badge>
                      <span className="text-xs text-slate-500 capitalize">
                        {complaint.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <span className="text-xs text-slate-500 truncate">
                        {complaint.location.address}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Issues by Category</CardTitle>
            <CardDescription>Distribution of complaint types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics &&
                Object.entries(analytics.categoryStats).map(
                  ([category, count]) => (
                    <div
                      key={category}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
                        <span className="text-sm font-medium text-slate-700 capitalize truncate">
                          {category}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {count}
                      </Badge>
                    </div>
                  )
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
