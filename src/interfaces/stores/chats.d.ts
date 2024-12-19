export interface Message {
  id: number
  chat_id: number
  message: string
  // user_token: string
  model: string
  // type: string
}

export interface Question extends Message {
  hidden?: boolean
  changeQuestionValue?: string
}

export interface Chat {
  id: number
  name: string
  created_at: string
  questions?: Array<Message>
  answers?: Array<Message>
  // user_token: string
}

export interface ChatById {
  id: number
  name: string
  created_at: string
  // user_token: string
}

export interface NewMessage {
  newQuestion: Question
  newAnswer: Message
}

export interface Model {
  id: number
  photo_url: string
  title: string
  model: string
}

export interface NewFile {
  id: string
  name: string
}

export interface PromptParams {
  prompt: string
}
