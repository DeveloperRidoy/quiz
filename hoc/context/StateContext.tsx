
import { createContext, Dispatch, useContext, useEffect, useReducer } from "react";
import stateReducer from "../../reducers/stateReducer";
import getInitialData from "../../utils/getInitialData";
import { EToastTypes, IState, TStateAction } from "../../utils/types/state";



interface ContextInterface { 
  state: IState, 
  dispatch: Dispatch<TStateAction>
}

const InitialContext: ContextInterface = {
  state: {
    scrollDisabled: false,
    showSidebar: false,
    toast: { show: false, type: EToastTypes.SUCCESS, timeout: 3000, text: '' },
    auth: { loading: true, user: null },
    ssr: false
  },
  dispatch: () => { }
}
const Context = createContext<ContextInterface>(InitialContext);

export const useStateContext = () => useContext(Context);

const StateContext: React.FC<{ pageProps: any }> = ({ children, pageProps }) => { 
    
    // for ssr 
    if (pageProps.ssr) {
        InitialContext.state.ssr = true;
        InitialContext.state.auth = {
            loading: false, 
            user: pageProps.user
        };
    }

    const [state, dispatch] = useReducer(stateReducer, InitialContext.state)

    useEffect(() => {
        if (InitialContext.state.ssr) return;
        // get initial data for client side rendering 
        getInitialData(dispatch)
    }, [])

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default StateContext;
