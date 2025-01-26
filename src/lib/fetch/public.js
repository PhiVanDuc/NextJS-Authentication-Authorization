import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
    timeout: 10000,
    headers: {
        'Content-Type': "application/json",
    }
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