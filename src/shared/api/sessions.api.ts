const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'

export interface Session {
  id: string
  deviceId: string
  ip: string
  lastActive: string
  browserName: string
  browserVersion: string
  deviceName: string
  osName: string
  osVersion: string
  deviceType: string
}

export const getAllSessions = async (): Promise<{
  success: boolean
  data?: Session[]
  error?: string
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (response.status === 200) {
      const data = await response.json()
      return { success: true, data }
    }

    if (response.status === 401) {
      return { success: false, error: 'Unauthorized' }
    }

    if (response.status === 429) {
      return { success: false, error: 'Too many attempts. Please try again later' }
    }

    return { success: false, error: 'Failed to fetch sessions' }
  } catch (error) {
    console.error('Get sessions error:', error)
    return { success: false, error: 'Network error. Please try again' }
  }
}


export const deleteSession = async (sessionId: string): Promise<{
  success: boolean
  error?: string
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (response.status === 204) {
      return { success: true }
    }

    if (response.status === 401) {
      return { success: false, error: 'Unauthorized' }
    }

    if (response.status === 429) {
      return { success: false, error: 'Too many attempts. Please try again later' }
    }

    return { success: false, error: 'Failed to delete session' }
  } catch (error) {
    console.error('Delete session error:', error)
    return { success: false, error: 'Network error. Please try again' }
  }
}


export const terminateAllOtherSessions = async (): Promise<{
  success: boolean
  error?: string
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions/terminate-all`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (response.status === 204) {
      return { success: true }
    }

    if (response.status === 401) {
      return { success: false, error: 'Unauthorized' }
    }

    if (response.status === 429) {
      return { success: false, error: 'Too many attempts. Please try again later' }
    }

    return { success: false, error: 'Failed to terminate sessions' }
  } catch (error) {
    console.error('Terminate sessions error:', error)
    return { success: false, error: 'Network error. Please try again' }
  }
}
