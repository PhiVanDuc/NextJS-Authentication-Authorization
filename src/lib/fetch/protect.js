import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
    timeout: 10000,
    headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        'Cookie': `refreshToken=${Cookies.get("refreshToken")}`
    },
    withCredentials: true
});

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        console.log(error);
        return error
    }
)

export default instance;