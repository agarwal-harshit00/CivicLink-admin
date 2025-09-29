export const mockUsers = [
  {
    id: 1,
    email: "admin@city.gov",
    name: "Admin User",
    role: "admin",
    department: "Administration"
  },
  {
    id: 2,
    email: "public.works@city.gov",
    name: "John Smith",
    role: "staff",
    department: "Public Works"
  },
  {
    id: 3,
    email: "utilities@city.gov",
    name: "Sarah Johnson",
    role: "staff",
    department: "Utilities"
  }
]

export const mockComplaints = [
  {
    id: 1,
    title: "Broken Streetlight on Main St",
    description:
      "The streetlight at the intersection of Main St and Oak Ave has been out for 3 days.",
    category: "streetlight",
    priority: "high",
    status: "open",
    location: {
      address: "123 Main St",
      coordinates: { lat: 40.7128, lng: -74.006 }
    },
    reportedBy: "citizen@email.com",
    assignedTo: 2,
    assignedDepartment: "Public Works",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    images: ["/broken-streetlight.jpg"],
    comments: []
  },
  {
    id: 2,
    title: "Large Pothole on Elm Street",
    description:
      "Deep pothole causing damage to vehicles near house number 456.",
    category: "pothole",
    priority: "medium",
    status: "in-progress",
    location: {
      address: "456 Elm St",
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    reportedBy: "resident@email.com",
    assignedTo: 2,
    assignedDepartment: "Public Works",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-16T09:15:00Z",
    images: ["/pothole-in-road.png"],
    comments: [
      {
        id: 1,
        author: "John Smith",
        message: "Scheduled for repair next week",
        timestamp: "2024-01-16T09:15:00Z"
      }
    ]
  },
  {
    id: 3,
    title: "Clogged Storm Drain",
    description:
      "Storm drain is completely blocked, causing flooding during rain.",
    category: "drainage",
    priority: "high",
    status: "resolved",
    location: {
      address: "789 Pine Ave",
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    reportedBy: "homeowner@email.com",
    assignedTo: 3,
    assignedDepartment: "Utilities",
    createdAt: "2024-01-10T08:45:00Z",
    updatedAt: "2024-01-18T16:30:00Z",
    images: ["/clogged-storm-drain.jpg"],
    comments: [
      {
        id: 1,
        author: "Sarah Johnson",
        message: "Drain cleared and tested",
        timestamp: "2024-01-18T16:30:00Z"
      }
    ]
  },
  {
    id: 4,
    title: "Overflowing Garbage Bin",
    description:
      "Public garbage bin at the park is overflowing and attracting pests.",
    category: "garbage",
    priority: "low",
    status: "open",
    location: {
      address: "Central Park, 5th Ave",
      coordinates: { lat: 40.7829, lng: -73.9654 }
    },
    reportedBy: "parkvisitor@email.com",
    assignedTo: null,
    assignedDepartment: null,
    createdAt: "2024-01-18T12:00:00Z",
    updatedAt: "2024-01-18T12:00:00Z",
    images: ["/overflowing-garbage-bin.png"],
    comments: []
  }
]
