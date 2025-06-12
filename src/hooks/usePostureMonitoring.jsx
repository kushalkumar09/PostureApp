"use client"

import { useState, useEffect, useCallback } from "react"
import { Alert } from "react-native"

export const usePostureMonitoring = () => {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [postureStatus, setPostureStatus] = useState("good")
  const [postureScore, setPostureScore] = useState(100)
  const [alertsCount, setAlertsCount] = useState(0)

  // Timer effect for session tracking
  useEffect(() => {
    let interval
    if (isMonitoring) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isMonitoring])

  // Simulate posture detection changes
  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        const random = Math.random()
        let newStatus
        let newScore

        if (random > 0.7) {
          newStatus = "poor"
          newScore = Math.floor(Math.random() * 20) + 50
          setAlertsCount((prev) => prev + 1)
        } else if (random > 0.4) {
          newStatus = "warning"
          newScore = Math.floor(Math.random() * 15) + 70
        } else {
          newStatus = "good"
          newScore = Math.floor(Math.random() * 15) + 85
        }

        setPostureStatus(newStatus)
        setPostureScore(newScore)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isMonitoring])

  const handleStartStop = useCallback(() => {
    if (isMonitoring) {
      Alert.alert("End Monitoring", "Are you sure you want to end your posture monitoring session?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "End Session",
          onPress: () => {
            setIsMonitoring(false)
            // Here you would save session data
          },
        },
      ])
    } else {
      setIsMonitoring(true)
      setSessionTime(0)
      setAlertsCount(0)
      setPostureScore(100)
      setPostureStatus("good")
    }
  }, [isMonitoring])

  const resetSession = useCallback(() => {
    setSessionTime(0)
    setAlertsCount(0)
    setPostureScore(100)
    setPostureStatus("good")
  }, [])

  return {
    isMonitoring,
    sessionTime,
    postureStatus,
    postureScore,
    alertsCount,
    handleStartStop,
    resetSession,
  }
}
