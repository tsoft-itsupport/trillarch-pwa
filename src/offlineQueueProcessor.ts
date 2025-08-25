//@ts-ignore
import { axiosApi } from './tools/axiosApi'
import { getQueuedRequests, deleteRequest } from './offlineQueue'

export async function replayQueuedRequests() {
  const queued = await getQueuedRequests()

  for (const req of queued) {
    try {
      await axiosApi[req.method.toLowerCase()](req.url, req.data, req.config)

      if (req.id !== undefined) {
        await deleteRequest(req.id)
      }

      console.log(`Replayed request to ${req.url}`)
    } catch (error) {
      console.error('Failed to replay request', req, error)
      // Optionally add retry logic or break to avoid infinite loops
    }
  }

  return true
}
