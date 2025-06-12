export const getPostureColor = (status) => {
  switch (status) {
    case "good":
      return "#10B981"
    case "warning":
      return "#F59E0B"
    case "poor":
      return "#EF4444"
    default:
      return "#6B7280"
  }
}

export const getPostureMessage = (status) => {
  switch (status) {
    case "good":
      return "Great posture!"
    case "warning":
      return "Slight slouching"
    case "poor":
      return "Poor posture - adjust!"
    default:
      return "Position yourself"
  }
}
