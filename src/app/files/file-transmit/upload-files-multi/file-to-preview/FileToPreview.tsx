import { useState } from "react";
import { Preview } from "../UploadFiles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/app/data-fetching/tanstack-query/queryClient";
import { Item } from "@/app/files/file-transmit/upload-files-multi/Item";
import { getFileBlob, UploadFilesQK } from "../api";

export const FileToPreview = (props: { preview: Preview }) => {
	const { preview } = props;
	const { name } = preview;
	const [url, setUrl] = useState<string>();

	const fileBlobQuery = useQuery({
		queryKey: [UploadFilesQK.GET_FILE_BLOB, name],
		queryFn: async () => {
			const blob = await getFileBlob(name);
			setUrl(URL.createObjectURL(blob));
			return blob;
		},
		retry: false,
		refetchOnWindowFocus: false,
	});

	async function onDelete() {
		await axios.delete(
			`${process.env.NEXT_PUBLIC_NESTJS}/techniques/delete-file/${name}`
		);
		queryClient.invalidateQueries({
			queryKey: [UploadFilesQK.GET_PREVIEW_FILELIST],
		});
	}

	return (
		<Item
			isLoading={fileBlobQuery.isPending || !url}
			name={name}
			src={url}
			question="Are you sure you want to delete this file?"
			onDelete={onDelete}
		/>
	);
};
