import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Pagination from '../../components/Pagination';
import { AllUser } from '../../services/admins';
import * as a from '../../styles/Admin';
import * as i from '../../styles/mypage/TabInner';
import { PageT, UserT } from '../../types/types';

const Users = () => {    
    const [data, setData] = useState<UserT[]>([]);
    const [selected,setSelected] = useState ('0');

    const [page, setPage] = useState<PageT>({});
    const [curPage, setCurPage] = useState(0);
    
    const dels :number[] = [];
    const admins :number[] = [];

    const getUsers = async () => {
        const res = await AllUser(curPage)
        setPage(res.data.data.pageable);
        if (selected === '0') {
            setData(res.data.data.list.filter((use :UserT) => use.useRole === 'USER'));
        } else {
            setData(res.data.data.list.filter((use :UserT) => use.useRole === 'ADMIN'));
        }        
    }

    useEffect(() => {
        getUsers()
    },[selected, curPage])

    const typeChange = (type :string) => {
        setSelected(type)
    }
    
    const delCk = (ck: boolean, no: number) => { //회원 선택
        if (ck) {
            dels.push(no);
        }else {
            dels.splice(dels.indexOf(no), 1);
        }
    }

    const del = () => { //회원 삭제
        axios.delete(`/manager/user/${dels}`)
        .then(res => {
            if (res.data.data === 1) {
                Swal.fire({
                    icon: 'success',
                    text: '삭제 완료',
                    showConfirmButton: false,
                    timer: 1000
                })
                .then(() => window.location.reload())
            }         
        });
    }

    const adminCk = (ck: boolean, no: number) => { //관리자 선택
        if (ck) {
            admins.push(no);
        }else {
            admins.splice(admins.indexOf(no), 1);
        }
    }

    const admin = () => { //관리자 임명,해임
        if (admins.length !== 1) {
            Swal.fire({
                icon: 'error',
                text: '관리자는 1명만 선택 가능합니다'
            })
        } else {
            axios.put(`/manager/user/${admins}`)
            .then(res => {
                if (res.data.data === 1) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Admin 완료',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    .then(() => window.location.reload())
                }
            });
        }
    }

    return (
        <i.Outline>
            <i.TabTitle>회원 목록</i.TabTitle>
            <a.Cate>
                <a.Sel onChange={(e) => typeChange(e.target.value)} value={selected}>
                    <option value='0'>회원</option>
                    <option value='1'>관리자</option>
                </a.Sel>
            </a.Cate>
            <UserList>
                <Col>
                    <li>ID</li>
                    <li>이름</li>
                    <li>닉네임</li>
                    <li id='ck'><a.CkBtn onClick={()=> del()}>삭제</a.CkBtn></li>
                    { selected === '0' ?
                            <li id='ck'>
                                <a.CkBtn onClick={()=> admin()}>Admin+</a.CkBtn>
                            </li>
                        :
                            <li id='ck'>
                                <a.CkBtn onClick={()=> admin()}>Admin-</a.CkBtn>
                            </li>
                    }
                </Col>
                { data && (
                    data.map((user,i) => (
                        <Cnt key = {i}>
                            <li>{user.useId}</li>
                            <li>{user.useName}</li>
                            <li>{user.useNick}</li>
                            <li id='ck'>
                                <input type='checkbox' onChange={(e)=>{delCk(e.target.checked,user.useNo)}}/>
                            </li>
                            <li id='ck'>
                                <input type='checkbox' onChange={(e)=>{adminCk(e.target.checked,user.useNo)}}/>
                            </li>
                        </Cnt>
                    ))
                )}
            </UserList>
            { data && (
                <Pagination curPage={curPage+1} setCurPage={setCurPage} totalPage={page.totalPages} totalCount={page.totalElements} size={page.size} pageCount={5}/>
            )}
        </i.Outline>
    );
};

export default Users;

const UserList = styled(a.List)`
    li {
        width: 27%;
        padding: 0.6em 0;
        @media screen and (max-width: 768px){
            width: 25%;
        };
        @media screen and (max-width: 532px){
            width: 23%;
        };
    }
    #ck {
        width: 10%;
        @media screen and (max-width: 532px){
            width: 12%;
        };
    }    
`;

const Col = styled.ul`
    font-size: 1.1rem;
    font-weight: 500;
    border-bottom: 1px solid gray;
    @media screen and (max-width: 532px){
        font-size: 0.9rem;
    };
`;

const Cnt = styled.ul`
    border-bottom: 1px solid lightgray;
    @media screen and (max-width: 532px){
        font-size: 0.8rem;
    };
`;