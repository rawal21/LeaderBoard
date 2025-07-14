export interface User {
  id: string
  name: string
  totalPoints: number
}

export interface ClaimPointsResponse {
  pointsAwarded: number
}

export interface HistoryEntry {
  id: string
  userId: string
  userName: string
  pointsAwarded: number
  timestamp: Date
}
