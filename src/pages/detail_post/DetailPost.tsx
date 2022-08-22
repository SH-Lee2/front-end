import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Comments from "../../components/comment/Comments";
import UploadComment from "../../components/comment/UploadComment";
import PostContent from "../../components/post_content/PostContent";
import { addComment, deleteComment, getComments } from "../../services/comment";
import authStore from "../../store/authStore";
import { CommentT } from "../../types/types";

const DETAILPOST = {
	artNo: 1,
	useNo: 1,
	artSubject: "공휴일",
	artContents: "# Hello, *world*!",
	artCreated: "22.08.16 01:35:35",
	artCategory: 1,
	regNo: "0101",
	artWSelect: 3,
};
interface CustomizedState {
	artNo: number
}

const DetailPost = () => {
	const { userProfile } = authStore();
	const [comments, setComments] = useState<CommentT[]>([])
	const location = useLocation()
	const {artNo} = location.state as CustomizedState

	const addCommentHandler = async(text:string) => {
		const res = await addComment(artNo, userProfile.no ,text )
		const newComment = res.data.data
		setComments(pre=> pre.length ? [newComment,...pre] : [newComment])
	}
	
	const deleteCommentHandler = async(repNo:number) => {
		await deleteComment(repNo)
		const updateComment = comments.filter(comment=> comment.repNo !== repNo)
		setComments(updateComment)
	}

	useEffect(()=>{
		const get = async()=>{
			const res = await getComments(artNo)
			setComments(res.data.data.list)
		}
		get()
	},[])

	return (
		<ContainerTag>
			<PostContent content={DETAILPOST}/>
			<Comments comments={comments} onDelete={deleteCommentHandler}/>
			<UploadComment onAddComment={addCommentHandler} user={userProfile}/>
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
