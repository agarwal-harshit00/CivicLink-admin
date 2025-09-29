"use client"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"
import {
  MapPin,
  Calendar,
  UserIcon,
  MessageSquare,
  Save,
  X,
  Brain
} from "lucide-react"

export function ComplaintModal({ complaint, onClose, onUpdate }) {
  const [loading, setLoading] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [status, setStatus] = useState(complaint.status)
  const [priority, setPriority] = useState(complaint.priority)
  const [assignedDepartment, setAssignedDepartment] = useState(
    complaint.assignedDepartment || "Unassigned"
  )
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const userData = await api.getUsers()
      setUsers(userData)
    } catch (error) {
      console.error("Failed to fetch users:", error)
    }
  }

  const handleUpdate = async () => {
    try {
      setLoading(true)
      await api.updateComplaint(complaint.id, {
        status,
        priority,
        assignedDepartment: assignedDepartment || null
      })
      onUpdate()
      onClose()
    } catch (error) {
      console.error("Failed to update complaint:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    try {
      setLoading(true)
      await api.addComment(complaint.id, newComment)
      setNewComment("")
      onUpdate()
    } catch (error) {
      console.error("Failed to add comment:", error)
    } finally {
      setLoading(false)
    }
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-lg sm:text-xl font-bold text-gradient pr-2">
                {complaint.title}
              </DialogTitle>
              <DialogDescription className="mt-2 flex items-center space-x-2">
                <Brain className="w-4 h-4 text-primary" />
                <span>AI Analysis ID: #{complaint.id}</span>
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>AI Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed text-sm sm:text-base">
                  {complaint.description}
                </p>
              </CardContent>
            </Card>

            {/* Images */}
            {complaint.images.length > 0 && (
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">
                    Visual Evidence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {complaint.images.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-video bg-muted rounded-lg overflow-hidden"
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Complaint image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comments */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>
                    AI Insights & Comments ({complaint.comments.length})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {complaint.comments.map(comment => (
                  <div
                    key={comment.id}
                    className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 mb-2">
                      <span className="font-medium text-sm sm:text-base">
                        {comment.author}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {formatDate(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-foreground text-sm sm:text-base">
                      {comment.message}
                    </p>
                  </div>
                ))}

                {/* Add Comment */}
                <div className="border-t pt-4">
                  <Textarea
                    placeholder="Add AI-powered analysis or comment..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="mb-3 text-sm sm:text-base bg-background/50"
                  />
                  <Button
                    onClick={handleAddComment}
                    disabled={loading || !newComment.trim()}
                    size="sm"
                    className="bg-primary/10 border-primary/20 hover:bg-primary/20"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Insight
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Priority */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  AI Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge
                    variant={getStatusColor(complaint.status)}
                    className="capitalize text-xs"
                  >
                    {complaint.status}
                  </Badge>
                  <Badge
                    variant={getPriorityColor(complaint.priority)}
                    className="capitalize text-xs"
                  >
                    {complaint.priority} Priority
                  </Badge>
                  <Badge
                    variant="outline"
                    className="capitalize text-xs bg-accent/10 text-accent-foreground border-accent/20"
                  >
                    {complaint.category}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Status
                    </label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="text-sm bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Priority
                    </label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger className="text-sm bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Department
                    </label>
                    <Select
                      value={assignedDepartment}
                      onValueChange={setAssignedDepartment}
                    >
                      <SelectTrigger className="text-sm bg-background/50">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Unassigned">Unassigned</SelectItem>
                        <SelectItem value="Public Works">
                          Public Works
                        </SelectItem>
                        <SelectItem value="Utilities">Utilities</SelectItem>
                        <SelectItem value="Administration">
                          Administration
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="w-full"
                    size="sm"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update with AI
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Issue Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground break-words">
                      {complaint.location.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <UserIcon className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Reported By</p>
                    <p className="text-sm text-muted-foreground break-words">
                      {complaint.reportedBy}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Calendar className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(complaint.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Calendar className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(complaint.updatedAt)}
                    </p>
                  </div>
                </div>

                {complaint.assignedDepartment && (
                  <div className="flex items-start space-x-2">
                    <UserIcon className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">Assigned Department</p>
                      <p className="text-sm text-muted-foreground">
                        {complaint.assignedDepartment}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
