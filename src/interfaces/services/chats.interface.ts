export interface Message {
  id: number
  chat_id: number
  message: string
  // user_token: string
  model: string
}

export interface Question extends Message {
  id: number
}

export interface Chat {
  id: number
  name: string
  created_at: string
  // user_token: string
}

export interface ChatById {
  id: number
  name: string
  created_at: string
  // user_token: string
}