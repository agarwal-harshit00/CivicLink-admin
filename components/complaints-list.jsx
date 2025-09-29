"use client"
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Search,
  Filter,
  MapPin,
  Calendar,
  User,
  Eye,
  Sparkles
} from "lucide-react"
import { ComplaintModal } from "@/components/complaint-modal"

export function ComplaintsList() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    status: "all",
    priority: "all",
    department: "all"
  })

  useEffect(() => {
    fetchComplaints()
  }, [filters])

  const fetchComplaints = async () => {
    try {
      setLoading(true)
      const data = await api.getComplaints(filters)
      setComplaints(data)
    } catch (error) {
      console.error("Failed to fetch complaints:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
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

  const getStatusColor = status => {
    switch (status) {
      case "open":
        return "destructive"
      case "in-progress":
        return "default"
      case "resolved":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gradient">
              Smart Issue Management
            </h2>
            <p className="text-muted-foreground">
              AI-powered complaint processing and resolution
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className="text-xs w-fit bg-primary/10 text-primary border-primary/20"
        >
          {complaints.length} active issues
        </Badge>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Filter className="w-5 h-5 text-primary" />
            <span>Intelligent Filters</span>
          </CardTitle>
          <CardDescription>
            AI-enhanced filtering and search capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="sm:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="AI-powered search..."
                  value={filters.search}
                  onChange={e => handleFilterChange("search", e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>

            <Select
              value={filters.category}
              onValueChange={value => handleFilterChange("category", value)}
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="streetlight">Streetlight</SelectItem>
                <SelectItem value="pothole">Pothole</SelectItem>
                <SelectItem value="drainage">Drainage</SelectItem>
                <SelectItem value="garbage">Garbage</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.status}
              onValueChange={value => handleFilterChange("status", value)}
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.priority}
              onValueChange={value => handleFilterChange("priority", value)}
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Complaints List */}
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 bg-muted rounded w-16"></div>
                      <div className="h-6 bg-muted rounded w-20"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : complaints.length === 0 ? (
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium mb-2">No issues found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more results.
              </p>
            </CardContent>
          </Card>
        ) : (
          complaints.map(complaint => (
            <Card
              key={complaint.id}
              className="hover:shadow-lg transition-all duration-200 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold">{complaint.title}</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedComplaint(complaint)}
                      className="w-fit bg-primary/10 border-primary/20 hover:bg-primary/20"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>

                  <p className="text-muted-foreground line-clamp-2">
                    {complaint.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={getPriorityColor(complaint.priority)}
                      className="capitalize text-xs"
                    >
                      {complaint.priority} Priority
                    </Badge>
                    <Badge
                      variant={getStatusColor(complaint.status)}
                      className="capitalize text-xs"
                    >
                      {complaint.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="capitalize text-xs bg-accent/10 text-accent-foreground border-accent/20"
                    >
                      {complaint.category}
                    </Badge>
                    {complaint.assignedDepartment && (
                      <Badge variant="secondary" className="text-xs">
                        {complaint.assignedDepartment}
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span className="truncate">
                        {complaint.location.address}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span>Created {formatDate(complaint.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span className="truncate">{complaint.reportedBy}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Complaint Modal */}
      {selectedComplaint && (
        <ComplaintModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onUpdate={fetchComplaints}
        />
      )}
    </div>
  )
}
