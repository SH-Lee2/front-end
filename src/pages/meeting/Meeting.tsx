import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CateHeader from "../../components/CateHeader";
import Pagination from "../../components/Pagination";
import { PageT } from "../../types/types";
import { getCategoryPosts } from "../../services/post";
import FreePosts from "../../components/free_posts/FreePosts";
import LoadingSpinner from "../../components/LoadingSpinner";
const Meeting = () => {
	const [region, setRegion] = useState<string>("");
	const [page, setPage] = useState<PageT>({});
	const [curPage, setCurPage] = useState(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [posts, setPosts] = useState<[]>([]);
	const getRegionHandler = (reg: string) => {
		setRegion(reg);
	};
	useEffect(() => {
		const getPosts = async () => {
			setIsLoading(true);
			const res = await getCategoryPosts(3, region, curPage-1);
			setPosts(res.data.data.list);
			setPage(res.data.data.pageable);
			setIsLoading(false);
		};
		getPosts();
	}, [region, curPage]);
	return (
		<ContainerTag>
			<CateHeader
				categoryNum={3}
				category="오늘의 모임"
				onGetRegionNumber={getRegionHandler}
			/>
			{isLoading ? (
					<LoadingSpinner />
			) : (
				<FreePosts posts={posts} path="/today_meeting" />
			)}

			{page && posts.length !== 0 && !isLoading &&(
				<Pagination
					curPage={curPage}
					setCurPage={setCurPage}
					totalPage={page.totalPages}
					totalCount={page.totalElements}
					size={page.size}
					pageCount={3}
				/>
			)}
		</ContainerTag>
	);
};

export default Meeting;

export const ContainerTag = styled.div`
	padding: 0 2em;
	width: 100%;
	@media screen and (min-width: 1160px) {
		max-width: 1160px;
		margin: 0 auto;
	}
`;
export const WrapperTag = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 2em;
	width: 100%;
`;
