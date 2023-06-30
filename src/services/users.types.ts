export type User = {
  id: string
  gender: 'male' | 'female'
  firstname: string
  lastname: string
  email: string
  phone: string
  birthdate: string
  city: string
  country: string
  photo?: string
}

// export type UserWithoutID = Omit<User, 'id'>

export type APIError = {
  error: 1
  message: string
}

export type APISuccess = {
  success: 1
  message: string
}

export type APISuccessInserted = APISuccess & { inserted: User }
export type APISuccessUpdated = APISuccess & { updated: User }
export type APISuccessRemoved = APISuccess & { removed: User }
