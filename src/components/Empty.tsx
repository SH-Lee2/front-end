import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Empty = () => {
	const { pathname } = useLocation();

	return (
		<EmptyTag>
			{pathname === "/" ? "글이 없습니다." : "댓글이 없습니다."}
		</EmptyTag>
	);
};

export default Empty;

const EmptyTag = styled.div`
	min-height: 120px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2em;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
		rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
	border-radius: 5px;
`;
