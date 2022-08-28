import axios from "axios";
interface Props {
	artNo?:number;
	useNo?: number;
	enteredTitle: string;
	enteredWrite: string;
	categoryNum?: number;
	selectedRegion: string;
	selectedWeather: number;
	uploadImg: string[];
}

export const postUpload = async ({
	useNo,
	enteredTitle,
	enteredWrite,
	categoryNum,
	selectedRegion,
	selectedWeather,
	uploadImg,
}: Props) => {
	const form = new FormData();
	uploadImg.forEach(path=>{
		form.append("multipartFiles",`{"imgPath" : "${path}"}`)
	})
	form.append(
		"articles",
		`{"useNo":${useNo}, "artSubject": "${enteredTitle}","artContents": "${enteredWrite}","artCategory":  "${categoryNum}","regNo": "${selectedRegion}","artWSelect" : ${selectedWeather}}`
	);
	const res = await axios.post("/article/post", form);
	return res;
};

//  메인 페이지 게시물
export const getMainPosts = async (categoryNum: number, size: number) => {
	try {
		const res = await axios.get(`/article/category/${categoryNum}`, {
			params: { size },
		});
		return res;
	} catch (error: any) {
		return error.response;
	}
};

//  페이지별 게시물
export const getGategoryPosts = async (
	categoryNum: number,
	region: string,
	page: number
) => {
	try {
		const res = await axios.get(`/article/list/${categoryNum}`, {
			params: { page, regNo: region },
		});
		return res;
	} catch (error: any) {
		return error.response;
	}
};

// 상세 페이지
export const getDetailPost = async (artNo: number) => {
	try {
		const res = await axios.get(`/article/${artNo}`);
		return res;
	} catch (error: any) {
		return error.response;
	}
};

//  게시물 삭제

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
}: Props) => {
	const form = new FormData();
	uploadImg?.forEach(path=>{
		form.append("multipartFiles",`{"imgPath" : "${path}"}`)
	})
	form.append(
		"articles",
		`{"useNo":${useNo}, "artSubject": "${enteredTitle}","artContents": "${enteredWrite}","artCategory":  "${categoryNum}","regNo": "${selectedRegion}","artWSelect" : ${selectedWeather}}`
	);
	const res = await axios.put(`/article/${artNo}`, form);
	return res;
};

//  게시물 사진
export const uploadImage = async (image: any) => {
	const form = new FormData();
	form.append("multipartFiles", image);
	const res = await axios.post(`/article/upload`, form);
	return res.data.data[0];
};
