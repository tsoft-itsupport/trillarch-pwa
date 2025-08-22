import { create } from 'zustand'

export type MessageStoreProps = {
  title: string
  show?: boolean
  message: string
  type?: 'success' | 'error'
}

export interface MessageStore extends MessageStoreProps {
  showMessage: ({ message, title }: MessageStoreProps) => void
  hideMessage: () => void
}

export const useMessageStore = create<MessageStore>((set) => ({
  title: '',
  show: false,
  message: '',
  showMessage({ message, title, type }: MessageStoreProps) {
    set({
      show: true,
      message,
      title,
      type
    })
  },
  hideMessage() {
    set({
      show: false
    })
  }
}))

export interface AccountProps {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  email: string
  isConfirmed: boolean
  isDisabled: boolean
}

interface AccountStore {
  account: AccountProps | null
  isLoggedIn: boolean | undefined
  setAccount: (props: AccountProps, token?: string) => void
  resetAccount: () => void
  setIsLoggedInToFalse: () => void
  logoutAccount: () => void
}

const accountInitialState = {
  id: -1,
  name: '',
  email: '',
  isConfirmed: false,
  isDisabled: false,
  createdAt: '',
  updatedAt: ''
}

export const useAccountStore = create<AccountStore>((set) => ({
  account: { ...accountInitialState },
  isLoggedIn: undefined,
  setAccount(account, token) {
    set({
      account,
      isLoggedIn: account.id > 0
    })

    if (token) {
      localStorage.setItem('auth_token', token)
    }
  },
  resetAccount() {
    set({ account: accountInitialState, isLoggedIn: undefined })
  },
  setIsLoggedInToFalse() {
    set({ isLoggedIn: false })
  },
  logoutAccount() {
    set({ account: accountInitialState, isLoggedIn: false })

    localStorage.removeItem('auth_token')
  }
}))

interface TaskItemProps {
  id: number
  name: string
  status: boolean | null
  opening_num_id: string
  assigned_to: number
  created_by: number
  is_deleted: boolean
  task_id: number
}

export interface TaskProps {
  id: number
  name: string
  status: 'Done' | 'Working-on-it' | 'Stuck' | 'Not-started' | 'Cancelled'
  priority: 'high' | 'medium' | 'low'
  opening_num_id: string
  ref_source: number
  ref_id: number
  assigned_to: number
  due_date: string
  created_by: number
  updated_at: string
  created_at: string
  taskItems: TaskItemProps[]
}

interface TaskStore {
  task: TaskProps
  tasks: TaskProps[]
  loadingTasks: boolean
  setTask: (task: TaskProps) => void
  setTasks: (tasks: TaskProps[]) => void
  setLoadingTasks: (b: boolean) => void
}

export const taskInitialState = {
  id: -1,
  name: '',
  status: 'Not-started' as TaskProps['status'],
  priority: 'low' as TaskProps['priority'],
  opening_num_id: '',
  ref_source: -1,
  ref_id: -1,
  assigned_to: -1,
  due_date: '',
  created_by: -1,
  updated_at: '',
  created_at: '',
  taskItems: []
}

export const useTaskStore = create<TaskStore>((set) => ({
  task: taskInitialState,
  tasks: [],
  loadingTasks: true,
  setTask(task) {
    set({ task })
  },
  setTasks(tasks) {
    set({ tasks })
  },
  setLoadingTasks(b: boolean) {
    set({ loadingTasks: b })
  }
}))
