import jwtDecode from "jwt-decode";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useInput from "../hooks/use-input";
import {
	checkId,
	checkNickName,
	infoEdit,
	onLoginSuccess,
} from "../services/user";
import authStore from "../store/authStore";
import { Token } from "../types/types";
import { GenderTag, VaildCheckWrapperTag } from "./Join/Join";
import {
	ButtonTag,
	ContainerTag,
	ErrorTag,
	FormTag,
	InputWrapperTag,
} from "./login/Login";

const SnsLogin = () => {
	const { addUser } = authStore();
	const location = useLocation();
	const navigate = useNavigate();
	const [vaildCheckNickName, setVaildCheckNickName] = useState(false);
	const [gender, setGender] = useState<string>("0");

	const {
		value: enteredNickName,
		isValid: enteredNickNameIsValid,
		hasError: nickNameInputHasError,
		valueChangeHandler: nickNameChangedHandler,
		inputBlurHandler: nickNameBlurHandler,
	} = useInput((value) => value.trim() !== "" && value.length <= 6);

	let checkedNickName = "";

	const params = new URLSearchParams(location.search);
	const token = params.get("token");
	const { sub, useNo, role, useNick ,snsNick }: Token = jwtDecode(token);
	const addUserHandler = useCallback((nickname: string) => {
		addUser(
			{
				id: sub,
				type: role === "ROLE_USER" ? "USER" : "ADMIN",
				no: useNo,
				nickname: nickname,
				sns: true,
			},
			token
		);
		onLoginSuccess(token);
	}, []);

	const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		await infoEdit(useNo, enteredNickName, gender);
		addUserHandler(enteredNickName);
		navigate("/");
	};

	// 닉네밍 유무 체크 => 리다이렉션
	useEffect(() => {
		// 초기 가입 유저인지 판별
		if(snsNick !== 0) {
			addUserHandler(useNick);
			return navigate("/")
		}

	}, []);

	useEffect(() => {
		if (checkedNickName !== enteredNickName) {
			setVaildCheckNickName(false);
		}
	}, [checkedNickName, enteredNickName]);

	const vaildCheckHandler = async () => {
		const res = await checkNickName(enteredNickName);
		if (res.data === true) {
			setVaildCheckNickName(false);
			Swal.fire({
				position: "center",
				icon: "error",
				title: "중복된 닉네임 입니다.",
				confirmButtonText: "확인",
				confirmButtonColor: "skyblue",
			});
		} else {
			setVaildCheckNickName(true);
			checkedNickName = enteredNickName;
		}
	};

	const changeRadioBtnHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		event.preventDefault();
		setGender(event.target.value);
	};

	return (
		<>
			{snsNick === 0 && (
				<ContainerTag>
					<FormTag onSubmit={submitHandler}>
						<InputWrapperTag>
							<label htmlFor="nickname">닉네임</label>
							<VaildCheckWrapperTag>
								<input
									id="nickname"
									type="text"
									placeholder="닉네임을 입력해주세요."
									value={enteredNickName}
									onChange={nickNameChangedHandler}
									onBlur={nickNameBlurHandler}
									required
								/>
								<ButtonTag
									type="button"
									bgColor={
										vaildCheckNickName ? "skyblue" : "gray"
									}
									color="white"
									border={
										vaildCheckNickName ? "skyblue" : "none"
									}
									disabled={!enteredNickNameIsValid}
									onClick={() => vaildCheckHandler()}
								>
									<AiOutlineCheck />
								</ButtonTag>
							</VaildCheckWrapperTag>
							{nickNameInputHasError && (
								<ErrorTag>
									닉네임을 1 ~ 6자리 이하로 입력해주세요.
								</ErrorTag>
							)}
						</InputWrapperTag>
						<GenderTag>
							<label htmlFor="gender">성별</label>
							<div>
								<input
									type="radio"
									id="man"
									name="gender"
									value="1"
									onChange={changeRadioBtnHandler}
								/>
								<label htmlFor="man">남자</label>
							</div>

							<div>
								<input
									type="radio"
									id="girl"
									name="gender"
									value="2"
									onChange={changeRadioBtnHandler}
								/>
								<label htmlFor="girl">여자</label>
							</div>

							<div>
								<input
									type="radio"
									id="none"
									name="gender"
									value="0"
									onChange={changeRadioBtnHandler}
									checked
								/>
								<label htmlFor="none">선택안함</label>
							</div>
						</GenderTag>
						<ButtonTag
							color="white"
							bgColor="skyblue"
							type="submit"
							disabled={!vaildCheckNickName}
						>
							회원정보 설정
						</ButtonTag>
					</FormTag>
				</ContainerTag>
			)}
		</>
	);
};

export default SnsLogin;