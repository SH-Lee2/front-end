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
                            <Link to={`/${art.artCategory}/${art.artNo}`} id='subject'>
                                <Thumnail>
                                    <div id='ThumImage'>
                                        <img src={art.imgPath} alt='MyPost' />
                                    </div>
                                </Thumnail>
                                <Title>
                                    <span id='sub'>{art.artSubject}</span>
                                    <span id='dist'>{art.regAddr1} {art.regAddr2}</span>
                                </Title>
                            </Link>
                            <Date>{art.artCreated.slice(0,8)}</Date>
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

const Article = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 1px solid lightgray;
    padding: 1em 0;
    #subject {
        display: flex;
        flex-direction: row;
        width: 80%;
    }
    
`; 

const Thumnail = styled.div`
    width: 20%;
    #ThumImage {
        position: relative;
        overflow: hidden;
        padding-top: 100%;
        img {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: translate(-50%, -50%);
        }
    }
`;

const Title = styled.div`
    width: 76%;
    display: flex;
    flex-direction: column;
    align-self: center;
    margin-left: 1em;
    span {
        padding: 0.5em 0 0.5em 0;
    }
    #sub {
        color: black;
        font-size: 1.1rem;
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
        @media screen and (max-width: 767px){
            font-size: 0.8rem;
        };
        @media screen and (max-width: 480px){
            font-size: 0.7rem;
        };
    }
`;

const Date = styled.div`
    color: gray;
    width: 24%;
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    @media screen and (max-width: 767px){
        font-size: 0.9rem;
    };
    @media screen and (max-width: 480px){
        font-size: 0.8rem;
    };
`;