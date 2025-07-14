// services/api.ts
import axios from "axios"
import type { User, HistoryEntry, ClaimPointsResponse } from "../types"

const BASE_URL = "http://localhost:3000/api" // change to live backend URL when deployed

export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get(`${BASE_URL}/users`)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return res.data.map((user: any) => ({
    id: user._id,
    name: user.name,
    totalPoints: user.totalPoints,
  }))
}

export const claimPoints = async (userId: string): Promise<ClaimPointsResponse> => {
  const res = await axios.post(`${BASE_URL}/claim`, { userId })
  return {
    pointsAwarded: res.data.points,
  }
}

export const getHistory = async (): Promise<HistoryEntry[]> => {
  const res = await axios.get(`${BASE_URL}/history`)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return res.data.map((entry: any) => ({
    id: entry._id,
    userId: entry.userId,
    userName: entry.userName,
    pointsAwarded: entry.pointsAwarded,
    timestamp: new Date(entry.createdAt),
  }))
}
