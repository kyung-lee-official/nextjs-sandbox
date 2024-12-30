import { useState } from "react";
import { ItemLoading } from "./Icons";
import { Preview } from "./UploadFiles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/app/data-fetching/tanstack-query/queryClient";
import { Item } from "@/app/files/file-transmit/upload-files-multi/Item";

export const FileToPreview = (props: { preview: Preview }) => {
	const { preview } = props;
	const { name } = preview;
	const [url, setUrl] = useState<string>();

	const fileBlobQuery = useQuery({
		queryKey: ["get-file-blob", name],
		queryFn: async () => {
			const blob = await axios.get(
				`${process.env.NEXT_PUBLIC_NESTJS}/techniques/preview-image/${name}`,
				{
					responseType: "blob",
				}
			);
			setUrl(URL.createObjectURL(blob.data));
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
			queryKey: ["get-preview"],
		});
	}

	return (
		<div>
			{fileBlobQuery.isPending ? (
				<ItemLoading />
			) : (
				<Item
					name={name}
					src={url}
					question="Are you sure you want to delete this file?"
					onDelete={onDelete}
					className={`object-cover w-full h-full`}
				/>
			)}
		</div>
	);
};
