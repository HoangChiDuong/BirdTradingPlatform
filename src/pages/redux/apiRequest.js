import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "./authSilce";
import { toast } from 'react-toastify';
// import { getBirdsFailed, getBirdsSuccess, getBridsStart } from "./birdSlice";


export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    console.log(dispatch)
    try {
        const res = await axios.post("https://localhost:7067/api/User/Login", user);
        const token = parseJwt(res.data.data);
        dispatch(loginSuccess(token));
        saveTokenToLocalStorage(res.data.data);
        toast.success("Login Success");
        navigate("/");

    } catch (err) {
        dispatch(loginFailed);
        toast.error("Sai Email hoac Password");
    }
};
function saveTokenToLocalStorage(token) {
    localStorage.setItem('jwtToken', token);
}
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("https://reqres.in/api/register", user);
        dispatch(registerSuccess());
        navigate("/login");

    } catch (err) {
        dispatch(registerFailed);
        console.log("dsadsa");
    }
}

// export const getAllBrids = async (dispatch) => {
//     console.log("dfs")
//     dispatch(getBridsStart());
//     try {
//         const res = await axios.get("https://dummyjson.com/products");
//         console.log(res.data);
//         dispatch(getBirdsSuccess(res.data));
//     } catch (err) {
//         dispatch(getBirdsFailed());
//     }
// }