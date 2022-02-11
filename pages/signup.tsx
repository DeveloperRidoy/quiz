import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import Button from '../components/Button'
import GoogleAuthBtn from '../components/GoogleAuthBtn'
import { useStateContext } from '../hoc/context/StateContext'
import { useRouter } from 'next/router'
import { EAuthType } from '../utils/types/types'
import { EStateActionType, EToastTypes } from '../utils/types/state'

const SignupPage = () => {
  const Router = useRouter();

  const { dispatch } = useStateContext();

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '', 
  })

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
  }

  interface ISingupArgs {e?: React.FormEvent<HTMLFormElement>, authRes?: any, type: EAuthType}
  
  const signup = async ({ e, authRes, type }: ISingupArgs) => {
    try {
      let res: any;
      setLoading(true)
      // for default signup
      if (type === EAuthType.DEFAULT) {
        e?.preventDefault()
        
        res = await axios.post('/api/auth/signup', {type, ...data}, {
          withCredentials: true,
        })
      }

      // for google signup 
      if (type === EAuthType.GOOGLE) {
        res = await axios.post('/api/auth/signup', {type, tokenId: authRes.tokenId}, {
        withCredentials: true,
      })
      }

        setLoading(false)

      dispatch({
        type: EStateActionType.SET_AUTH,
        payload: { auth: { loading: false, user: res.data.data.user } },
      })
      dispatch({
        type: EStateActionType.TOGGLE_TOAST,
        payload: {
          toast: {
            show: true,
            type: EToastTypes.SUCCESS,
            text: res.data.message,
            timeout: 3000,
          },
        },
      })

      Router.replace('/account')
    } catch (err: any) {
      
      const errMsg =
        err.response?.data.message ?? err.message ?? 'Network Error'

      setLoading(false)
      
      if (type === EAuthType.DEFAULT) {
        setError(errMsg)
      } else {
         dispatch({
           type: EStateActionType.TOGGLE_TOAST,
           payload: {
             toast: {
               show: true,
               type: EToastTypes.ERROR,
               text: errMsg,
               timeout: 3000,
             },
           },
         })
      }
   
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center p-4 pt-20">
      <div className="shadow-x grid gap-4 rounded border bg-white p-4 shadow-xl sm:w-[280px]">
        <form
          onSubmit={(e) => signup({ e, type: EAuthType.DEFAULT })}
          className="grid gap-4"
        >
          <div className="grid gap-1">
            <label htmlFor="name" className="capitalize">
              name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="name"
              value={data.name}
              onChange={inputChange}
              className="rounded border border-gray-300 px-2 py-1"
              required
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email" className="capitalize">
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={data.email}
              onChange={inputChange}
              autoComplete="current-email"
              className="rounded border border-gray-300 px-2 py-1"
              required
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password" className="capitalize">
              password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={data.password}
              minLength={6}
              maxLength={14}
              onChange={inputChange}
              autoComplete="current-password"
              className="rounded border border-gray-300 px-2 py-1"
              required
            />
          </div>
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          <Button
            loading={loading}
            className="rounded bg-blue-500 py-1 px-4 text-white transition hover:bg-blue-600"
          >
            sign up
          </Button>
        </form>
        <div className="px-6">
          <div className="h-[1px] bg-gray-400"></div>
        </div>
        <GoogleAuthBtn
          onSuccess={(authRes) => signup({ authRes, type: EAuthType.GOOGLE })} 
          onFailure={authRes => {console.log(authRes)}}
        />
      </div>
      <p className="mt-5">
        <span>Already have an account?</span>
        <Link href="/login">
          <a href="/login" className="font-semibold">
            {' '}
            login
          </a>
        </Link>
      </p>
    </div>
  )
}

export default SignupPage
