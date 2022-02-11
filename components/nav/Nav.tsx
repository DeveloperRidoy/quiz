import { motion } from "framer-motion";
import Link from "next/link";
import { MdOutlineMenuOpen } from 'react-icons/md';
import { useStateContext } from "../../hoc/context/StateContext";
import { EStateActionType } from "../../utils/types/state";
import AccountOptions from "./AccountOptions";

const Nav: React.FC = () => {
  const { state: { showSidebar }, dispatch } = useStateContext();
    
    return (
      <div className="fixed inset-x-0 flex items-center justify-between gap-3 bg-gray-700 h-14 px-4 text-xl text-white backdrop-blur z-10">
        <Link href="/">
          <a href="/" className="text-2xl font-bold uppercase sm:text-4xl">
            quizy
          </a>
        </Link>
        <div className="hidden items-center gap-5 sm:flex">
          <Link href="/leaderboards">
            <a href="/leaderboards" className=" capitalize transition hover:text-gray-200">
              leaderboard
            </a>
          </Link>
          <Link href="/users">
            <a href="/users" className=" capitalize transition hover:text-gray-200">
              users
            </a>
          </Link>
          <Link href="/high-scores">
            <a href="/high-scores" className=" capitalize transition hover:text-gray-200">
              high scores
            </a>
          </Link>
        </div>
        <div className="hidden sm:block">
          <AccountOptions />
        </div>
        <motion.button
          animate={{
            x: showSidebar ? 100 : 0,
            transition: { duration: 0.3 },
          }}
          className="block flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-3xl sm:hidden"
          onClick={() => dispatch({type: EStateActionType.OPEN_SIDEBAR})}
        >
          <MdOutlineMenuOpen />
        </motion.button>
      </div>
    )
}

export default Nav;
