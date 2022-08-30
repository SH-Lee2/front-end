import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Swal from 'sweetalert2';
import { myEmail, myInfo, myNick, myUpdate } from '../../services/my';
import authStore, { User } from '../../store/authStore';
import * as i from '../../styles/mypage/TabInner';
import { UserT } from '../../types/types';

const Info = () => {
    const { userProfile, updateUser} = authStore();

    const navigate = useNavigate();

    const [data, setData] = useState<UserT>();

    // 입력값
    const [useNick,setNick] = useState('');
    const [usePw,setPw] = useState('');
    const [usePwCk,setPwCk] = useState('');
    const [useEmail,setEmail] = useState('');

    // 안내메시지
    const [nickMsg,setNickMsg] = useState('');
    const [pwMsg,setPwMsg] = useState('');
    const [pwCkMsg,setPwCkMsg] = useState('');
    const [emailMsg,setEmailMsg] = useState('');

    // 유저 정보 조회
    const getInfo = async () => {
        const res = await myInfo(userProfile.no)
        setData(res.data.data);
    }

    useEffect(() => {
        getInfo()
    }, [])

    //syncro
    useEffect(() => { changeNick() }, [useNick])
    useEffect(() => { changePw() }, [usePw])
    useEffect(() => { changePwCk() }, [usePwCk])
    useEffect(() => { changeEmail() }, [useEmail])

    //변경함수
    const changeNick = async () => {
        const res = await myNick(useNick)
        if (res.data.data === true && useNick.length <= 6) {
            setNickMsg('중복된 닉네임입니다');
        } else if (useNick.length > 6){
            setNickMsg('닉네임은 6자 이하로 가능합니다');
        } else{
            setNickMsg('');
        }
    }

    const changePw = () => {
        if (usePw.length !== 0 && usePw.length < 6){
            setPwMsg('비밀번호는 6자 이상 가능합니다');
        }else {
            setPwMsg('')
        }
    }

    const changePwCk = () => {
        if (usePwCk.length !== 0 && usePw !== usePwCk) {
            setPwCkMsg('비밀번호가 맞지 않습니다')
        }else if (usePwCk.length !== 0 && usePwCk.length < 6){
            setPwCkMsg('비밀번호는 6자 이상 가능합니다')
        }else {
            setPwCkMsg('')
        }
    }

    const changeEmail = async () => {
        const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        if (useEmail.length !== 0 && !emailRegEx.test(useEmail)) {
            setEmailMsg('올바른 이메일 형식이 아닙니다')
        } else {
            const res = await myEmail(useEmail)
            if (res.data.data === true) {
                setEmailMsg('중복된 닉네임입니다.');
            } else{
                setEmailMsg('');
            }
        }
    }

    const updateInfo = async (userProfile : User|null) => {
        const res = await myUpdate(userProfile, useNick, usePw, useEmail)
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
    }

    const allCk = () => {
        if (((nickMsg && pwMsg && pwCkMsg && emailMsg) === '') && ((useNick || usePw || useEmail) !== '')) {
            return false; //수정가능
        }else {
            return true;
        }
    }

    return (
        <i.Outline>
            <i.TabTitle>회원정보 수정</i.TabTitle>
            <Line>
                <Title>이름</Title>
                <i.Val placeholder={data?.useName} readOnly />
            </Line>
            <Line>
                <Title>닉네임</Title>                
                <i.Val placeholder={data?.useNick} onChange={(e)=> setNick(e.target.value)}/>
                <span>{nickMsg}</span>
            </Line>
            <Line>
                <Title>아이디</Title>
                <i.Val placeholder={data?.useId} readOnly />
            </Line>
            <Line>
                <Title>새 비밀번호</Title>
                <i.Val type='password' placeholder='새 비밀번호를 입력해주세요' onChange={(e)=> setPw(e.target.value)}/>
                <span>{pwMsg}</span>
            </Line>
            <Line>
                <Title>새 비밀번호 확인</Title>
                <i.Val type='password' placeholder='새 비밀번호를 다시 입력해주세요' onChange={(e)=> setPwCk(e.target.value)}/>
                <span>{pwCkMsg}</span>
            </Line>
            <Line>
                <Title>이메일</Title>
                <i.Val placeholder={data?.useEmail} onChange={(e)=> setEmail(e.target.value)}/>
                <span>{emailMsg}</span>
            </Line>
            <UpBtn onClick={()=> updateInfo(userProfile)} disabled={allCk()} confirm={allCk()} >수정 완료</UpBtn>
        </i.Outline>
    );
};

export default Info;

const Line = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    margin: 0.5em;
    span {
        margin-top: 0.5em;
        color: red;
    }
    @media screen and (max-width: 1024px){
        font-size: 1rem;
        width: 60%;
    };
    @media screen and (max-width: 480px){
        font-size: 1rem;
        width: 80%;
    };
`;

const Title = styled.label`
    padding: 0.6em;
`;

const UpBtn = styled(i.Btn)<{confirm :boolean}>`
    ${props => 
        props.confirm &&
        css`
            background-color: gray;
            border: 1px solid gray;
            &:hover{
                cursor: default;
            }
    `};
`;