import React from "react";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SelectRezion from "./select_region/SelectRegion";

interface Props {
	categoryNum: number;
	category: string;
	onGetRegionNumber: (reg: string) => void;
}

const CateHeader = ({ categoryNum, category, onGetRegionNumber }: Props) => {
	return (
		<WrapperTag>
			<PageHeaderTag>
				<div className="title">
					<h2>{category}</h2>
				</div>

				<button type="button">
					<Link
						to="/upload_post"
						state={{ category: category, categoryNum: categoryNum }}
					>
						<MdEdit />
						글쓰기
					</Link>
				</button>
			</PageHeaderTag>
			<SelectRezion onGetRegionNumber={onGetRegionNumber} />
		</WrapperTag>
	);
};

export default CateHeader;

export const WrapperTag = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 2em;
	width: 100%;
	margin-bottom: 2em;
	@media screen and (min-width: 480px) {
		margin-bottom: 4em;
	}
`;

export const PageHeaderTag = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.title {
		h2 {
			font-size: 1.85rem;
			font-weight: 700;
			color: skyblue;
		}
		@media screen and (min-width: 480px) {
			font-size: 2rem;

		}
	}
	button {
		background-color: skyblue;
		border-radius: 5px;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		column-gap: 0.5em;
		color: white;
		a {
			color: white;
			padding: 0.5em 1em;
			width: 100%;
			font-size: .7rem;
		}
	}
	@media screen and (min-width: 480px) {
		.title{
			h2{
				font-size: 2rem;
			}
		}
		button{
			a {
				font-size: 1rem;
			}
		}
		}
`;
