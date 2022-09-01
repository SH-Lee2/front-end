import axios from "axios";
import { BASE_URL } from "../utils/proxy";

interface Props {
	artNo?:number;
	useNo?: number;
	enteredTitle: string;
	enteredWrite: string;
	categoryNum?: number;
	selectedRegion: string;
	selectedWeather: number;
	uploadImg: string[];
	multipartFiles : string [];
}

export const postUpload = async ({
	useNo,
	enteredTitle,
	enteredWrite,
	categoryNum,
	selectedRegion,
	selectedWeather,
	uploadImg, //  이미지 업로드 할때 받은 경로
	multipartFiles, // 컨테츠에서 뽑은 이미지 경로
}: Props) => {
	const form = new FormData();
	const deleteFiles = uploadImg?.filter(path => !multipartFiles?.includes(path))
	const updateWrite = enteredWrite.replaceAll("temporary", "images")
	multipartFiles?.forEach(path=>{
		form.append("multipartFiles",`{"imgPath" : "${path}"}`)
	})
	deleteFiles?.forEach(path=>{
		form.append("deleteFiles",`{"imgPath" : "${path}"}`)
	})
	form.append(
		"articles",
		`{"useNo":${useNo}, "artSubject": "${enteredTitle}","artContents": "${updateWrite}","artCategory":  "${categoryNum}","regNo": "${selectedRegion}","artWSelect" : ${selectedWeather}}`
	);
	const res = await axios.post(`${BASE_URL}/article/post`, form);
	return res;
};

//  메인 페이지 게시물
export const getMainPosts = async (categoryNum: number, size: number) => {
	try {
		const res = await axios.get(`${BASE_URL}/article/category/${categoryNum}`, {
			params: { size },
		});
		return res;
	} catch (error: any) {
		return error.response;
	}
};

//  페이지별 게시물
export const getCategoryPosts = async (
	categoryNum: number,
	regNo: string,
	page: number,
	size?:number
) => {
	try {
		const res = await axios.get(`${BASE_URL}/article/list/${categoryNum}`, {
			params: { page, regNo, size},
		});
		return res;
	} catch (error: any) {
		return error.response;
	}
};

// 상세 페이지
export const getDetailPost = async (artNo: number) => {
	try {
		const res = await axios.get(`${BASE_URL}/article/${artNo}`);
		return res;
	} catch (error: any) {
		return error.response;
	}
};

//  게시물 삭제

export const deletePost = async(artNo:number)=>{
	await axios.delete(`${BASE_URL}/article/${artNo}`)
}

//  게시물 수정
export const postUpdate = async ({
	useNo,
	artNo,
	enteredTitle,
	enteredWrite,
	categoryNum,
	selectedRegion,
	selectedWeather,
	uploadImg,
	multipartFiles
}: Props) => {
	const form = new FormData();
	const deleteFiles = uploadImg?.filter(path => !multipartFiles?.includes(path))
	const updateWrite = enteredWrite.replaceAll("temporary", "images")
	uploadImg?.forEach(path=>{
		form.append("multipartFiles",`{"imgPath" : "${path}"}`)
	})
	deleteFiles?.forEach(path=>{
		form.append("deleteFiles",`{"imgPath" : "${path}"}`)
	})
	form.append(
		"articles",
		`{"useNo":${useNo}, "artSubject": "${enteredTitle}","artContents": "${updateWrite}","artCategory":  "${categoryNum}","regNo": "${selectedRegion}","artWSelect" : ${selectedWeather}}`
	);
	const res = await axios.put(`${BASE_URL}/article/${artNo}`, form);
	return res;
};

//  게시물 사진
export const uploadImage = async (image: any) => {
	const form = new FormData();
	form.append("multipartFiles", image);
	const res = await axios.post(`${BASE_URL}/article/upload`, form);
	return res.data.data[0];
};
