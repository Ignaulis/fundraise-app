import { toast } from "react-toastify";

export const MessagesSuccess = (text) => {
    return (
        toast.success(`${text}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        })
    );
}

export const MessagesError = (text) => {
    return (toast.error(`${text}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    }))
}

export default {MessagesSuccess, MessagesError};