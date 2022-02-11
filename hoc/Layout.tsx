import { AnimatePresence } from "framer-motion";

import Nav from "../components/nav/Nav";
import Sidebar from "../components/nav/Sidebar";
import Toast from "../components/Toast";
import { useStateContext } from "./context/StateContext";

const Layout: React.FC = ({ children }) => {

    const { state: { scrollDisabled, showSidebar } } = useStateContext();

    return (
      <div className={scrollDisabled ? 'fixed inset-0' : ''}>
        <Nav />
        <AnimatePresence>{showSidebar && <Sidebar />}</AnimatePresence>
        <Toast />
        <div className="relative grid min-h-screen pt-14">
          {children}
        </div>
      </div>
    )
};

export default Layout;
