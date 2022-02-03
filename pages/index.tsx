import Head from 'next/head'
import QuestionCard from '../components/QuestionCard'
import QuizStartForm from '../components/QuizStartForm'
import Spinner from '../components/spinner/Spinner'
import ScoreCard from '../components/ScoreCard';
import { EStatus, useStateContext } from '../context/StateContext'

export default function Home() {

  const {state : {status, error, score}} = useStateContext();

  return (
    <>
      <Head>
        <title>Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="flex min-h-screen flex-col gap-20 items-center p-6" style={{ background: 'url(img/background.webp)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <h1 className="text-4xl uppercase text-white font-bold">quiz</h1>
        {error ? <div className="p-2 bg-red-500 text-white text-xl">{error}</div> : (
          <>
            {status === EStatus.LOADING && <Spinner className='absolute top-1/2 -translate-y-1/2'/> }
            {status === EStatus.NOT_STARTED && <QuizStartForm/> }
            {status === EStatus.STARTED && (
              <div className='grid gap-2 text-center'>
                <p className='font-semibold text-3xl text-white'>score: {score}</p>
                <QuestionCard /></div> 
            )}
            {status === EStatus.FINISHED && <ScoreCard/> }
          </>
        ) }
    </div>
    </>
  )
}
 