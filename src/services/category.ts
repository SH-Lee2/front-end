import axios from "axios";

export const mainDaily = () => {
    return axios.get('/article/category/0')
}

export const mainFree = () => {
    return axios.get('/article/category/1', {params: {size: 5}})
}

export const dailyCategory = (region :string, curPage :number) => {
    return axios.get('/article/list/0', {params: {
        regNo: region,
        page: curPage
    }})
}

export const skyCategory = (region :string, curPage :number) => {
    return axios.get('/article/list/2', {params: {
        regNo: region,
        page: curPage
    }})
}