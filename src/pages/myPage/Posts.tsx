import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from '../../components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import { myPosts } from '../../services/my';
import authStore from '../../store/authStore';
import Col from '../../styles/mypage/MyList';
import * as i from '../../styles/mypage/TabInner';
import { PageT, Post } from '../../types/types';

const Posts = () => {
    const { userProfile } = authStore()

    const [data,setData] = useState<Post[]>([]);
    const [page, setPage] = useState<PageT>({});
    const [curPage, setCurPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const getPosts = async () => {
        setIsLoading(true)
        const res = await myPosts(userProfile.no, curPage)
        setData(res.data.data.list)
        setPage(res.data.data.pageable)
        setIsLoading(false)
    }

    useEffect(() => {
        getPosts()
    },[curPage])

    return (
        <i.Outline>
            <i.TabTitle>작성글 목록</i.TabTitle>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                {data.length > 0 && (
                    <Col>
                        <li id='content'>글 제목</li>
                        <li id='day'>날짜</li>
                    </Col>
                )}
                {data.length > 0  ? (
                    data?.map((art, i) => (                    
                        <Article key={i}>
                            <Link to={`/${art.artCategory}/${art.artNo}`}>
                                <img src={process.env.PUBLIC_URL + '/test.jpg'} alt='test' />{/* 임시 */}
                                <li id='sub'>
                                    <span id='title' >{art.artSubject}</span>
                                    <span id='dist'>{art.regAddr1} {art.regAddr2}</span>
                                </li>
                                <li id='date'>{art.artCreated.slice(0,8)}</li>
                            </Link>
                        </Article>
                    ))
                ) : (
                    <i.NoData>작성된 글이 없습니다.</i.NoData>
                )}
                {data.length > 0  && (
                    <Pagination curPage={curPage} setCurPage={setCurPage} totalPage={page.totalPages} totalCount={page.totalElements} size={page.size} pageCount={5}/>
                )}
                </>
            )}            
        </i.Outline>
    );
};

export default Posts;

const Article = styled.ul`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0.9em;
    border-bottom: 1px solid lightgray;
    img {
        width: 5.2em;
        @media screen and (max-width: 480px){
        width: 3.5em;
        };
    }
    span {
        margin: 0.3em;
        @media screen and (max-width: 480px){
            margin: 0.2em;
        };
    }
    #sub {
        flex-basis: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 1.5em;
        @media screen and (max-width: 480px){
            padding-left: 0.7em;
        };
    }
    #dist {
        color: gray;
        font-size: 0.8rem;
        @media screen and (max-width: 480px){
            font-size: 0.65rem;
        };
    }
    #date {
        flex-basis: 20%;
        color: #999999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    @media screen and (max-width: 768px){
        font-size: 0.9rem;
    };
    @media screen and (max-width: 480px){
        font-size: 0.8rem;
        padding: 0.7em;
        height: 5em;
    };
`;