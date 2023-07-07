import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess, logoutFailed, logoutStart, logoutSuccess } from "./authSilce";
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";
import { changePasswordFailed, changePasswordStart, changePasswordSuccess, registerShopFailed, registerShopStart, registerShopSuccess, updateUserFailed, updateUserStart, updateUserSuccess } from "./userSlice";
// import { getBirdsFailed, getBirdsSuccess, getBridsStart } from "./birdSlice";


export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    // console.log(user)
    // console.log(dispatch)
    try {
        const res = await axios.post("https://localhost:7241/api/User/Login", user);

        const token = jwt_decode(res.data.data.accessToken);
        console.log(token)
        dispatch(loginSuccess(token));
        saveTokenToLocalStorage(res.data.data.accessToken);
        if (token.role === 'AD') {
            navigate("/dashboard");
        } else {
            navigate("/");
        }


    } catch (err) {
        console.log(err)
        dispatch(loginFailed());
        toast.error("Sai Email hoac Password");
    }
};
function saveTokenToLocalStorage(token) {
    localStorage.setItem('jwtToken', token);
}
// function parseJwt(token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }


export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        console.log("sfdfs")
        await axios.post("https://localhost:7241/api/User/Register", user);

        dispatch(registerSuccess());

        navigate("/login");

    } catch (err) {
        console.log("err")
        dispatch(registerFailed());

    }
}


export const logOut = async (dispatch, navigate, accessToken) => {
    dispatch(logoutStart());
    try {
        console.log("dddf")
        await axios.post("https://localhost:7241/api/User/logout", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch(logoutSuccess());
        localStorage.removeItem('jwtToken');
        navigate("/home");
    } catch (err) {
        console.log("err")
        dispatch(logoutFailed());

    }

}

export const registerShop = async (shop, dispatch, navigate, accessToken) => {
    console.log(shop);
    console.log(accessToken)
    dispatch(registerShopStart());
    try {

        const res = await axios.post("https://localhost:7241/api/Shop/registerShop", shop, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (res.status === 200) {

            dispatch(registerShopSuccess(res.data));
            navigate("/manageshop");
        }


    } catch (err) {
        console.log(err)
        dispatch(registerShopFailed());

    }
}

export const changePassword = async (userPassword, dispatch, accessToken) => {
    console.log(userPassword);
    console.log(accessToken);
    console.log(dispatch)
    dispatch(changePasswordStart());
    try {

        await axios.post("https://localhost:7241/api/User/ChangePassword", userPassword, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        dispatch(changePasswordSuccess());

        // navigate("/home");
    } catch (err) {
        console.log("err")
        dispatch(changePasswordFailed());

    }

}
export const updateUser = async (newUser, accessToken, dispatch) => {
    console.log(newUser);
    console.log(dispatch);
    dispatch(updateUserStart());
    try {
        const formData = new FormData();
        formData.append('Dob', newUser.Dob);
        formData.append('Address', newUser.Address);
        formData.append('Phone', newUser.Phone);
        formData.append('Gender', newUser.Gender);
        formData.append('Name', newUser.Name);
        formData.append('avatar', newUser.avatar);

        await axios.put("https://localhost:7241/api/User/UpdateMee", formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        dispatch(updateUserSuccess());

        // navigate("/home");
    } catch (err) {
        console.log("err")
        dispatch(updateUserFailed());

    }

}
