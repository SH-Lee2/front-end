import React, { useEffect, useState } from 'react'
import { AiOutlineCaretRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import LoadingSpinner from '../../components/LoadingSpinner';
import { mainDaily, mainFree } from '../../services/category';
import * as c from '../../styles/Category';
import { Post } from '../../types/types';

const Clothes = () => {
  const [daily, setDaily] = useState<Post[]>([]);
  const [free, setFree] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDaily = async () => {
    setIsLoading(true)
    const res = await mainDaily()
    setDaily(res.data.data.list)
    setIsLoading(false)
  }

  const getFree = async () => {
    setIsLoading(true)
    const res = await mainFree()
    setFree(res.data.data.list)
    setIsLoading(false)
  }

  useEffect(() => {
    getDaily()
    getFree()
  }, [])
  
  return (
    <c.Container>
      <c.Title>오늘의 옷</c.Title>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
        <Line>
          <Link to='../dailylook' id='sub'>데일리룩</Link>
          <Link to='../dailylook' id='more'>더보기<AiOutlineCaretRight /></Link>
        </Line>

        <c.Imgs>
          {daily && (
            daily.map((art, i) => (
              <DailyCard key={i}>
                <Link to={`/today_clothes/main/${art.artNo}`}>
                  <c.Thumnail>
                    <c.Img src={art.imgPath} alt='Clothes'/>
                  </c.Thumnail>
                  <span id='color'>{art.regAddr1} {art.regAddr2}</span>
                </Link>
              </DailyCard>
            ))
          )}
        </c.Imgs>

        <Line>        
          <Link to='../free' id='sub'>오늘 뭐 입지?</Link>
          <Link to='../free' id='more'>더보기<AiOutlineCaretRight /></Link>
        </Line>

        {free && (
          free.map((art, i) => (
            <Link to={`/today_clothes/free/${art.artNo}`} key={i}>
              <Article>
                <span id='title'>{art.artSubject}</span>
                <span id='dist'>{art.regAddr1} {art.regAddr2}</span>
              </Article>
            </Link>
          ))
        )}
        </>
      )}      
    </c.Container>
  )
}

export default Clothes

const Line = styled.div`
  padding: 0.8em;
  display: flex;
  justify-content: space-between;
  margin: 3em 0 1em 0;
  #sub {
    font-size: 1.5rem;
    font-weight: 500;
    color: black;
    @media screen and (max-width: 767px) {
      font-size: 1.3rem;
    };
    @media screen and (max-width: 480px) {
      font-size: 1.2rem;
    };
  }
  #more {
    color: black;
    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
    };
  }
  @media screen and (max-width: 767px) {
    margin: 1em 0;
  };
`;

export const DailyCard = styled(c.CardBasic)`
  #color {
    color: gray;
  }
  @media screen and (max-width: 767px) {
    padding: 0 0.4em 0.7em 0.4em;
    flex-basis: 50%;
  };
  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
  };
`;

const Article = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8em 0.5em;
  border-bottom: 1px solid lightgray;
  #title {
    font-size: 1.1rem;
    color: black;
    @media screen and (max-width: 480px) {
      font-size: 1rem;
    };
  }
  #dist {
    color: gray;
    @media screen and (max-width: 1023px) {
      font-size: 0.9rem;
    };
    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
    };
  }
  :hover {
    transform: scale(1.02);
    transition: 0.4s;
    box-shadow: 0 12px 16px hsla(228, 66%, 45%, 0.1);
  }
`;