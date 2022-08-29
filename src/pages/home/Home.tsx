import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FreePosts from "../../components/free_posts/FreePosts";
import { AiOutlineCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import ImagePosts from "../../components/image_posts/ImagePosts";
import { getCategoryPosts, getMainPosts } from "../../services/post";
import LoadingSpinner from "../../components/LoadingSpinner";
import Weather from "../../components/Weather";

const Home = () => {
	const [meetingPosts, setMeetingPosts] = useState<[]>([]);
	const [meetingIsLoading, setMeetingIsLoading] = useState<boolean>(false);
	const [freePosts, setfreePosts] = useState<[]>([]);
	const [freeIsLoading, setFreeIsLoading] = useState<boolean>(false);
	const [dailyPosts, setDailyPosts] = useState<[]>([]);
	const [dailyIsLoading, setDailyIsLoading] = useState<boolean>(false);
	const [skyPosts, setSkyPosts] = useState<[]>([]);
	const [skyIsLoading, setSkyIsLoading] = useState<boolean>(false);
	// 지도 지역
	const [region, setRegion] = useState<string>("01");

	const getRegion = (reg: string) => {
		setRegion(reg);
	};

	useEffect(() => {
		const getFreePosts = async () => {
			setFreeIsLoading(true);
			const res = await getCategoryPosts(1, region, 1, 6);
			setfreePosts(res.data.data.list);
			setFreeIsLoading(false);
		};
		getFreePosts();
	}, [region]);

	useEffect(() => {
		const getMeetingPosts = async () => {
			setMeetingIsLoading(true);
			const res = await getMainPosts(3, 6);
			setMeetingPosts(res.data.data.list);
			setMeetingIsLoading(false);
		};

		const getSkyPosts = async () => {
			setSkyIsLoading(true);
			const res = await getMainPosts(2, 4);
			setSkyPosts(res.data.data.list);
			setSkyIsLoading(false);
		};
		const getDailyPosts = async () => {
			setDailyIsLoading(true);
			const res = await getMainPosts(0, 4);
			setDailyPosts(res.data.data.list);
			setDailyIsLoading(false);
		};
		getMeetingPosts();
		getDailyPosts();
		getSkyPosts();
	}, []);

	return (
		<ContainerTag>
			<FreePostAndMapTag>
				<FreePostTag>
					<SectionHeaderTag>
						<SectionTitleTag>
							<h2>오늘 뭐 입지?</h2>
						</SectionTitleTag>
						<Link to="/today_clothes/free">
							<span className="more">
								더보기 <AiOutlineCaretRight />
							</span>
						</Link>
					</SectionHeaderTag>
					{freeIsLoading ? (
						<LoadingSpinner />
					) : (
						<FreePosts
							posts={freePosts}
							path="/today_clothes/free"
						/>
					)}
				</FreePostTag>
				<MapTag>
					<SectionHeaderTag>
						<SectionTitleTag>
							<h2>지도</h2>
						</SectionTitleTag>
					</SectionHeaderTag>
					<Weather onGetRegion={getRegion}/>
				</MapTag>
			</FreePostAndMapTag>

			{/* 오늘의 옷 - 데일리 룩 */}
			<SectionTag>
				<SectionHeaderTag>
					<SectionTitleTag>
						<h2>데일리 룩</h2>
					</SectionTitleTag>
					<Link to="/today_clothes/dailylook">
						<span className="more">
							더보기 <AiOutlineCaretRight />
						</span>
					</Link>
				</SectionHeaderTag>
				{dailyIsLoading ? (
					<LoadingSpinner />
				) : (
					<ImagePosts
						posts={dailyPosts}
						path="/today_clothes/dailylook"
					/>
				)}
			</SectionTag>
			{/* 오늘의 하늘 */}
			<SectionTag>
				<SectionHeaderTag>
					<SectionTitleTag>
						<h2>오늘의 하늘</h2>
					</SectionTitleTag>
					<Link to="/today_sky">
						<span className="more">
							더보기 <AiOutlineCaretRight />
						</span>
					</Link>
				</SectionHeaderTag>
				{skyIsLoading ? (
					<LoadingSpinner />
				) : (
					<ImagePosts posts={skyPosts} path="/today_sky" />
				)}
			</SectionTag>
			{/* 오늘의 모임 */}
			<SectionTag>
				<SectionHeaderTag>
					<SectionTitleTag>
						<h2>오늘의 모임</h2>
					</SectionTitleTag>
					<Link to="/today_meeting">
						<span className="more">
							더보기 <AiOutlineCaretRight />
						</span>
					</Link>
				</SectionHeaderTag>
				{meetingIsLoading ? (
					<LoadingSpinner />
				) : (
					<FreePosts posts={meetingPosts} path="/today_meeting" />
				)}
			</SectionTag>
		</ContainerTag>
	);
};

export default Home;

const ContainerTag = styled.div`
	padding: 0 2em;
	display: grid;
	row-gap: 5em;
	@media screen and (min-width: 1160px) {
		max-width: 1160px;
		margin: 0 auto;
	}
`;

// 지도 때문에 고정 height 필요할듯?
const FreePostAndMapTag = styled.section`
	display: flex;
	flex-direction: column-reverse;
	min-height: 490px;
	row-gap: 2em;
	height: 100%;
	@media screen and (min-width: 1023px) {
		flex-direction: row;
		column-gap: 2em;
		row-gap: 0;
	}
`;
const FreePostTag = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 50%;
	height: 100%;
	position: relative;
`;

const MapTag = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 50%;
	height: 100%;

`;

const SectionHeaderTag = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1rem;
	margin-bottom: 1em;
	.more {
		color: skyblue;
		display: flex;
		align-items: center;
		cursor: pointer;
		font-size: 0.7rem;
	}
	@media screen and (min-width: 400px) {
		.more {
			font-size: 0.8rem;
		}
	}

	@media screen and (min-width: 875px) {
		.more {
			font-size: 1rem;
		}
	}
`;

const SectionTitleTag = styled.div`
	color: #000;
	font-size: 1rem;
	font-weight: 800;
	letter-spacing: 1px;
	@media screen and (min-width: 400px) {
		font-size: 1.2rem;
	}
	@media screen and (min-width: 875px) {
		font-size: 1.4rem;
	}
`;

const SectionTag = styled.section`
	min-height: 150px;
	height: max-content;
`;
