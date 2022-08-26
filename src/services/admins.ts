import axios from 'axios';

export const AllList = (curPage :number) => {
    return axios.get('/manager/article', {
        params: {page: curPage} 
    })
}

export const CateList = (selected :string, curPage :number) => {
    return axios.get(`/manager/article/${selected}`, {
        params: {page: curPage} 
    })
}

export const AllUser = (curPage :number) => {
    return axios.get('/manager/user', {
        params: {page: curPage} 
    })
}