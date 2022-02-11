import axios from "axios";
import { Dispatch } from "react";
import { EStateActionType, IUser, TStateAction } from "./types/state";

const getInitialData = async (dispatch: Dispatch<TStateAction>): Promise<void> => {
  let user: IUser | null

  // authenticate user
  try {
      const res = await axios.get('/api/auth', { withCredentials: true });
      user = res.data.data.user;
  } catch (err) {
    user = null
  }

    // update state
  dispatch({ type: EStateActionType.SET_AUTH, payload: { auth: { loading: false, user } } });
} 


export default getInitialData;



