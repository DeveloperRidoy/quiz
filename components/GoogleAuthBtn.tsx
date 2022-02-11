import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { ouathClientId } from "../utils/config";

interface Props {
  onSuccess: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void
  onFailure?: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void
}

const GoogleAuthBtn: React.FC<Props> = ({onSuccess, onFailure}) => {
        
    return (
      <GoogleLogin
        clientId={ouathClientId}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 transition hover:bg-gray-300 text-2xl"
          >
            <FcGoogle/>
          </button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
    )
};

export default GoogleAuthBtn;
