import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UnknownFileTypeIcon } from "./Icons";
import { queryClient } from "@/app/data-fetching/tanstack-query/queryClient";
import { isImageType, isVideoType } from "./types";

export const FileToUpload = (props: {
	file: File;
	uploadList: File[];
	setUploadList: Dispatch<SetStateAction<File[]>>;
}) => {
	const { file, uploadList, setUploadList } = props;
	const filetype = file.name.split(".").pop() as string;

	const [url, setUrl] = useState<string>();
	const [progress, setProgress] = useState(0);

	const mutation = useMutation({
		mutationFn: async () => {
			const data = new FormData();
			data.append("file", file);
			const res = await axios.put(
				`${process.env.NEXT_PUBLIC_NESTJS}/techniques/file-upload`,
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					onUploadProgress: (progressEvent) => {
						const percentCompleted = progressEvent.progress;
						if (percentCompleted) {
							setProgress(percentCompleted);
						}
					},
				}
			);
			return res.data;
		},
		onSuccess: () => {
			setProgress(1);
			/* remove the uploaded file from the list */
			const newList = uploadList.filter((item) => item !== file);
			setUploadList(newList);
			/* update the display list */
			queryClient.invalidateQueries({
				queryKey: ["get-preview"],
			});
		},
	});

	useEffect(() => {
		if (file) {
			setUrl(URL.createObjectURL(file));
			mutation.mutate();
		}
	}, [file]);

	if (file) {
		return (
			<div
				className="relative
				flex flex-col w-28 h-28 gap-2
				bg-white/50"
			>
				{isImageType(filetype) ? (
					<img
						src={url}
						alt={file.name}
						className={`object-cover w-full h-full
						${progress === 1 ? "opacity-100" : "opacity-50"}`}
					/>
				) : isVideoType(filetype) ? (
					<video
						src={url}
						className={`object-cover w-full h-full
						${progress === 1 ? "opacity-100" : "opacity-50"}`}
					/>
				) : (
					/* unknown file type */
					<div
						className={
							progress === 1 ? "opacity-100" : "opacity-50"
						}
					>
						<UnknownFileTypeIcon title={file.name} size={100} />
					</div>
				)}
				<div className="absolute left-0 right-0 bottom-0 h-1">
					<div
						className={`h-full 
						bg-blue-400 ${progress === 1 && "hidden"}`}
						style={{
							width: `${progress * 100}%`,
						}}
					/>
				</div>
			</div>
		);
	}
	return null;
};
