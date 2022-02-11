import { useEffect } from "react";
import { ToastContainer, toast as toastFunc } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
import { useStateContext } from "../hoc/context/StateContext";
import { EStateActionType } from "../utils/types/state";

const Toast: React.FC = () => {

  const { state: { toast }, dispatch } = useStateContext();

  useEffect(() => {
    if (!toast.show) return

    // initialize toast
    toastFunc[toast.type](toast.text)

    // disable toast after timeout
    setTimeout(
      () =>
        dispatch({
          type: EStateActionType.TOGGLE_TOAST,
          payload: { toast: { ...toast, show: false } },
        }),
      toast.timeout
    )
  }, [toast.show])
  return <ToastContainer autoClose={toast.timeout}/>
}

export default Toast;
