import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingSpinner = () => {
	return (
		<LoadingSpinnerWrapperTag>
			<SpinnerTag />
		</LoadingSpinnerWrapperTag>
	);
};

export default LoadingSpinner;

const rotate_spinner = keyframes`
    0% { 
        transform: rotate(0deg)
    }
    100% {
        transform: rotate(360deg);
    }
`;
const SpinnerTag = styled.div`
	position: absolute;
	top: calc(50%);
	left: calc(50% - 1em);
	border: 4px solid lightgray;
	border-top: 4px solid skyblue;
	border-radius: 50%;
	width: 35px;
	height: 35px;
	animation: ${rotate_spinner} 1.5s linear infinite;
`;

export const LoadingSpinnerWrapperTag = styled.div`
	position: relative;
	min-height: 100%;
`;
