import styled from "styled-components";

export const Container = styled.div`
    padding: 0 2em;
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 1160px){
    max-width: 1160px;
    margin: 0 auto;
    };
`;

export const Title = styled.span`
    color: skyblue;
    font-size: 2.2rem;
    font-weight: bold;
    margin: 0 auto;
    @media screen and (max-width: 480px) {
        margin-bottom: 1em;
        font-size: 1.8rem;
    };
`;

export const Btn = styled.button`
    margin-left: auto;
    font-size: 1rem;
    color: white;
    background-color: skyblue;
    padding: 0.3em 0.7em;
    border-radius: 5px;
    border: 1px solid skyblue;
    &:hover {
        cursor: pointer;
    }
    @media screen and (max-width: 480px) {
        padding: 0.5em 0.7em;
        font-size: 0.7rem;
    };
`;

export const Filter = styled.div`
    width: 80%;
    margin: 3em auto;
    background-color: lightblue;
    @media screen and (max-width: 480px) {
        margin: 1.5em auto;
    };
`;

export const Imgs = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const CardBasic = styled.div`
    flex-basis: 25%;
    margin-bottom: 1.5em;
    padding: 0 0.4em 0.7em 0.4em;
    border-radius: 10px;
    :hover {
        transform: scale(1.02);
        transition: 0.4s;
        box-shadow: 0 12px 16px hsla(228, 66%, 45%, 0.1);
    }
`

export const Card = styled(CardBasic)`
    p {
        margin-bottom: 0.5em;
    }
    #dis {
        color: gray;
        font-size: 0.9rem;
        @media screen and (max-width: 767px) {
            font-size: 0.7rem;
        };
    }
    #color {
        color: black;
    }
    @media screen and (max-width: 1023px) {
        flex-basis: 50%;
        padding: 0 1.3em 0.7em 1.3em;
    };
    @media screen and (max-width: 767px) {
        font-size: 0.8rem;
        padding: 0 0.4em 0.7em 0.4em;
    };
`;

export const Thumnail = styled.div`
    position: relative;
    overflow: hidden;
    padding-top: 75%;
    margin-bottom: 0.7em;
    border-radius: 5px;
`;

export const Img = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);
`;