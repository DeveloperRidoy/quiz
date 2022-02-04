import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { ouathClientId } from "../utils/config";


const GoogleLoginBtn: React.FC = () => {

    const responseGoogle = (res: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
        console.log(res)
    }
        
    return (
      <GoogleLogin
    clientId={ouathClientId}
    render={renderProps => (
      <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="capitalize">login</button>
    )}
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
  );
};

export default GoogleLoginBtn;
