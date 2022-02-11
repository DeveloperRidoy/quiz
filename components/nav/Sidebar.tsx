import { motion } from 'framer-motion'
import Link from 'next/link'
import { MdOutlineClose } from 'react-icons/md'
import { useStateContext } from '../../hoc/context/StateContext'
import { EStateActionType } from '../../utils/types/state'

const Sidebar: React.FC = () => {
  const { dispatch } = useStateContext()

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{
          duration: .3, 
      }}
      className="fixed z-10 sm:hidden inset-0 bg-gray-700 py-2 px-4 text-white"
    >
      <motion.button
        animate={{rotate: -360, transition: {duration: .4}}}
        className="h-10 w-10 rounded-full flex items-center justify-center ml-auto block bg-gray-800 text-3xl"
        onClick={() => dispatch({type: EStateActionType.CLOSE_SIDEBAR})}
      >
        <MdOutlineClose/>
      </motion.button>
      <div className="flex flex-col items-start gap-5 ">
        <Link href="/leaderboards">
          <a href="/" className=" capitalize transition hover:text-gray-200">
            leaderboard
          </a>
        </Link>
        <Link href="/leaderboards">
          <a href="/" className=" capitalize transition hover:text-gray-200">
            users
          </a>
        </Link>
        <Link href="/leaderboards">
          <a href="/" className=" capitalize transition hover:text-gray-200">
            high scores
          </a>
        </Link>
        <Link href="/login">
          <a
            href="/login"
            className="rounded bg-gray-600 py-1 px-4 capitalize text-white transition hover:bg-gray-500 "
          >
            login
          </a>
        </Link>
      </div>
    </motion.div>
  )
}

export default Sidebar
