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
          <span id='sub'>
            <Link to='../dailylook' id='black'>데일리룩</Link>
          </span>
          <span id='more'>
            <Link to='../dailylook' id='black'>더보기<AiOutlineCaretRight /></Link>
          </span>
        </Line>

        <c.Imgs>
          {daily && (
            daily.map((art, i) => (
              <Card key={i}>
                <Link to={`/today_clothes/main/${art.artNo}`}>
                  <c.Thumnail>
                    <c.Img src='/test.jpg' alt='test1' />{/* 임시 */}
                  </c.Thumnail>
                  <span id='color'>{art.regAddr1} {art.regAddr2}</span>
                </Link>
              </Card>
            ))
          )}
        </c.Imgs>

        <Line>        
        <span id='sub'>
            <Link to='../free' id='black'>오늘 뭐 입지?</Link>
          </span>
          <span id='more'>
            <Link to='../free' id='black'>더보기<AiOutlineCaretRight /></Link>
          </span>

        </Line>
          {free && (
            free.map((art, i) => (
              <Article key={i}>
                <Link to={`/today_clothes/free/${art.artNo}`}>
                  <span id='title'>{art.artSubject}</span>
                  <span id='dist'>{art.regAddr1} {art.regAddr2}</span>
                </Link>
              </Article>
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
  margin-top: 3em;
  #sub {
    width: 60%;
    font-size: 1.5rem;
    font-weight: 500;
    margin-right: auto;
    @media screen and (max-width: 768px) {
      font-size: 1.3rem;
    };
    @media screen and (max-width: 480px) {
      font-size: 1.2rem;
    };
  }
  #more {
    width: 30%;
    margin-left: auto;
    font-size: 0.9rem;
    display: flex;
    justify-content: end;
    align-items: flex-end;
    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
    };
  }
  #black {
    color: black;
  }
`;

const Card = styled.div`
  flex-basis: 22%;
  margin-bottom: 0.5em;
  color: gray;
  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
  };
  @media screen and (max-width: 480px) {
    flex-basis: 46%;
    font-size: 0.8rem;
  };
`;

const Article = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8em 0.5em;
  border-bottom: 1px solid lightgray;
  #title {
    width: 75%;
    font-size: 1.1rem;
    @media screen and (max-width: 523px) {
      width: 72%;
    };
    @media screen and (max-width: 480px) {
      font-size: 1rem;
      flex-direction: column;
      width: 100%;
      margin-bottom: 0.4em;
    };
  }
  #dist {
    width: 25%;
    color: gray;
    text-align: right;
    @media screen and (max-width: 523px) {
      width: 28%;
    };
    @media screen and (max-width: 480px) {
      width: 100%;
      text-align: left;
      font-size: 0.8rem;
    };
  }
  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.5em;
  };
  @media screen and (max-width: 480px) {
    flex-direction: column;
    padding: 0.4em 0;
  };
`;