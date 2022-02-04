import Link from "next/link";
import GoogleLoginBtn from "./GoogleLoginBtn";

function Nav() {
    return (
        <div className="py-2 px-4 bg-white/20 backdrop-blur flex justify-center items-center gap-3 fixed inset-x-0 text-white text-xl">
            <Link href="/"> 
                <a href="/" className="uppercase text-4xl font-bold flex-1 text-center"
                >
                    quiz    
                </a>
            </Link>
           <Link href="/leaderboards"> 
                <a href="/" className=" capitalize">
                   leaderboards
                </a>
            </Link>
            <GoogleLoginBtn/>
      </div>
  );
}

export default Nav;
