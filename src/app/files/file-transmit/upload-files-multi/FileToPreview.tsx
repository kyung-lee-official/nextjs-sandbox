import { useState } from "react";
import { ImageIcon, UnknownFileTypeIcon } from "./Icons";
import { Preview } from "./UploadFilesMulti";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/app/data-fetching/tanstack-query/queryClient";
import { DeleteConfirmDialog } from "@/app/components/delete-confirmation/DeleteConfirmDialog";

export const FileToPreview = (props: { preview: Preview }) => {
	const { preview } = props;
	const { hasThumbnail, name } = preview;
	const [image, setImage] = useState<string>();
	const [showDelete, setShowDelete] = useState(false);

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
			return blob;
		},
		retry: false,
		refetchOnWindowFocus: false,
	});

	async function onDelete() {
		await axios.delete(
			`${process.env.NEXT_PUBLIC_NESTJS}/techniques/delete-file/${name}`
		);
		setShowDelete(false);
		queryClient.invalidateQueries({
			queryKey: ["get-preview"],
		});
	}

	return (
		<div
			className="relative
			rounded-md overflow-hidden"
		>
			{hasThumbnail ? (
				image ? (
					<img
						src={image}
						alt={name}
						title={name}
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
			<button
				className="absolute left-0 right-0 bottom-0 h-5
				flex justify-center items-center
				text-sm text-white
				bg-black/40"
				onClick={() => {
					setShowDelete(true);
				}}
			>
				Delete
			</button>
			<DeleteConfirmDialog
				show={showDelete}
				setShow={setShowDelete}
				question="Are you sure you want to delete this file?"
				onDelete={onDelete}
			/>
		</div>
	);
};
