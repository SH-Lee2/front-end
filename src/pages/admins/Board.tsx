import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Pagination from '../../components/Pagination';
import { AllList, CateList } from '../../services/admins';
import * as a from '../../styles/Admin';
import * as i from '../../styles/mypage/TabInner';
import { PageT, Post } from '../../types/types';

const Board = () => {
    const [article, setArticle] = useState<Post[]>([]);
    const [selected,setSelected] = useState ('4');

    const [page, setPage] = useState<PageT>({});
    const [curPage, setCurPage] = useState(0);

    const cks :number[] = [];

    const getAll = async () => {
        const res = await AllList(curPage)
        setArticle(res.data.data.list);
        setPage(res.data.data.pageable);
    }

    const getCategory = async () => {
        const res = await CateList(selected, curPage)
        setArticle(res.data.data.list)
        setPage(res.data.data.pageable)
    }

    useEffect(() => {
        if (selected === '4') {
            getAll()
        } else {
            getCategory()
        }        
    },[selected, curPage])

    const checks = (ck: boolean, no: number) => { //삭제글 선택
        if (ck) {
            cks.push(no);
        }else {
            cks.splice(cks.indexOf(no), 1);
        }
    }

    const del = () => { //글 삭제
        return axios.delete(`/manager/article/${cks}`)
        .then(res => {
            Swal.fire({
                icon: 'success',
                text: '삭제 완료!',
                showConfirmButton: false,
                timer: 1000
            })
            .then(() => window.location.reload())            
        });
    }

    const cateChange = (cate :string) => {
        setSelected(cate);
    }

    return (
        <i.Outline>
            <i.TabTitle>게시글 목록</i.TabTitle>
            <a.Cate>
                <a.Sel onChange={(e) => cateChange(e.target.value)} value={selected}>
                    <option value='4'>전체</option>
                    <option value='0'>데일리룩</option>
                    <option value='1'>오늘 뭐 입지?</option>
                    <option value='2'>오늘의 하늘</option>
                    <option value='3'>오늘의 모임</option>
                </a.Sel>
            </a.Cate>
            <ArtList>
                <Col>
                    <li id='head'>글 제목</li>
                    <li>닉네임</li>
                    <li>날짜</li>
                    <li id='ck'>
                        <a.CkBtn onClick={()=> del()}>삭제</a.CkBtn>
                    </li>
                </Col>
                {article && (
                    article.map((post,i) => (
                        <Cnt key={i}>
                            <Link to={`/${post.artCategory}/${post.artNo}`} id='head2'>
                                <li id='subject'> 
                                    <span id='sub'>{post.artSubject}</span>
                                    <span id='dist'>{post.regAddr1} {post.regAddr2}</span>
                                </li>
                            </Link>
                                <li>{post.useNick}</li>
                                <li id='date'>{post.artCreated.slice(0,8)}</li>
                                <li id='ck'>
                                    <input type='checkbox' onChange={(e)=>{checks(e.target.checked, post.artNo)}}/>
                                </li>
                        </Cnt>
                    ))
                )}
            </ArtList>
            {article && (
                <Pagination curPage={curPage+1} setCurPage={setCurPage} totalPage={page.totalPages} totalCount={page.totalElements} size={page.size} pageCount={5}/>
            )}
        </i.Outline>
    );
};

export default Board;

const ArtList = styled(a.List)`
    li {
        padding: 0.6em 0;
        width: 12%;
        @media screen and (max-width: 840px){
            width: 14%;
        };
        @media screen and (max-width: 480px){
            width: 15%;
        };
    }
    #ck {
        width: 7%;
        @media screen and (max-width: 480px){
            width: 11%;
        };
    }
`;

const Col = styled.ul`
    font-size: 1.1rem;
    font-weight: 500;
    border-bottom: 1px solid gray;
    #head {
        width: 60%;
    }
    @media screen and (max-width: 480px){
        font-size: 0.9rem;
    };
`;

const Cnt = styled.ul`
    border-bottom: 1px solid lightgray;
    #head2 {
        width: 60%;
    }
    #subject {
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-left: 1em;
    }
    #sub {
        color: black;
        font-size: 1.1rem;
        padding: 0.5em 0;
        @media screen and (max-width: 767px){
            font-size: 1rem;
        };
        @media screen and (max-width: 480px){
            font-size: 0.9rem;
        };
    }
    #dist {
        color: gray;
        font-size: 0.9rem;
    }
    #date {
        @media screen and (max-width: 480px){
            font-size: 0.7rem;
        };
    }
    @media screen and (max-width: 480px){
        font-size: 0.8rem;
    };
`;