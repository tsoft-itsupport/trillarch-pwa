import axios from 'axios'
import { queueRequest } from '../offlineQueue'
import { getTasksFromIdb, saveTasksToIdb } from '../offlineTasksIdb'

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// this is important to get token from localStorage after each request
axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  (error) => Promise.reject(error)
)

// Wrapper for POST requests
export async function offlineAwareRequest(method, url, data, config) {
  if (url.startsWith('/taskitems/')) {
    if (!navigator.onLine) {
      await queueRequest({
        url,
        method: method.toUpperCase(),
        data,
        config,
        timestamp: Date.now()
      })
    }

    const tasks = await getTasksFromIdb()
    const taskId = data.taskId
    const taskItemId = url.split('/taskitems/')[1]
    const taskIndexToUpdate = tasks.findIndex((task) => task.id == taskId)

    const updatedTasks = tasks.map((task, taskIndex) => {
      if (taskIndex !== taskIndexToUpdate) return task // skip others

      // We're in the task that needs to be updated
      const taskItemIndexToUpdate = task.taskItems.findIndex(
        (item) => item.id == taskItemId
      )

      return {
        ...task,
        taskItems: task.taskItems.map((item, itemIndex) => {
          if (itemIndex !== taskItemIndexToUpdate) return item
          return { ...item, status: data.status } // update status immutably
        })
      }
    })

    await saveTasksToIdb(updatedTasks)

    const newData = {}

    newData.tasks = updatedTasks

    return Promise.resolve({ data: newData })
  }

  // Online: make real request
  const response = await axiosApi[method](url, data, config)

  return response
}
