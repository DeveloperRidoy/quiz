import Link from "next/link";
import { FaPowerOff, FaSignInAlt, FaUserCircle, FaUserPlus } from "react-icons/fa";
import { VscTriangleUp } from "react-icons/vsc";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStateContext } from "../../hoc/context/StateContext";
import Spinner from "../spinners/spinner/Spinner";
import Button from "../Button";
import triggerOnClickedOutside from "../../utils/triggerOnClickedOutside";
import axios from "axios";
import { useRouter } from "next/router";
import { EStateActionType, EToastTypes } from "../../utils/types/state";

const AccountOptions: React.FC = () => {
  const { state: { auth: { loading, user } } } = useStateContext();;
  const [showOptions, setShowOptions] = useState<boolean>(false); 
  const closeOptions = (): void => setShowOptions(false);

    return (
      <div className="relative">
        <button
          className="mt-1 rounded-full text-3xl"
          onClick={() => setShowOptions(bool => !bool)}
        >
          {loading ? (
            <FaUserCircle className="animate-pulse" />
          ) : user && user.photo ? (
            <img className="h-8 w-8 rounded-full" src={user.photo} />
          ) : (
            <FaUserCircle />
          )}
        </button>
        <AnimatePresence>
          {showOptions && <Options closeOptions={closeOptions} />}
        </AnimatePresence>
      </div>
    )
};

export default AccountOptions;



const Options: React.FC<{closeOptions: () => void}> = ({closeOptions}) => {

  const Router = useRouter();
  const { state: { auth }, dispatch } = useStateContext();
  const [loading, setLoading] = useState(false);
  const optionsRef = useRef<any>(null)
  
  const logout = async () => {
    try {
      setLoading(true);
      const res = await axios.put('/api/auth/logout', {}, { withCredentials: true });
      setLoading(false);
      
      dispatch({ type: EStateActionType.SET_AUTH, payload: { auth: { loading: false, user: null } } });
      dispatch({
        type: EStateActionType.TOGGLE_TOAST,
        payload: {
          toast: {
            show: true,     
            type: EToastTypes.SUCCESS,
            text: res.data.message,
            timeout: 3000,
          }
        },
      })

      Router.replace('/login');
    } catch (err: any) {
      setLoading(false);
      const errMsg =
        err.response?.data.message ?? err.message ?? 'Network Error';

      dispatch({
        type: EStateActionType.TOGGLE_TOAST,
        payload: {
          toast: {
            show: true,
            type: EToastTypes.ERROR,
            text: errMsg,
            timeout: 5000,
          },
        },
      })
    }
  } 

  // close options when clicked outside
  useEffect(() => triggerOnClickedOutside(optionsRef, closeOptions), []);

  return (
    <motion.div
      initial={{ scale: 0, transformOrigin: '100% 0' }}
      animate={{ scale: 1, transformOrigin: '100% 0' }}
      exit={{ scale: 0, transformOrigin: '100% 0' }}
      transition={{ duration: 0.1 }}
      ref={optionsRef}
      className="absolute right-0 top-[55px] grid min-w-max gap-2 rounded bg-gray-700 p-3 text-lg capitalize"
    >
      <VscTriangleUp className="absolute top-[-12px] right-2 text-gray-700" />
      {auth.loading ? (
        <Spinner className="scale-[.4]" />
      ) : auth.user ? (
        <>
          <Link href="/account">
            <a
              href="/account"
              className="flex items-center gap-2 rounded py-1 px-2 transition hover:bg-gray-800"
              onClick={closeOptions}
            >
              <FaUserCircle className="text-2xl" />
              <span>account</span>
            </a>
          </Link>
            <Button
              loading={loading}
              onClick={logout}
              className="flex items-center gap-2 rounded py-1 px-2 transition hover:bg-gray-800">
              <FaPowerOff/>
            logout
          </Button>
        </>
      ) : (
        <>
          <Link href="/login">
            <a
              href="/login"
              className="flex items-center gap-2 rounded py-1 px-2 transition hover:bg-gray-800"
              onClick={closeOptions}
            >
              <FaSignInAlt />
              <span>login</span>
            </a>
          </Link>
          <Link href="/signup">
            <a
              href="/signup"
              className="flex items-center gap-1 rounded py-1 px-2 transition hover:bg-gray-800"
              onClick={closeOptions}
            >
              <FaUserPlus />
              <span>sign up</span>
            </a>
          </Link>
        </>
      )}
    </motion.div>
  )
}