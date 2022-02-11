import Head from 'next/head'
import QuizContext from '../hoc/context/QuizContext'
import Quiz from '../components/quiz/Quiz';

export default function Home() {

  return (
    <>
      <Head>
        <title>Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QuizContext>
        <div
          className="flex items-center justify-center p-6"
          style={{
            background: 'url(img/background.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <Quiz />
        </div>
      </QuizContext>
    </>
  )
}
 