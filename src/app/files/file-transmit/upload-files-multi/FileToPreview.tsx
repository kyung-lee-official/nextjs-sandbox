import { useState } from "react";
import { UnknownFileTypeIcon } from "./Icons";
import { Preview } from "./UploadFilesMulti";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/app/data-fetching/tanstack-query/queryClient";

export const FileToPreview = (props: { preview: Preview }) => {
	const { preview } = props;
	const { isImage, name } = preview;
	const [image, setImage] = useState<string>();

	const imageBlobQuery = useQuery({
		queryKey: ["get-image-blob", name],
		queryFn: async () => {
			const blob = await axios.get(
				`${process.env.NEXT_PUBLIC_NESTJS}/techniques/preview-image/${name}`,
				{
					responseType: "blob",
				}
			);
			setImage(URL.createObjectURL(blob.data));
		},
		retry: false,
		refetchOnWindowFocus: false,
	});

	async function onDelete() {
		await axios.delete(
			`${process.env.NEXT_PUBLIC_NESTJS}/techniques/delete-image/${name}`
		);
		queryClient.invalidateQueries({
			queryKey: ["get-preview"],
		});
	}

	if (isImage) {
		return (
			<div className="relative">
				<img
					src={image}
					alt={name}
					className={`object-cover w-full h-full`}
				/>
				<button
					className="absolute left-0 right-0 bottom-0 h-5
					flex justify-center items-center
					text-sm text-white
					bg-black/40"
					onClick={onDelete}
				>
					Delete
				</button>
			</div>
		);
	}
	return <UnknownFileTypeIcon size={100} />;
};
