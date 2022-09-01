import axios from "axios"
import { BASE_URL } from "../utils/proxy"

export const getRegion = async(rez:string)=>{
	const res = await axios.get(`${BASE_URL}/region/${rez}`)
	return res
}