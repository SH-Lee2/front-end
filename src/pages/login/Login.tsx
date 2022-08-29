import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import useInput from "../../hooks/use-input";
import Swal from "sweetalert2";
import { login } from "../../services/user";
import authStore from "../../store/authStore";
const Login = () => {
	const { addUser } = authStore();
	const {
		value: enteredId,
		isValid: enteredIdIsValid,
		valueChangeHandler: idChangedHandler,
		inputBlurHandler: idBlurHandler,
		reset: resetIdInput,
	} = useInput((value) => value.trim() !== "" && value.length >= 5);

	const {
		value: enteredPassword,
		isValid: enteredPasswordIsValid,
		valueChangeHandler: passwordChangedHandler,
		inputBlurHandler: passwordBlurHandler,
		reset: resetPasswordInput,
	} = useInput((value) => value.trim() !== "" && value.length >= 6);

	const loginHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const res = await login(
			{
				useId: enteredId,
				usePw: enteredPassword,
			},
			addUser
		);
		if (res.data?.header.code !== 200) {
			Swal.fire({
				position: "center",
				icon: "warning",
				title: "로그인 실패!",
				timer: 1500,
				confirmButtonText: "확인",
				confirmButtonColor: "skyblue",
			});
			resetIdInput();
			resetPasswordInput();
		}
	};

	let formValid = false;
	if (enteredIdIsValid && enteredPasswordIsValid) formValid = true;

	return (
		<ContainerTag>
			<WrapperTag>
				<h2>로그인</h2>
				<FormWrapperTag>
					<FormTag onSubmit={loginHandler}>
						<InputWrapperTag>
							<input
								type="text"
								placeholder="아이디 입력"
								value={enteredId}
								onChange={idChangedHandler}
								onBlur={idBlurHandler}
								required
								autoFocus
							/>
							<input
								type="password"
								placeholder="비밀번호 입력"
								value={enteredPassword}
								onChange={passwordChangedHandler}
								onBlur={passwordBlurHandler}
								required
							/>
						</InputWrapperTag>

						<div className="loginAndJoin">
							<ButtonTag
								type="submit"
								bgColor="skyblue"
								color="white"
								disabled={!formValid}
							>
								로그인
							</ButtonTag>
							<ButtonTag
								type="button"
								bgColor="white"
								color="skyblue"
								border="skyblue"
							>
								<Link to="/join">회원 가입</Link>
							</ButtonTag>
						</div>
						<div className="find">
							<Link to="/find/id">아이디 찾기</Link>
							<div className="divider">
								<span>|</span>
							</div>
							<Link to="/find/password">비밀번호 찾기</Link>
						</div>
						<div className="sns">
							<ButtonTag
								type="button"
								bgColor="yellow"
								shadow={true}
							>
								<a href="http://springbootlookoutside-env.eba-khrbrhmx.us-west-1.elasticbeanstalk.com/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth/redirect">
									<RiKakaoTalkFill />
									카카오 로그인
								</a>
							</ButtonTag>
							<ButtonTag
								type="button"
								bgColor="white"
								shadow={true}
							>
								<a href="http://springbootlookoutside-env.eba-khrbrhmx.us-west-1.elasticbeanstalk.com/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth/redirect">
									<FcGoogle />
									구글 로그인
								</a>
							</ButtonTag>
							<ButtonTag
								type="button"
								bgColor="#19ce60"
								color="#fff"
								shadow={true}
							>
								<a href="http://springbootlookoutside-env.eba-khrbrhmx.us-west-1.elasticbeanstalk.com/oauth2/authorization/naver?redirect_uri=http://localhost:3000/oauth/redirect">
									<SiNaver />
									네이버 로그인
								</a>
							</ButtonTag>
						</div>
					</FormTag>
				</FormWrapperTag>
			</WrapperTag>
		</ContainerTag>
	);
};

export default Login;

export const ContainerTag = styled.div`
	padding: 0 2em;
	width: 100%;
	@media screen and (min-width: 500px) {
		max-width: 500px;
		margin: 0 auto;
	}
`;

export const WrapperTag = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	h2 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1.5em;
		color: skyblue;
	}
	@media screen and (min-width: 372px) {
		h2 {
			font-size: 2rem;
		}
	}
`;

export const FormWrapperTag = styled.div`
	width: 100%;
	display: grid;
	row-gap: 1em;
`;

export const FormTag = styled.form`
	display: flex;
	flex-direction: column;
	row-gap: 1.5em;

	width: 100%;
	.loginAndJoin {
		display: flex;
		flex-direction: column;
		row-gap: 0.5em;
		width: 100%;
	}
	.find {
		display: flex;
		column-gap: 0.5em;
		justify-content: center;
		font-size: 0.8rem;
		a,
		span {
			color: gray;
		}
	}
	.sns {
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 1em;
		width: 100%;
		font-size: 0.8rem;
	}
	@media screen and (min-width: 372px) {
		.find,
		.sns {
			font-size: 1rem;
		}
	}
`;

export const InputWrapperTag = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 0.5em;
	width: 100%;
	input {
		width: 100%;
		padding: 0.5em;
		font-size: 1rem;
		letter-spacing: 1px;
		border: 1px solid lightgray;
		border-radius: 5px;
		:focus {
			outline: none;
			border: 2px solid skyblue;
		}
		::placeholder {
			font-size: 0.7rem;
		}
	}
	@media screen and (min-width: 372px) {
		input {
			font-size: 1.2rem;
			::placeholder {
				font-size: 1rem;
			}
		}
	}
`;

export const ErrorTag = styled.span`
	color: red;
	font-size: 0.8rem;
	padding: 0.5em;
`;

interface ButtonProps {
	bgColor: string;
	color?: string;
	border?: string;
	shadow?: boolean;
}

export const ButtonTag = styled.button<ButtonProps>`
	width: 100%;
	border: none;
	cursor: pointer;
	background-color: ${({ bgColor }) => bgColor};
	color: ${({ color }) => (color ? color : "black")};
	border: ${({ border }) => (border ? `1px solid ${border}` : "none")};
	padding: 1em;
	border-radius: 5px;
	transition: all 0.5s;
	column-gap: 1em;
	box-shadow: ${({ shadow }) =>
		shadow
			? "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
			: ""};
	a {
		color: ${({ color }) => (color ? color : "black")};
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		column-gap: 1em;
	}
	svg {
		font-size: 1.5rem;
	}
	:disabled {
		background-color: gray;
	}
	@media screen and (min-width: 372px) {
		font-size: 1rem;
	}
`;
