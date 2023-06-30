import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import type {
  APIError,
  APISuccessInserted,
  APISuccessRemoved,
  APISuccessUpdated,
  User
} from './users.types'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    Accept: 'Content-Type',
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const apiError = error.response.data as APIError
      return Promise.reject(apiError)
    }
    return Promise.reject(error)
  }
)

export async function fetchAll(): Promise<User[]> {
  const response: AxiosResponse = await apiClient.get('/collaborateurs')
  return response.data
}

export async function create(user: Partial<User>): Promise<APISuccessInserted> {
  const response: AxiosResponse = await apiClient.post('/collaborateurs', user)
  return response.data
}

export async function remove(user: Partial<User>): Promise<APISuccessRemoved> {
  const response: AxiosResponse = await apiClient.delete(`/collaborateur/${user.id}`)
  return response.data
}

export async function fetchOne(userId: string): Promise<User> {
  const response: AxiosResponse = await apiClient.get(`/collaborateur/${userId}`)
  return response.data
}

export async function update(user: Partial<User>): Promise<APISuccessUpdated> {
  const response: AxiosResponse = await apiClient.put(`/collaborateur/${user.id}`, user)
  return response.data
}
