import styled from "styled-components";

export const DefaultColor = styled.div`
    background-color: #ede8e8;
    margin-bottom: 0.7em;
    border-radius: 5px;
`;

export const DefaultImage = styled(DefaultColor)`
    padding-top: 75%;
`;

export const DefaultMyImage = styled(DefaultColor)`
    width: 20%;
    #inner {
        padding-top: 100%;
    }
`;