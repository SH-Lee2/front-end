import axios from "axios";
import { User } from "../store/authStore";

export const myPassword = (userProfile :User, inputPw :string) => {
    return axios.post('/user/myPw', {
        useNo: userProfile.no,
        usePw: inputPw
    })
}

export const myInfo = (useNo :number) => {
    return axios.get(`/user/${useNo}`)
}

export const myNick = (useNick :string) => {
    return axios.get(`/user/Nickname/${useNick}`)
}

export const myEmail = (useEmail :string) => {
    return axios.get(`/user/Email/${useEmail}`)
}

export const myUpdate = (userProfile :User, useNick :string, usePw :string, useEmail :string) => {
    return axios.put('/user',{
        useNo : userProfile.no,
        useNick : useNick,
        usePw : usePw,
        useEmail : useEmail
    })
}

export const myComments = (useNo :number, curPage :number) => {
    return axios.get(`/article/myReply/${useNo}`, {
        params: {page: curPage} 
    })
}

export const myPosts = (useNo :number, curPage :number) => {
    return axios.get(`/article/myList/${useNo}`, {
        params: {page: curPage} 
    })
}

export const myDelete = (useNo :number) => {
    return axios.delete(`../user/${useNo}`)
}