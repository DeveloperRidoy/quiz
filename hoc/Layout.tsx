import Nav from "../components/Nav";


const Layout: React.FC = ({children}) => {
    return (
        <div>
            <Nav/>
            <div className="">
                {children}
            </div>
        </div>
  );
};

export default Layout;
