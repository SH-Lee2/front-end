import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from '../../components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import { myComments } from '../../services/my';
import authStore from '../../store/authStore';
import Col from '../../styles/mypage/MyList';
import * as i from '../../styles/mypage/TabInner';
import { CommentT, PageT } from '../../types/types';

const Comments = () => {
    const {userProfile} = authStore()

    const [data,setData] = useState<CommentT[]>([]);
    const [page, setPage] = useState<PageT>();
    const [curPage, setCurPage] = useState(1); 
    const [isLoading, setIsLoading] = useState(false);

    const getComments = async () => {
        setIsLoading(true)
        const res = await myComments(userProfile.no, curPage);
        setData(res.data.data.list);
        setPage(res.data.data.pageable);
        setIsLoading(false)
    }

    const datailLink = (categoryNum :number, artNo :number, repContents :string) => {
        let arr = []
        let categoryPath = ''
        if (categoryNum === 0){
            categoryPath = '/today_clothes/dailylook'
        } else if (categoryNum === 1) {
            categoryPath = '/today_clothes/free'
        } else if (categoryNum === 2) {
            categoryPath = '/today_sky'
        } else if (categoryNum === 3) {
            categoryPath = '/today_meeting'
        }
        arr.push(
            <Link to={`${categoryPath}/${artNo}`} state={{ artNo: artNo}} id='cmt'>
                <li>{repContents}</li>
            </Link>
        )
        return arr;
    }

    useEffect(() => {
        getComments()
    },[curPage])

    return (
        <i.Outline>
            <i.TabTitle>댓글 목록</i.TabTitle>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                {data.length > 0 && (
                    <Col>
                        <li id='content'>댓글</li>
                        <li id='day'>날짜</li>
                    </Col>
                )}
                {data.length > 0 ? (
                    data.map((com, i) => (
                        <Cmt key={i}>
                            { datailLink(com.artCategory, com.artNo, com.repContents) }
                            <li id='date'>{com.repCreated.slice(0,8)}</li>
                        </Cmt>
                    ))
                ) : (
                    <i.NoData>작성된 댓글이 없습니다.</i.NoData>
                )}
                {data.length > 0 && (
                    <Pagination curPage={curPage} setCurPage={setCurPage} totalPage={page.totalPages} totalCount={page.totalElements} size={page.size} pageCount={5}/>
                )}
                </>
            )}
        </i.Outline>
    );
};

export default Comments;

const Cmt = styled.ul`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0.9em;
    border-bottom: 1px solid lightgray;
    #cmt {
        color: black;
        flex-basis: 80%;
        padding-left: 1em;
    }
    #date {
        flex-basis: 20%;
        text-align: center;
        color: #999999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media screen and (max-width: 767px){
        font-size: 0.9rem;
    };
    @media screen and (max-width: 480px){
        font-size: 0.8rem;
    };
`;