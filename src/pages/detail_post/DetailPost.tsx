import { unescape } from "html-escaper";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Comments from "../../components/comment/Comments";
import UploadComment from "../../components/comment/UploadComment";
import LoadingSpinner from "../../components/LoadingSpinner";
import Pagination from "../../components/Pagination";
import PostContent from "../../components/post_content/PostContent";
import {
	addComment,
	deleteComment,
	getComments,
	updateComment,
} from "../../services/comment";
import { getDetailPost } from "../../services/post";
import authStore from "../../store/authStore";
import { CommentT, PageT, Post, Region } from "../../types/types";

interface CustomizedState {
	artNo: number;
}

const DetailPost = () => {
	const { userProfile } = authStore();
	const [post, setPost] = useState<Post>();
	const [postImg, setPostImg]= useState<string[]>([]);
	const [postRegion, setPostRegion] = useState<Region>();
	const [postIsLoading, setPostIsLoading] = useState<boolean>(false);
	const [comments, setComments] = useState<CommentT[]>([]);
	const [commentIsLoading, setCommentIsLoading] = useState<boolean>(false);
	const [page, setPage] = useState<PageT>({});
	const [curPage, setCurPage] = useState(1);
	const location = useLocation();
	const { artNo } = location.state as CustomizedState;
	const addCommentHandler = async (text: string) => {
		const res = await addComment(artNo, userProfile.no, text);
		const newComment = res.data.data;
		setComments((pre) =>
			pre.length ? [newComment, ...pre] : [newComment]
		);
	};

	const deleteCommentHandler = async (repNo: number) => {
		await deleteComment(repNo);
		const updateComment = comments.filter(
			(comment) => comment.repNo !== repNo
		);
		setComments(updateComment);
	};

	const updateCommentHandler = async (repNo: number, comment: string) => {
		await updateComment(repNo, comment);
	};

	useEffect(() => {
		const getCommentList = async () => {
			setCommentIsLoading(true);
			const res = await getComments(artNo, curPage);
			setPage(res.data.data.pageable);
			setComments(res.data.data.list);
			setCommentIsLoading(false);
		};
		getCommentList();
	}, [artNo, curPage]);

	useEffect(() => {
		const getPost = async () => {
			setPostIsLoading(true);
			const res = await getDetailPost(artNo);
			const {article, region,articleImg} = res.data.data
			setPost({...article,artContents : unescape(article.artContents.replaceAll("temporary", "images"))});
			const imagePath = articleImg.map((data: { imgPath: string; }) => data.imgPath)
			setPostImg(imagePath)
			setPostRegion(region);
			setPostIsLoading(false);
		};
		getPost();
	}, [artNo]);

	return (
		<ContainerTag>
			{postIsLoading ? (
				<LoadingSpinner />
			) : (
				<PostContent post={post} region={postRegion} images={postImg}/>
			)}

			{commentIsLoading && <LoadingSpinner />}
			{!commentIsLoading && (
				<Comments
					comments={comments}
					onDelete={deleteCommentHandler}
					onUpdate={updateCommentHandler}
				/>
			)}

			{page && comments.length !== 0 && (
				<Pagination
					curPage={curPage}
					setCurPage={setCurPage}
					totalPage={page.totalPages}
					totalCount={page.totalElements}
					size={page.size}
					pageCount={3}
				/>
			)}
			<UploadComment
				onAddComment={addCommentHandler}
				user={userProfile}
			/>
		</ContainerTag>
	);
};

export default DetailPost;

const ContainerTag = styled.div`
	padding: 0 2em;
	display: grid;
	row-gap: 1em;
	@media screen and (min-width: 1160px) {
		max-width: 1160px;
		margin: 0 auto;
	}
`;
