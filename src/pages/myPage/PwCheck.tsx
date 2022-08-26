import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { myPassword } from '../../services/my';
import authStore from '../../store/authStore';
import * as i from '../../styles/mypage/TabInner';

const PwCheck = () => {
    const { userProfile } = authStore();

    const [inputPw,setInputPw] = useState('');
    const [check,setCheck] = useState(false);

    const navigate = useNavigate();
    
    useEffect(()=> {
        if (inputPw.length > 0){
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [inputPw])

    const Pass = async () => {
        const res = await myPassword(userProfile, inputPw)
        if (res.data.data === true) {
            navigate('update');
        }else {
            Swal.fire({
                icon: 'error',
                text: '비밀번호가 일치하지 않습니다.',
                showConfirmButton: false,
                timer: 1000
            })
            .then(() => setInputPw(''))
        }
    }

    return (
        <i.Outline>
            <i.TabTitle>회원정보 수정</i.TabTitle>
            <i.Title>비밀번호 재확인</i.Title>
            <i.InputOne type='password' placeholder='비밀번호를 입력해주세요' value={inputPw} onChange={(e) => {setInputPw(e.target.value)}} />
            <i.Btn onClick={() => Pass()} disabled={!check} >확인</i.Btn>
        </i.Outline>
    );
};

export default PwCheck;