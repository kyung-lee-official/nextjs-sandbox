import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UnknownFileTypeIcon } from "./Icons";

const Img = (props: {
	isImage: boolean;
	preview: string | undefined;
	alt: string;
	progress: number;
}) => {
	const { isImage, preview, alt, progress } = props;
	if (isImage) {
		return (
			<img
				src={preview}
				alt={alt}
				className={`object-cover w-full h-full
				${progress === 1 ? "opacity-100" : "opacity-50"}`}
			/>
		);
	} else {
		return <UnknownFileTypeIcon size={100} />;
	}
};

export const FileInstance = (props: { file: File }) => {
	const { file } = props;

	const [preview, setPreview] = useState<string>();
	const [isImage, setIsImage] = useState<boolean>(false);
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
	});

	useEffect(() => {
		if (file) {
			/* check file type */
			if (!file.type.startsWith("image/")) {
				setIsImage(false);
			} else {
				setIsImage(true);
				const url = URL.createObjectURL(file);
				setPreview(url);
			}

			mutation.mutate();
		}
	}, [file]);

	if (file) {
		return (
			<div
				className="relative
				flex flex-col w-28 h-28 gap-2
				bg-white/50
				rounded overflow-hidden"
			>
				<Img
					isImage={isImage}
					preview={preview}
					alt={file.name}
					progress={progress}
				/>
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
