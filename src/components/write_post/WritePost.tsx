import React, { useRef } from "react";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

// color
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

// font-size
import fontSize from "tui-editor-plugin-font-size";
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css";

import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import styled from "styled-components";

import { uploadImage } from "../../services/post";
import { Post } from "../../types/types";
import Swal from "sweetalert2";

interface Props {
	onGetHtml: (html: string) => void;
	onGetImageArr: (image: string) => void;
	post: Post;
}

const WritePost = ({ onGetHtml, onGetImageArr, post }: Props) => {
	const editRef = useRef<Editor>(null);
	const onChangeHandler = () => {
		onGetHtml(editRef.current?.getInstance().getHTML());
	};

	const onUploadImage = async (blob: any, callback: any) => {
		if (blob.size > 10000000) {
			Swal.fire({
				position: "center",
				icon: "warning",
				title: "사진의 용량이 너무 큽니다.",
				text: "10MB 이하의 사진만 업로드해주세요.",
				confirmButtonText: "확인",
				confirmButtonColor: "skyblue",
			});
		} else {
			const url = await uploadImage(blob);
			onGetImageArr(url);
			callback(url, "");
		}
	};

	const plugins = [colorSyntax, fontSize];
	// code , codeblock, table 제외 , link 는 wysiwyg에서 에러 보류
	const toolbarItems = [
		["heading", "bold", "italic", "strike"],
		["hr", "quote"],
		["ul", "ol", "task", "indent", "outdent"],
		["image"],
	];
	return (
		<EditorWrapperTag>
			<Editor
				ref={editRef}
				placeholder="내용을 입력해주세요."
				initialValue={post?.artContents ? post?.artContents : " "}
				previewStyle="vertical"
				height="400px"
				initialEditType="wysiwyg"
				useCommandShortcut={true}
				onChange={onChangeHandler}
				plugins={plugins}
				toolbarItems={toolbarItems}
				hooks={{
					addImageBlobHook: onUploadImage,
				}}
			/>
		</EditorWrapperTag>
	);
};

export default WritePost;

const EditorWrapperTag = styled.div`
	display: flex;
	flex-direction: column;
	// dropdown button css
	@media only screen and (max-width: 480px) {
		.toastui-editor-dropdown-toolbar {
			max-width: none;
			flex-wrap: wrap;
			height: fit-content;
		}
		// 모바일 화면 대응
		.toastui-editor-popup {
			transform: translateX(53%);
		}
	}
`;
