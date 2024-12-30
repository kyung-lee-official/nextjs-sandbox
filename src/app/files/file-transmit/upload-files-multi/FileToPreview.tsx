import { useState } from "react";
import { ImageIcon, UnknownFileTypeIcon } from "./Icons";
import { Preview } from "./UploadFilesMulti";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/app/data-fetching/tanstack-query/queryClient";
import { MediaType, Zoomable } from "@/app/styles/basic/zoomable/Zoomable";

export const FileToPreview = (props: { preview: Preview }) => {
	const { preview } = props;
	const { name, hasThumbnail } = preview;
	const type = name.split(".").pop() as MediaType;
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
			{hasThumbnail ? (
				url ? (
					<Zoomable
						mode="upload"
						filetype={type}
						src={url}
						alt={name}
						title={name}
						question="Are you sure you want to delete this file?"
						onDelete={onDelete}
						className={`object-cover w-full h-full`}
					/>
				) : (
					<div
						className="w-full h-full p-8
						bg-black/20
						animate-pulse
						text-black/50"
					>
						<ImageIcon />
					</div>
				)
			) : (
				<UnknownFileTypeIcon title={name} size={100} />
			)}
		</div>
	);
};
