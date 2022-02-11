import { EStateActionType, EToastTypes, IState, TStateAction } from "../utils/types/state"

const stateReducer = (state: IState, action: TStateAction): IState => {
    
    switch (action.type) {
        case EStateActionType.OPEN_SIDEBAR:
            return { ...state, showSidebar: true, scrollDisabled: true }

        case EStateActionType.CLOSE_SIDEBAR:
            return { ...state, showSidebar: false, scrollDisabled: false }

        case EStateActionType.TOGGLE_TOAST:            
            return {
              ...state,
              toast: action.payload.toast,
            }
        
        case EStateActionType.SET_AUTH:
            return {...state, auth: action.payload.auth}
        default:
            return state;
    }
}

export default stateReducer;