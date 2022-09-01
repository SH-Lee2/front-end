import axios from "axios";
import { BASE_URL } from "../utils/proxy";

// 댓글 추가
export const addComment = async (
	artNo: number,
	useNo: number,
	repContents: string
) => {
	const res = await axios.post(`${BASE_URL}/article/reply`, {
		artNo,
		useNo,
		repContents,
	});
	return res;
};

// 댓글 삭제
export const deleteComment = async (repNo: number) => {
	await axios.delete(`${BASE_URL}/article/reply/${repNo}`);
};

// 댓글 수정
export const updateComment = async (repNo: number, updateComment: string) => {
	await axios.put(`${BASE_URL}/article/reply/${repNo}`, {
		repContents: updateComment,
	});
};

// 댓글 목록 조회
export const getComments = async (artNo: number,page:number) => {
	const res = await axios.get(`${BASE_URL}/article/replylist/${artNo}`, {
		params: { page },
	});
	return res;
};
