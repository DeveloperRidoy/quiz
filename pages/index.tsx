import Head from 'next/head'
import QuestionCard from '../components/QuestionCard'
import QuizStartForm from '../components/QuizStartForm'
import Spinner from '../components/spinner/Spinner'
import ScoreCard from '../components/ScoreCard';
import { EStatus, useStateContext } from '../hoc/context/StateContext'
import { useGoogleLogin } from 'react-google-login';
import { ouathClientId } from '../utils/config';

export default function Home() {
  const {signIn, loaded } = useGoogleLogin({clientId: ouathClientId});
  const {state : {status, error, score}} = useStateContext();
  return (
    <>
      <Head>
        <title>Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="min-h-screen flex flex-col gap-20 items-center p-6 pt-32" style={{ background: 'url(img/background.webp)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        {error ? <div className="p-2 bg-red-500 text-white text-xl">{error}</div> : (
          <>
            {status === EStatus.LOADING && <Spinner className='absolute top-1/2 -translate-y-1/2'/> }
            {status === EStatus.NOT_STARTED && <QuizStartForm/> }
            {status === EStatus.STARTED && (
              <div className='grid gap-2 text-center'>
                <p className='font-semibol text-3xl text-white'>score: {score}</p>
                <QuestionCard /></div> 
            )}
            {status === EStatus.FINISHED && <ScoreCard/> }
          </>
        ) }
    </div>
    </>
  )
}
 