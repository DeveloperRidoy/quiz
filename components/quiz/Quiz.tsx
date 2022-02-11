import { useQuizContext } from '../../hoc/context/QuizContext'
import { EQuizStatus } from '../../utils/types/quiz'
import QuestionCard from './QuestionCard'
import QuizStartForm from './QuizStartForm'
import ScoreCard from './ScoreCard'

const Quiz: React.FC = () => {
  const {
    state: { status, score},
  } = useQuizContext()

  return (
    <div
      className="flex flex-col items-center gap-20"
    >
      {status === EQuizStatus.NOT_STARTED && <QuizStartForm />}
      {status === EQuizStatus.STARTED && (
        <div className="grid gap-2 text-center">
          <p className="font-semibol text-3xl text-white">score: {score}</p>
          <QuestionCard />
        </div>
      )}
      {status === EQuizStatus.FINISHED && <ScoreCard />}
    </div>
  )
}

export default Quiz
