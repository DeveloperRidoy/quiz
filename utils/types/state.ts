import { ObjectId } from 'mongoose'
import { EUserRoles } from './types'

export interface IUser {
  _id: ObjectId
  name: string
  email: string
  photo?: string
  role: EUserRoles
}

export enum EToastTypes  {
    INFO = 'info', 
    WARN = 'warn', 
    ERROR = 'error', 
    SUCCESS = 'success'
}
interface IToast {
  show: boolean
  type: EToastTypes
  timeout: number
  text: string
}

interface IAuth {
  loading: boolean
  user: IUser | null
}

export interface IState {
  scrollDisabled: boolean
  showSidebar: boolean
  toast: IToast
  auth: IAuth
  ssr: boolean
}

export enum EStateActionType {
  OPEN_SIDEBAR = 'OPEN_SIDEBAR',
  CLOSE_SIDEBAR = 'CLOSE_SIDEBAR',
  SET_AUTH = 'SET_AUTH',
  TOGGLE_TOAST = 'TOGGLE_TOAST'
}

interface IDefaultAction {
  type: EStateActionType.OPEN_SIDEBAR | EStateActionType.CLOSE_SIDEBAR
}

interface IToggleToastAction {
  type: EStateActionType.TOGGLE_TOAST
  payload: {toast: IToast}
}

interface ISetAuthAction {
  type: EStateActionType.SET_AUTH
  payload: { auth: IAuth }
}

export type TStateAction = IDefaultAction | IToggleToastAction | ISetAuthAction
