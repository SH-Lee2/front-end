import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";

import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
	return (
		<>
			<Header />
			<Sidebar />
			<Main>
				<Outlet />
			</Main>
			<Footer />
		</>
	);
};

export default Layout;

// 나중에 설정? 공통부분

const Main = styled.main`
	flex: 1;
	margin-bottom: 50px;
`;
