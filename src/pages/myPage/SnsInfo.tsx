import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import authStore, { User } from '../../store/authStore';
import * as i from '../../styles/mypage/TabInner';

const SnsInfo = () => {
    const { userProfile, updateUser } = authStore();
    const navigate = useNavigate();

    const [useNick,setNick] = useState('');
    const [nickMsg,setNickMsg] = useState('');

    //syncro
    useEffect(() => { changeNick() }, [useNick])

    //변경함수
    const changeNick = () => {
        axios.get(`/user/Nickname/${useNick}`)
        .then(res => {
            if (res.data.data === true && useNick.length <= 6) {
                setNickMsg('중복된 닉네임입니다');
            } else if (useNick.length > 6){
                setNickMsg('닉네임은 6자 이하로 가능합니다');
            } else{
                setNickMsg('');
            }
        })
    }

    const updateNick = (userProfile : User|null) => {
        axios.put('/user',{
            useNo : userProfile?.no,
            useNick : useNick,
        })
        .then(res => {
            if (res.data.data === 1) {
                Swal.fire({
                    icon: 'success',
                    text: '수정 완료!',
                    showConfirmButton: false,
                    timer: 1000
                })
                .then(() => { 
                    updateUser(useNick, userProfile)
                    navigate('/'); }) //메인페이지 이동
            }else {
                Swal.fire({
                    icon: 'error',
                    text: '오류가 발생했습니다. 관리자에게 문의 바랍니다.'
                })
            }
        });
    }

    return (
        <i.Outline>
            <i.Title>닉네임 수정</i.Title>
            <i.InputOne placeholder='수정할 닉네임을 입력해주세요' onChange={(e)=> setNick(e.target.value)}/>
            <Msg>{nickMsg}</Msg>
            <i.Btn onClick={() => updateNick(userProfile)}>확인</i.Btn>
        </i.Outline>
    );
};

export default SnsInfo;

const Msg = styled.span`
    margin-top: 0.5em;
    color: red;
`;