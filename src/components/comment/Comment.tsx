import React, { useState } from "react";

import styled from "styled-components";
import authStore from "../../store/authStore";
import TextareaAutosize from "react-textarea-autosize";
import { UploadButtonTag } from "./UploadComment";
import { CommentT } from "../../types/types";
import Swal from "sweetalert2";
import EditModal from "../edit_modal/EditModal";

interface Props {
	comment: CommentT;
	onDelete: (repNo: number) => void;
	onUpdate: (repNo: number, comment: string) => void;
}

const Comment = ({ comment, onDelete, onUpdate }: Props) => {
	const { userProfile } = authStore();
	const [editMode, setEditMode] = useState<boolean>(false);
	const [enteredComment, setEnteredComment] = useState<string>(
		comment.repContents
	);

	const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEnteredComment(event.target.value);
	};

	const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		// api 호출
		setEditMode(false);
	};

	const deleteHandler = () => {
		// 삭제 api 호출
		onDelete(comment.repNo);
	};

	const editModeHandler = () => {
		setEditMode(true);
	};

	const updateHandler = () => {
		onUpdate(comment.repNo, enteredComment);
		setEditMode(false);
	};
	return (
		<CommentWrapperTag>
			<CommentBoxTag>
				<CommentHeaderTag>
					<div className="user_info">
						<div>
							<span className="nickname">{comment.useNick}</span>
							{userProfile?.no === comment?.useNo && (
								<span className="mine">내 댓글</span>
							)}
						</div>
						<span className="time">{comment.repCreated.slice(0,-3)}</span>
					</div>
					{userProfile?.nickname === comment.useNick && (
						<EditModal
							onDelete={deleteHandler}
							onEdit={editModeHandler}
							title="댓글"
						/>
					)}
				</CommentHeaderTag>
				<CommentTag>
					{!editMode && <p>{enteredComment}</p>}
					{editMode && (
						<form onSubmit={submitHandler}>
							<CommentTag>
								<TextareaAutosize
									autoFocus
									// 자동으로 커서위치를 끝으로 이동
									onFocus={(e) =>
										e.target.setSelectionRange(
											enteredComment.length,
											enteredComment.length
										)
									}
									value={enteredComment}
									onChange={onChange}
								/>
							</CommentTag>
							<UploadButtonTag>
								<button
									type="button"
									onClick={() => {
										setEditMode(false);
										setEnteredComment(comment.repContents);
									}}
								>
									취소
								</button>
								<button
									type="submit"
									disabled={
										enteredComment === comment.repContents
									}
									onClick={updateHandler}
								>
									등록
								</button>
							</UploadButtonTag>
						</form>
					)}
				</CommentTag>
			</CommentBoxTag>
		</CommentWrapperTag>
	);
};

export default Comment;

const CommentWrapperTag = styled.li`
	box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
		rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
	border-radius: 5px;
	padding: 0.5em;
	@media screen and (min-width: 780px) {
		padding: 1em;
	}
`;

const CommentBoxTag = styled.div`
	display: grid;
	row-gap: 1.25em;
`;
const CommentHeaderTag = styled.div`
	display: flex;
	align-items: center;
	.user_info {
		flex: 1;
		column-gap: 0.75em;
		display: flex;
		flex-direction: column;
		row-gap: 0.75em;
		.nickname {
			font-size: 0.8rem;
			margin-right: 0.5em;
		}
		.mine {
			font-size: 0.65rem;
			color: white;
			background-color: skyblue;
			border-radius: 5px;
			padding: 0.25em 0.5em;
		}
		.time {
			font-size: 0.7rem;
			color: gray;
		}
		@media screen and (min-width: 480px) {
			flex-direction: row;
			align-items: center;
		}
		@media screen and (min-width: 780px) {
			.nickname {
				font-size: 0.95rem;
			}
			.mine {
				font-size: 0.6rem;
			}
		}
	}
`;

const CommentTag = styled.div`
	flex: 1;
	p {
		font-size: 0.85rem;
		letter-spacing: 1.5px;
		white-space: pre-line;
	}
	textarea {
		width: 100%;
		height: 100%;
		font-size: 0.8rem;
		padding: 0.5em;
		border: none;
		border-bottom: 1px solid lightgray;
		resize: none;
		:focus {
			outline: none;
			border-bottom: 2px solid skyblue;
		}
	}
	@media screen and (min-width: 780px) {
		p {
			font-size: 0.95rem;
		}
		textarea {
			font-size: 1rem;
		}
	}
`;
