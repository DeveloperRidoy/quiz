import Spinner2 from "./spinners/spinner2/Spinner2";

type BtnProps = { loading?: boolean; className?: string, onClick?: (...args: any) => any }

const Button: React.FC<BtnProps> = ({loading, children, className, onClick}) => {
    return (
      <button className={`flex items-center justify-center gap-1 ${className}`} onClick={onClick}>
        {children}
        {loading && <Spinner2/>}
      </button>
    )
};

export default Button;
