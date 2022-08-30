import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
	return (
		<FooterTag>
			<div>
				<Link to="/">
					<h1>밖에 봐봐</h1>
					<span>Look OutSide</span>
				</Link>
			</div>
			<NoticeTag>
				<p id="copylight">Copylight &copy; Designed by Freepik</p>
				<EmailTag>
					<AiOutlineMail />
					<a
						href="mailto:jinhh501@naver.com"
						id="representative_email"
					>
						jinhh501@naver.com
					</a>
				</EmailTag>
			</NoticeTag>
		</FooterTag>
	);
};

export default Footer;

const FooterTag = styled.footer`
	background-color: skyblue;
	width: 100%;
	display: flex;
	flex-direction: column;

	a {
		display: flex;
		flex-direction: column;
		row-gap: 0.5em;
		color: yellow;
		h1 {
			font-size: 2rem;
			font-weight: 800;
		}
		span {
			padding-left: 0.2em;
			font-weight: 500;
		}
	}
	div {
		padding: 1rem 2rem;
		@media screen and (min-width: 1160px) {
			max-width: 1160px;
			margin: 0 auto;
		}
	}
	@media screen and (min-width: 512px) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
`;

const NoticeTag = styled.div`
	color: white;
	letter-spacing: 1.2px;
	font-size: 0.75rem;
	display: flex;
	flex-direction: column;
	row-gap: .5em;
	align-items: flex-start;
	padding: 1rem 2rem;

	a {
		color: white;
		letter-spacing: 1.2px;
		font-size: 0.75rem;
	}
	@media screen and (min-width: 512px) {
		font-size: 0.8rem;
		a {
			font-size: 0.8rem;
		}
	}
`;

const EmailTag = styled.div`
	display: flex;
	align-items: center;
	padding: 0 !important;
	margin: 0 !important;
	column-gap: 0.5em;
`;
