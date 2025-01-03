import { toast } from "react-hot-toast"
import { posterEndpoints } from "../apis";
import { apiConnector } from "../apiConnector"
const {
    POSTER_DETAILS_API,
    GET_ALL_POSTER_API
} = posterEndpoints;

export const getAllPoster = async () =>{
    const toastId = toast.loading("Loading");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_POSTER_API);
        if(!response?.data?.success){
            throw new Error("Could not fetch poster data");
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("GET_ALL_POSTER_API API ERROR: ", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}