import axios from 'axios';
import { BASE_URL } from '../utils/proxy';

export const AllList = (curPage :number) => {
    return axios.get(`${BASE_URL}/manager/article`, {
        params: {page: curPage} 
    })
}

export const CateList = (selected :string, curPage :number) => {
    return axios.get(`${BASE_URL}/manager/article/${selected}`, {
        params: {page: curPage} 
    })
}

export const TypeUser = (role :string, curPage :number) => {
    return axios.get(`${BASE_URL}/manager/user`, {
        params: {
            Role: role,
            page: curPage,
        }
    })
}