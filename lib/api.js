import { mockComplaints, mockUsers } from "./mock-data"

// Local state to simulate database
const complaints = [...mockComplaints]
const users = [...mockUsers]

export const api = {
  // Complaints
  getComplaints: async filters => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    let filteredComplaints = [...complaints]

    // Apply filters
    if (filters?.category && filters.category !== "all") {
      filteredComplaints = filteredComplaints.filter(
        c => c.category === filters.category
      )
    }

    if (filters?.status && filters.status !== "all") {
      filteredComplaints = filteredComplaints.filter(
        c => c.status === filters.status
      )
    }

    if (filters?.priority && filters.priority !== "all") {
      filteredComplaints = filteredComplaints.filter(
        c => c.priority === filters.priority
      )
    }

    if (filters?.department && filters.department !== "all") {
      filteredComplaints = filteredComplaints.filter(
        c => c.assignedDepartment === filters.department
      )
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase()
      filteredComplaints = filteredComplaints.filter(
        c =>
          c.title.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower) ||
          c.location.address.toLowerCase().includes(searchLower)
      )
    }

    return filteredComplaints
  },

  getComplaint: async id => {
    await new Promise(resolve => setTimeout(resolve, 200))

    const complaint = complaints.find(c => c.id === id)
    if (!complaint) {
      throw new Error("Complaint not found")
    }
    return complaint
  },

  updateComplaint: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 300))

    const complaintIndex = complaints.findIndex(c => c.id === id)
    if (complaintIndex === -1) {
      throw new Error("Complaint not found")
    }

    complaints[complaintIndex] = {
      ...complaints[complaintIndex],
      status: updates.status || complaints[complaintIndex].status,
      priority: updates.priority || complaints[complaintIndex].priority,
      assignedTo:
        updates.assignedTo !== undefined
          ? updates.assignedTo
          : complaints[complaintIndex].assignedTo,
      assignedDepartment:
        updates.assignedDepartment ||
        complaints[complaintIndex].assignedDepartment,
      updatedAt: new Date().toISOString()
    }

    return complaints[complaintIndex]
  },

  addComment: async (id, message) => {
    await new Promise(resolve => setTimeout(resolve, 300))

    const complaintIndex = complaints.findIndex(c => c.id === id)
    if (complaintIndex === -1) {
      throw new Error("Complaint not found")
    }

    const newComment = {
      id: Date.now(),
      author: "Current User", // In real app, would get from auth context
      message,
      timestamp: new Date().toISOString()
    }

    complaints[complaintIndex].comments.push(newComment)
    complaints[complaintIndex].updatedAt = new Date().toISOString()

    return newComment
  },

  // Analytics
  getDashboardAnalytics: async () => {
    await new Promise(resolve => setTimeout(resolve, 200))

    const totalComplaints = complaints.length
    const openComplaints = complaints.filter(c => c.status === "open").length
    const inProgressComplaints = complaints.filter(
      c => c.status === "in-progress"
    ).length
    const resolvedComplaints = complaints.filter(c => c.status === "resolved")
      .length

    const categoryStats = complaints.reduce((acc, complaint) => {
      acc[complaint.category] = (acc[complaint.category] || 0) + 1
      return acc
    }, {})

    const priorityStats = complaints.reduce((acc, complaint) => {
      acc[complaint.priority] = (acc[complaint.priority] || 0) + 1
      return acc
    }, {})

    const departmentStats = complaints.reduce((acc, complaint) => {
      if (complaint.assignedDepartment) {
        acc[complaint.assignedDepartment] =
          (acc[complaint.assignedDepartment] || 0) + 1
      }
      return acc
    }, {})

    return {
      totalComplaints,
      openComplaints,
      inProgressComplaints,
      resolvedComplaints,
      categoryStats,
      priorityStats,
      departmentStats
    }
  },

  // Users
  getUsers: async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return users
  }
}
