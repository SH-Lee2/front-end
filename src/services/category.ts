import axios from "axios";
import { BASE_URL } from "../utils/proxy";

export const mainDaily = () => {
    return axios.get(`${BASE_URL}/article/category/0`)
}

export const mainFree = () => {
    return axios.get(`${BASE_URL}/article/category/1`, {params: {size: 5}})
}

export const dailyCategory = (region :string, curPage :number) => {
    return axios.get(`${BASE_URL}/article/list/0`, {params: {
        regNo: region,
        page: curPage
    }})
}

export const skyCategory = (region :string, curPage :number) => {
    return axios.get(`${BASE_URL}/article/list/2`, {params: {
        regNo: region,
        page: curPage
    }})
}