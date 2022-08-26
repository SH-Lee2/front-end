import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { myDelete } from '../../services/my';
import authStore from '../../store/authStore';
import * as i from '../../styles/mypage/TabInner';

const Delete = () => {
    const { userProfile, removeUser } = authStore()

    const navigate = useNavigate()

    const userDel = async () => {
        const res = await myDelete(userProfile.no)
        if (res.data.status === 200) {
            Swal.fire({
                icon: 'success',
                text: '탈퇴 완료',
                showConfirmButton: false,
                timer: 1000
            })
            .then(() => {
                removeUser();
                navigate('/');
            }) //메인페이지 이동
        }else {
            Swal.fire({
                icon: 'error',
                text: '오류가 발생했습니다. 관리자에게 문의 바랍니다.'
            })
        }
    }

    return (
        <i.Outline>
            <i.TabTitle>회원 탈퇴</i.TabTitle>
            <i.Title>탈퇴하시겠습니까?</i.Title>
            <Btn onClick={() => {
                Swal.fire({
                    icon: 'warning',
                    text: '정말 탈퇴하시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    confirmButtonColor: 'skyblue',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        userDel();
                    }
                })
            }}>네</Btn>
        </i.Outline>
    );
};

export default Delete;

const Btn = styled.button`
    color: white;
    background-color: skyblue;
    padding: 0.3em 1.3em;
    border-radius: 5px;
    border: 1px solid skyblue;
    &:hover {
        cursor: pointer;
    }
`;