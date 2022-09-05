import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getRegion } from "../../services/region";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useLocation } from "react-router-dom";

const ADDR1 = [
	{
		key: "01",
		value: "서울특별시",
	},
	{
		key: "02",
		value: "부산광역시",
	},
	{
		key: "03",
		value: "대구광역시",
	},
	{
		key: "04",
		value: "인천광역시",
	},
	{
		key: "05",
		value: "광주광역시",
	},
	{
		key: "06",
		value: "대전광역시",
	},
	{
		key: "07",
		value: "울산광역시",
	},
	{
		key: "08",
		value: "세종특별자치시",
	},
	{
		key: "09",
		value: "경기도",
	},
	{
		key: "10",
		value: "강원도",
	},
	{
		key: "11",
		value: "충청북도",
	},
	{
		key: "12",
		value: "충청남도",
	},
	{
		key: "13",
		value: "전라북도",
	},
	{
		key: "14",
		value: "전라남도",
	},
	{
		key: "15",
		value: "경상북도",
	},
	{
		key: "16",
		value: "경상남도",
	},
	{
		key: "17",
		value: "제주도",
	},
];

interface Props {
	onGetRegionNumber: (region: string) => void;
}

const SelectRezion = ({ onGetRegionNumber }: Props) => {
	const { pathname } = useLocation();
	const [selectedAddr1Num, setSelectedAddr1Num] = useState<string>(
		pathname === "/upload_post" ? "01" : "00"
	);
	const [selectedAddr1, setSelectedAddr1] = useState<string>(
		pathname === "/upload_post" ? "서울특별시" : "전체"
	);
	const [openAddr1, setOpenAddr1] = useState<boolean>(false);
	const [selectedAddr2, setSelectedAddr2] = useState<string>("전체");
	const [openAddr2, setOpenAddr2] = useState<boolean>(false);
	const [addr2, setAddr2] = useState<[]>([]);
	const selectRef = useRef<any>(null);
	useEffect(() => {
		const region = async () => {
			if (selectedAddr1Num !== "00") {
				const res = await getRegion(selectedAddr1Num);
				setAddr2(res.data.data);
			}
			setSelectedAddr2("전체");
			onGetRegionNumber(
				selectedAddr1Num === "00" ? "" : selectedAddr1Num
			);
		};
		region();
	}, [selectedAddr1Num]);

	// ref 설정 외부 클릭 감지
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setOpenAddr1(false);
				setOpenAddr2(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	});

	return (
		<SelectWrapperTag ref={selectRef}>
			<DropdownTag onClick={() => setOpenAddr1((pre) => !pre)}>
				<SelectedTag>
					<span>{selectedAddr1}</span>
					<div>
						{openAddr1 ? <MdArrowDropUp /> : <MdArrowDropDown />}
					</div>
				</SelectedTag>
				{openAddr1 && (
					<OptionTag>
						<ul>
							{pathname !== "/upload_post" && (
								<li
									onClick={() => {
										setSelectedAddr1Num("00");
										setSelectedAddr1("전체");
									}}
								>
									전체
								</li>
							)}
							{ADDR1.map(({ key, value }) => (
								<li
									key={key}
									onClick={() => {
										setSelectedAddr1Num(key);
										setSelectedAddr1(value);
									}}
								>
									{value}
								</li>
							))}
						</ul>
					</OptionTag>
				)}
			</DropdownTag>
			{selectedAddr1Num !== "00" && (
				<DropdownTag onClick={() => setOpenAddr2((pre) => !pre)}>
					<SelectedTag>
						<span>{!selectedAddr2 ? "전체" : selectedAddr2}</span>
						<div>
							{openAddr2 ? (
								<MdArrowDropUp />
							) : (
								<MdArrowDropDown />
							)}
						</div>
					</SelectedTag>
					{openAddr2 && (
						<OptionTag>
							<ul>
								{addr2.map(({ regNo, regAddr2 }) => (
									<li
										key={regNo}
										onClick={() => {
											onGetRegionNumber(regNo);
											setSelectedAddr2(regAddr2);
										}}
									>
										{!regAddr2 ? "전체" : regAddr2}
									</li>
								))}
							</ul>
						</OptionTag>
					)}
				</DropdownTag>
			)}
		</SelectWrapperTag>
	);
};

export default SelectRezion;

const SelectWrapperTag = styled.div`
	width: 100%;
	display: flex;
	column-gap: 1em;
`;

const DropdownTag = styled.div`
	width: 200px;
	height: 50px;
	position: relative;
`;

const SelectedTag = styled.div`
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
		rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	cursor: pointer;
	background-color: white;
	border: none;
	outline: none;
	padding: 0.5em 1em;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 0.9rem;
`;
const OptionTag = styled.div`
	position: absolute;
	top: 60px;
	left: 0;
	width: 100%;
	min-height: max-content;
	max-height: 250px;
	background-color: white;
	border-radius: 5px;
	overflow-y: scroll;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
		rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	z-index: 9999;
	ul {
		li {
			padding: 1em;
			cursor: pointer;
			font-size: 0.9rem;

			:hover {
				background-color: skyblue;
				color: white;
			}
		}
	}
	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-track {
		background-color: white;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	::-webkit-scrollbar-thumb {
		background-color: skyblue;
		height: 10%;
		border-radius: 10px;
	}
`;
