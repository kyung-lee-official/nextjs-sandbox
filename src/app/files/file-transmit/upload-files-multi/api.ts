import axios from "axios";

export enum UploadFilesQK {
	GET_PREVIEW_FILELIST = "get-preview-filelist",
	GET_FILE_BLOB = "get-file-blob",
}

export const getAttachmentListByEventId = async () => {
	const res = await axios.get<any>("/techniques/preview-filelist", {
		baseURL: process.env.NEXT_PUBLIC_NESTJS,
	});
	return res.data;
};

export const getFileBlob = async (name: string) => {
	const blob = await axios.get(`/techniques/preview-image/${name}`, {
		baseURL: process.env.NEXT_PUBLIC_NESTJS,
		responseType: "blob",
	});
	return blob;
};
