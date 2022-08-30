import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface WeatherT {
    [key :number] : any,
    [key :string] : any,
}

interface nameT {
    name :string
}

interface Props {
    onGetRegion?: (reg:string)=>void;
}

const Map = ({onGetRegion}:Props) => {
    const [data,setData] = useState<WeatherT[]>([])
    const [clickReg, setClickReg] = useState('01')

    const weathers : string[] = ['서울', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];
    const regNum :string[] = ['01', '09', '10', '11', '12', '13', '14', '15', '16', '17'];

    const getWeather = async () => {
        const res = await axios.get('/api')
        setData(res.data.list)
    }

    useEffect(() => {
        getWeather()
    }, [])

    const clickRegionHandler = (idx:number) => {
        setClickReg(regNum[idx])
        onGetRegion(clickReg)
    }

    const weatherIcon = (i :number, temps :number, icon :string) => {
        let arr = []
        const temp = Math.round(temps)
        switch (icon.slice(0, 2)) {
            case '01' :
                arr.push( <span key={i} id='sub'>{temp}℃ &nbsp;🌞</span> )
                return arr
            case '02' :
            case '03' :
            case '04' :
            case '50' :
                arr.push( <span key={i} id='sub'>{temp}℃ &nbsp;⛅</span> )
                return arr
            case '09' :
            case '10' :
                arr.push( <span key={i} id='sub'>{temp}℃ &nbsp;🌧</span> )
                return arr
            case '11' :
                arr.push( <span key={i} id='sub'>{temp}℃ &nbsp;🌩</span> )
                return arr
            case '13' :
                arr.push( <span key={i} id='sub'>{temp}℃ &nbsp;⛄</span> )
                return arr
        }
    }

    return (
        <div>
            <Maps>
                <Img src='/weatherMap.jpg' alt='map'/>
                {data && (
                    data.map((region, i) => (
                        <City key={i} name={region.name} onClick={() => clickRegionHandler(i) }>
                            <span id='name'>{weathers[i]}</span>
                            {weatherIcon(i, region.main.temp, region.weather[0].icon)}
                        </City>
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
`;

const Img = styled.img`
    width: 90%;
    height: auto;
    @media screen and (max-width: 1023px){
        width: 100%;
    };
    @media screen and (min-width: 481px) and (max-width: 819px){
        width: 65%;
    };
    @media screen and (min-width: 481px) and (max-width: 670px){
        width: 80%;
    };
`;

const City = styled.span<nameT>`
    display: flex;
    flex-direction: column;
    font-weight: bold;
    position: absolute;
    font-size: 0.9rem;
    background-color: white;
    border: 3px solid pink;
    border-radius: 10px;
    padding: 0.2em;
    #name {        
    }
    #sub {
        font-size: 0.8rem;
        padding-top: 0.2em;
        @media screen and (max-width: 480px){
            font-size: 0.7rem;
        };
    }
    ${props => {
        switch (props.name) {
            case 'Seoul' :
                return css`
                    top: 50px;
                    left: 100px;
                    @media screen and (max-width: 1023px){
                        top: 40px;
                    };
                    @media screen and (max-width: 819px){
                        left: 240px;
                    };
                    @media screen and (max-width: 670px){
                        left: 160px;
                    };
                    @media screen and (max-width: 480px){
                        top: 30px;
                        left: 80px;
                    };
                `            
            case 'Gyeonggi-do' :
                return css`
                    top: 110px;
                    left: 140px;
                    @media screen and (max-width: 1023px){
                        top: 85px;
                        left: 85px;
                    };
                    @media screen and (max-width: 819px){
                        left: 230px;
                    };
                    @media screen and (max-width: 670px){
                        left: 140px;
                    };
                    @media screen and (max-width: 480px){
                        top: 70px;
                        left: 70px;
                    };
                `
            case 'Gangwon-do' :
                return css`
                    top: 70px;
                    right: 140px;
                    @media screen and (max-width: 1023px){
                        right: 120px;
                    };
                    @media screen and (max-width: 819px){
                        right: 250px;
                    };
                    @media screen and (min-width: 481px) and (max-width: 670px){
                        top: 80px;
                        right: 165px;
                    };
                    @media screen and (max-width: 480px){
                        right: 90px;
                    };
                `
            case 'North Chungcheong' :
                return css`
                    top: 160px;
                    left: 220px;
                    @media screen and (max-width: 1023px){
                        top: 150px;
                        left: 160px;
                    };
                    @media screen and (max-width: 819px){
                        left: 320px;
                    };
                    @media screen and (max-width: 720px){
                        left: 280px;
                    };
                    @media screen and (max-width: 670px){
                        left: 230px;
                    };
                    @media screen and (max-width: 545px){
                        top: 120px;
                        left: 180px;
                    };
                    @media screen and (max-width: 480px){
                        top: 115px;
                        left: 150px;
                    };
                    @media screen and (max-width: 400px){
                        top: 105px;
                        left: 110px;
                    };
                `
            case 'Chungcheongnam-do' :
                return css`
                    top: 180px;
                    left: 80px;
                    @media screen and (max-width: 1023px){
                        top: 165px;
                        left: 60px;
                    };
                    @media screen and (max-width: 819px){
                        left: 220px;
                    };
                    @media screen and (max-width: 670px){
                        left: 120px;
                    };
                    @media screen and (max-width: 545px){
                        top: 130px;
                    };
                    @media screen and (max-width: 480px){
                        top: 120px;
                        left: 50px;
                    };
                `
            case 'Jeollabuk-do' :
                return css`
                    left: 140px;
                    bottom: 170px;
                    @media screen and (max-width: 1023px){
                        left: 115px;
                        bottom: 150px;
                    };
                    @media screen and (max-width: 819px){
                        left: 200px;
                    };
                    @media screen and (max-width: 670px){
                        left: 125px;
                    };
                    @media screen and (max-width: 545px){
                        bottom: 110px;
                    };
                    @media screen and (max-width: 480px){
                        left: 70px;
                        bottom: 120px;
                    };
                `
            case 'Jeollanam-do' :
                return css`
                    left: 80px;
                    bottom: 90px;
                    @media screen and (max-width: 1023px){
                        left: 50px;
                        bottom: 70px;
                    };
                    @media screen and (max-width: 819px){
                        left: 190px;
                    };
                    @media screen and (max-width: 670px){
                        left: 110px;
                    };
                    @media screen and (max-width: 480px){
                        left: 40px;
                        bottom: 70px;
                    };
                `
            case 'Gyeongsangbuk-do' :
                return css`
                    top: 200px;
                    right: 110px;
                    @media screen and (max-width: 1023px){
                        right: 80px;
                    };
                    @media screen and (max-width: 819px){
                        right: 210px;
                    };
                    @media screen and (max-width: 670px){
                        right: 120px;
                    };
                    @media screen and (max-width: 545px){
                        top: 160px;
                    };
                    @media screen and (max-width: 480px){
                        top: 170px;
                        right: 60px;
                    };
                `
            case 'Gyeongsangnam-do' :
                return css`
                    right: 180px;
                    bottom: 100px;
                    @media screen and (max-width: 1023px){
                        right: 50px;
                    };
                    @media screen and (max-width: 819px){
                        right: 270px;
                    };
                    @media screen and (max-width: 670px){
                        right: 170px;
                    };
                    @media screen and (max-width: 480px){
                        right: 100px;
                        bottom: 70px;
                    };
                `
            case 'Jeju-do' :
                return css`
                    bottom: 5px;
                    left: 150px;
                    @media screen and (max-width: 460px){
                        left: 100px;
                    };
                `            
        }
    }}
    &:hover {
        cursor: pointer;
        transform: scale(1.02);
        transition: 0.4s;
    }
    @media screen and (max-width: 1023px){
        font-size: 0.8rem;
        font-weight: 600;
    };
`;