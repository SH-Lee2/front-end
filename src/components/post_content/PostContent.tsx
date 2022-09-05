import React from "react";
import { Post, Region } from "../../types/types";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import styled from "styled-components";
import authStore from "../../store/authStore";
import EditModal from "../edit_modal/EditModal";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../services/post";
import { WEAHTER } from "../../utils/weatherData";

interface Props {
	post: Post;
	region: Region;
	images: string[]
}

const PostContent = ({ post, region ,images}: Props) => {
	const { userProfile } = authStore();
	const navigate = useNavigate()
	const deleteHandler = async() => {
		await deletePost(post.artNo)
		navigate(-1)
	};
	const goToEdit = async() => {
		navigate("/upload_post", {state : {post , images}})
	}
	return (
		<ArticleTag>
			<HeaderTag>
				<div className="user_info">
					<div>
						<span className="nickname">{post?.useNick}</span>
						{userProfile?.no === post?.useNo && (
							<span className="mine">내 작성글</span>
						)}
					</div>
					<div>
						<span className="addr1">{region?.regAddr1}</span>
						<span className="addr2">{region?.regAddr2}</span>
						{post?.artWselect > 0 && <span className="weather">{WEAHTER[post.artWselect].icon}</span>}
					</div>
				</div>
				{post?.useNo === userProfile?.no && (
					<EditModal onDelete={deleteHandler} onEdit={goToEdit} title="게시글"/>
				)}
			</HeaderTag>
			<TitleTag>{post?.artSubject}</TitleTag>
			<TimeTag>{post?.artCreated.slice(0,-3)}</TimeTag>
			<Viewer initialValue={post?.artContents} />
		</ArticleTag>
	);
};

export default PostContent;

const ArticleTag = styled.article`
	padding: 0.5em;
	display: grid;
	row-gap: 1.25em;
	@media screen and (min-width: 780px) {
		padding: 1em;
	}
`;

const HeaderTag = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: -0.75em;
	.user_info {
		display: flex;
		flex-direction: column;
		column-gap: 0.5em;
		row-gap: .5em;
	}
	.nickname {
		font-size: 0.9rem;
		margin-right: 0.25em;
	}
	.mine {
		display: flex;
		align-items: center;
		padding: 0.25em 0.5em;
		border-radius: 5px;
		background-color: skyblue;
		color: #fff;
		font-size: 0.65rem;
	}
	div {
		display: flex;
		column-gap: 0.25em;
	}
	.addr1,
	.addr2, .weather {
		color: gray;
		font-size: 0.65rem;
	}
	svg {
		font-size: 1.2rem;
	}
	@media screen and (min-width: 480px) {
		.user_info{
			flex-direction: row;
			align-items: center;
		}
		.nickname {
			font-size: 1.1rem;
		}
		.mine {
			font-size: 0.7rem;
		}
		.addr1,
		.addr2, .weather {
			font-size: 0.75rem;
		}
	}
`;

const TitleTag = styled.h2`
	font-size: 1.8rem;
	font-weight: 600;
	line-height: 150%;
`;

const TimeTag = styled.span`
	font-size: 0.75rem;
	color: gray;
	margin-top: -0.5em;
`;


