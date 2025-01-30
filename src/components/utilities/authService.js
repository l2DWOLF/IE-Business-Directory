import { jwtDecode } from "jwt-decode";
import { login } from "../../services/userServices"
import { SetToken, SetUser } from "../../redux/UserState";

export const handleLogin = async (Values, dispatch) => {
    try {
        const response = await login({email: Values.email, password: Values.password});
        const token = response.data;
        const decodedToken = jwtDecode(token);
        
        sessionStorage.setItem("x-auth-token", token);
        dispatch(SetToken(token));
        dispatch(SetUser(decodedToken));
        return token;
    } catch (err) {
        console.error("Login Failed, try logging manually: ", err);
        return false; 
    }
};