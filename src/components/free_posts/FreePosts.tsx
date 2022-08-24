import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Post } from "../../types/types";
import Empty from "../Empty";

interface Props {
	posts: Post[];
	path: string;
}
const FreePosts = ({ posts, path }: Props) => {
	return (
		<FreePostsTag>
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
								<div className="left">
									<span className="art-subject">
										{post.artSubject}
									</span>
								</div>
								<div className="right">
									<div>
										<span className="created">
											{post.artCreated}
										</span>
									</div>
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
								</div>
							</Link>
						</li>
					))}
				</ListTag>
			)}
		</FreePostsTag>
	);
};

export default FreePosts;

const FreePostsTag = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border-radius: 5px;
`;

const ListTag = styled.ul`
	width: 100%;
	display: flex;
	flex-direction: column;
	row-gap: 1em;
	/* height: 100%; */
	li {
		:not(:last-child) {
			border-bottom: 2px solid lightgray;
		}
		a {
			display: flex;
			flex-direction: column;
			row-gap: 0.8em;
			justify-content: space-between;
			padding: 0.5rem 1rem;
			color: black;
		}
	}
	.left {
		display: flex;
		flex-direction: column;
		row-gap: 0.5em;
		flex: 1;
	}
	.right {
		display: flex;
		justify-content: space-between;
		align-items: center;
		row-gap: 0.5em;
	}
	.created {
		font-size: 0.7rem;
		color: gray;
	}
	.nickname {
		font-size: 0.7rem;
		font-weight: 500;
		margin-right: 0.5em;
	}
	.addr1 {
		margin-right: 0.2em;
	}
	.addr1,
	.addr2 {
		font-size: 0.4rem;
		color: gray;
	}
	.art-subject {
		font-size: 0.9rem;
		font-weight: 500;
	}

	@media screen and (min-width: 500px) {
		.left {
			column-gap: 0.5em;
		}
		.right {
			.info {
				display: flex;
				align-items: center;
			}
		}
		.created {
			font-size: 0.6rem;
		}
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

	@media screen and (min-width: 875px) {
		.created {
			font-size: 0.8rem;
		}
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
