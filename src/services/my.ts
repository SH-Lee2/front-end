import axios from "axios";
import { User } from "../store/authStore";
import { BASE_URL } from "../utils/proxy";

export const myPassword = (userProfile :User, inputPw :string) => {
    return axios.post(`${BASE_URL}/user/myPw`, {
        useNo: userProfile.no,
        usePw: inputPw
    })
}

export const myInfo = (useNo :number) => {
    return axios.get(`${BASE_URL}/user/${useNo}`)
}

export const myNick = (useNick :string) => {
    return axios.get(`${BASE_URL}/user/Nickname/${useNick}`)
}

export const myEmail = (useEmail :string) => {
    return axios.get(`${BASE_URL}/user/Email/${useEmail}`)
}

export const myUpdate = (userProfile :User, useNick :string, usePw :string, useEmail :string) => {
    return axios.put(`${BASE_URL}/user`,{
        useNo : userProfile.no,
        useNick : useNick,
        usePw : usePw,
        useEmail : useEmail
    })
}

export const myComments = (useNo :number, curPage :number) => {
    return axios.get(`${BASE_URL}/article/myReply/${useNo}`, {
        params: {page: curPage} 
    })
}

export const myPosts = (useNo :number, curPage :number) => {
    return axios.get(`${BASE_URL}/article/myList/${useNo}`, {
        params: {page: curPage} 
    })
}

export const myDelete = (useNo :number) => {
    return axios.delete(`${BASE_URL}/user/${useNo}`)
}