import React, { useState } from "react";
import styled from "styled-components";
import { ContainerTag } from "../meeting/Meeting";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import WritePost from "../../components/write_post/WritePost";
import SelectRezion from "../../components/select_region/SelectRegion";
import { WrapperTag } from "../../components/CateHeader";
import SelectWeather from "../../components/select_weather/SelectWeather";
import authStore from "../../store/authStore";
import { postUpload } from "../../services/post";
import { escape } from "html-escaper";
import { Post } from "../../types/types";
interface State {
	category: string;
	categoryNum: number;
	post: Post;
}

const UploadPost = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { category, categoryNum, post } = location.state as State;
	const [selectedRegion, setSelectedRegion] = useState<string>("01");

	const [selectedWeather, setSelectedWeather] = useState<number>(
		post?.artWSelect > -1 ? post?.artWSelect : 0
	);
	const [enteredTitle, setEnteredTitle] = useState<string>(
		post?.artSubject ? post?.artSubject : ""
	);
	const [enteredWrite, setEnteredWrite] = useState<string>("");
	const [uploadImg, setUploadImg] = useState<string[]>([]);
	const { userProfile } = authStore();

	const getRegionNumberHandler = (region: string) => {
		setSelectedRegion(region);
	};
	const getWeatherHandler = (weather: number) => {
		setSelectedWeather(weather);
	};
	const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredTitle(event.target.value);
	};
	const getHtmlHandler = (html: string) => {
		setEnteredWrite(html);
	};

	const getImageArr = (image: string) => {
		setUploadImg((pre) => [...pre, image]);
	};

	const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		Swal.fire({
			position: "center",
			icon: "question",
			title: "게시물을 작성 하시겟습니까?",
			// timer: 1500,
			confirmButtonText: "확인",
			confirmButtonColor: "skyblue",
			showCancelButton: true,
			cancelButtonText: "취소",
			cancelButtonColor: "red",
		}).then(async (result) => {
			if (result.isConfirmed) {
				await postUpload({
					selectedRegion,
					selectedWeather,
					categoryNum,
					enteredTitle,
					enteredWrite: escape(enteredWrite),
					useNo: userProfile.no,
					uploadImg,
				});
				navigate(-1);
			} else {
				Swal.close();
			}
		});
	};

	return (
		<ContainerTag>
			<WrapperTag>
				<PageHeaderTag>
					{post ? (
						<h2>게시물 수정</h2>
					) : (
						<h2>카테고리 - {category}</h2>
					)}
				</PageHeaderTag>
				<SelectRezion onGetRegionNumber={getRegionNumberHandler} />
				<FormTag onSubmit={submitHandler}>
					<InputWrapperTag>
						<div>
							<p>날씨</p>
						</div>
						<SelectWeather
							onGetWeather={getWeatherHandler}
							selectedWeather={selectedWeather}
						/>
					</InputWrapperTag>
					<InputWrapperTag>
						<label htmlFor="title">제목</label>
						<input
							type="text"
							id="title"
							placeholder="제목을 입력해주세요."
							onChange={changeTitleHandler}
							value={enteredTitle}
							required
						/>
					</InputWrapperTag>
					<WritePost
						onGetHtml={getHtmlHandler}
						onGetImageArr={getImageArr}
						post={post}
					/>
					<ButtonWrapperTag>
						<button type="button" onClick={() => navigate(-1)}>
							취소
						</button>
						<button type="submit" disabled={!enteredTitle}>
							{post ? "수정" : "저장"}
						</button>
					</ButtonWrapperTag>
				</FormTag>
			</WrapperTag>
		</ContainerTag>
	);
};

export default UploadPost;

const PageHeaderTag = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	h2 {
		font-size: 1.2rem;
		letter-spacing: 1.5px;
	}
`;

const FormTag = styled.form`
	display: flex;
	flex-direction: column;
	row-gap: 1.5em;
	width: 100%;
	p {
		font-size: 1.2rem;
	}
	label {
		font-size: 1.2rem;
	}
	input,
	textarea {
		width: 100%;
		flex: 2;
		padding: 0.5em;
		:focus {
			outline-color: skyblue;
		}
	}
	textarea {
		resize: none;
		height: 200px;
	}
`;

const InputWrapperTag = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 0.5em;

	@media screen and (min-width: 460px) {
		flex-direction: row;
		align-items: center;

		column-gap: 2em;
	}
`;

const ButtonWrapperTag = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	row-gap: 0.5em;

	button {
		padding: 0.5em 1em;
		color: white;
		border: none;
		border-radius: 5px;
		background-color: skyblue;
		width: 100%;
		cursor: pointer;
		:disabled {
			background-color: gray;
		}
	}

	@media screen and (min-width: 420px) {
		flex-direction: row;
		column-gap: 1em;
		button {
			width: max-content;
		}
	}
`;
