import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Post } from "../../types/types";
import Empty from "../Empty";
import * as d from "../../styles/DefalutImage";

interface Props {
	posts: Post[];
	path: string;
}

const ImagePosts = ({ posts, path }: Props) => {
	return (
		<ImagePostsTag>
			{!posts.length ? (
				<Empty />
			) : (
				<ListTag>
					{posts.map((post) => (
						<li key={post.artNo}>
							<Link
								to={`${path}/${post.artNo}`}
								state={{ artNo: post.artNo }}
							>
								<article>
									<ImageWrapper>
										{/* 임시 사진 */}
										{post.imgPath !== null ? (
											<PostImageTag
												src={post.imgPath}
												alt="게시물 이미지"
											/>
										) : (
											<DefaultImageTag/>
										)}
									</ImageWrapper>
									<InfoWrapper>
										<h3 className="art-subject">
											{post.artSubject}
										</h3>
										<div className="info">
											<span className="nickname">
												{post.useNick}
											</span>
											<div>
												<span className="addr1">
													{post.regAddr1}
												</span>
												<span className="addr2">
													{post.regAddr2}
												</span>
											</div>
										</div>
									</InfoWrapper>
								</article>
							</Link>
						</li>
					))}
				</ListTag>
			)}
		</ImagePostsTag>
	);
};

export default ImagePosts;

const ImagePostsTag = styled.div``;

const ListTag = styled.ul`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-template-rows: repeat(auto-fill, 1fr);
	gap: 1em;
	@media screen and (min-width: 500px) {
		grid-template-columns: repeat(2, 1fr);
	}
	/* @media screen and (min-width: 768px) {
		grid-template-columns: repeat(4, 1fr);
	} */
	@media screen and (min-width: 964px) {
		grid-template-columns: repeat(4, 1fr);
	}

	li {
		padding: 0.4em 0.4em 1em 0.4em;
		border-radius: 5px;
		:hover {
			transform: scale(1.02);
			transition: 0.4s;
			box-shadow: 0 12px 16px hsla(228, 66%, 45%, 0.1);
		}
		a {
			color: black;
		}
	}
`;

const ImageWrapper = styled.div``;

const PostImageTag = styled.img`
	border-radius: 5px;
	width: 100%;
	height: 220px;
	object-fit: cover;
	object-position: center center;
`;

const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 0.5em;
	padding: 0.5em;
	.art-subject {
		font-size: 0.9rem;
		font-weight: 500;
	}
	.info {
		display: flex;
		align-items: center;
		column-gap: 0.4em;
	}
	.nickname {
		font-size: 0.7rem;
		font-weight: 500;
	}
	.addr1,
	.addr2 {
		font-size: 0.4rem;
		color: gray;
	}
	.addr1 {
		margin-right: 0.2em;
	}
	h3 {
		margin-top: 0.3em;
		font-weight: 500;
		line-height: 130%;
	}
	@media screen and (min-width: 500px) {
		.nickname {
			font-size: 0.8rem;
		}
		.addr1 {
		}
		.addr1,
		.addr2 {
			font-size: 0.6rem;
		}
		.art-subject {
			font-size: 1rem;
		}
	}
	@media screen and (min-width: 964px) {
		.nickname {
			font-size: 1rem;
		}
		.addr1 {
		}
		.addr1,
		.addr2 {
			font-size: 0.7rem;
		}
	}
`;

const DefaultImageTag = styled(d.DefaultColor)`
	height: 220px;
	margin: 0;
`
