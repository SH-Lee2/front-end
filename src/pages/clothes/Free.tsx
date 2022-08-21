import React, { useEffect, useState } from "react";
import CateHeader from "../../components/CateHeader";
import FreePosts from "../../components/free_posts/FreePosts";
import LoadingSpinner from "../../components/LoadingSpinner";
import Pagination from "../../components/Pagination";
import { getGategoryPosts } from "../../services/post";
import { PageT } from "../../types/types";
import { ContainerTag } from "../meeting/Meeting";

const Free = () => {
	const [region, setRegion] = useState<string>("");
	const [page, setPage] = useState<PageT>();
	const [curPage, setCurPage] = useState(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [posts, setPosts] = useState<[]>([]);
	const getRegionHandler = (reg: string) => {
		setRegion(reg);
	};

	useEffect(() => {
		const getPosts = async () => {
			setIsLoading(true);
			const res = await getGategoryPosts(1, region, curPage);
			setPosts(res.data.data.list);
			setPage(res.data.data.pageable);
			setIsLoading(false);
		};
		getPosts();
	}, [region, curPage]);
	return (
		<ContainerTag>
			<CateHeader
				categoryNum={1}
				category="오늘 뭐 입지?"
				onGetRegionNumber={getRegionHandler}
			/>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<FreePosts posts={posts} path="/today_meeting" />
			)}
			{page && posts.length !== 0 &&(
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

export default Free;
