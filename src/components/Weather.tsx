import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface WeatherT {
    [key :number] : any,
    [key :string] : any
}

interface nameT {
    name :string
}

const Map = () => {
    const [Data,setData] = useState<WeatherT[]>()
    const weathers : string[] = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기도', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

    useEffect(() => {
        axios.get('/api')
        .then(res => {
            setData(res.data.list)
        })
    }, [])

    return (
        <div>
            <Maps>
                <Img src='/weatherMap2.jpg' alt='map'/>
                {Data && (
                    Data.map((region, i) => (
                        <City key={i} name={region.name}>{weathers[i]} {region.main.temp}</City>
                    ))
                )}
            </Maps>
        </div>
    );
};

export default Map;

const Maps = styled.div`
    margin: 0 auto;
    position: relative;
    text-align: center;
    border: 1px solid pink;
`;

const Img = styled.img`
    width: 100%;
    height: auto;
    border: 1px solid skyblue;
`;

const City = styled.span<nameT>`
    font-weight: bold;
    position: absolute;
    background-color: skyblue;
    border: 2px solid skyblue;
    border-radius: 5px;
    ${props => {
        if (props.name === 'Seoul') {
            return css`
                top: 6.5em;
                left: 2vw;
            `
        }else if (props.name === 'Busan') {
            return css`
                right: 5em;
                bottom: 10em;
            `
        }else if (props.name === 'Daegu') {
            return css`
                left: 10em;
                bottom: 2em;
            `
        }else if (props.name === 'Incheon') {
            return css`
                right: 5em;
                bottom: 10em;
            `
        }else if (props.name === 'Gwangju') {
            return css`
                right: 5em;
                bottom: 10em;
            `
        }else if (props.name === 'Daejeon') {
            return css`
                right: 5em;
                bottom: 10em;
            `
        }else if (props.name === 'Ulsan') {
            return css`
                right: 5em;
                bottom: 10em;
            `
        }else if (props.name === 'Sejong') {
            return css`
                right: 5em;
                bottom: 10em;
            `
        }else if (props.name === 'Gyeonggi-do') {
            return css`
                right: 5em;
                bottom: 10em;
            `
        }else if (props.name === 'Gangwon-do') {
            return css`
                right: 5em;
                bottom: 10em;
            `
        }else if (props.name === 'Chungcheongbuk-do') {
            return css`
                right: 5em;
                bottom: 10em;
            `
        }else if (props.name === 'Chungcheongnam-do') {
            return css`
                right: 5em;
                bottom: 10em;
            `
        }else if (props.name === 'Jeollabuk-do') {
            return css`
                right: 5em;
                bottom: 10em;
            `
        }else if (props.name === 'Jeollanam-do') {
            return css`
                right: 5em;
                bottom: 10em;
            `
        }else if (props.name === 'Gyeongsangbuk-do') {
            return css`
                right: 5em;
                bottom: 10em;
            `
        }else if (props.name === 'Gyeongsangnam-do') {
            return css`
                right: 5em;
                bottom: 10em;
            `
        }else {
            return css`
                left: 5em;
            `
        }
    }}
`;