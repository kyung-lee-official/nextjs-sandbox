import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const FileInstance = (props: { file: File }) => {
	const { file } = props;

	const [preview, setPreview] = useState<string>();
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
			const url = URL.createObjectURL(file);
			setPreview(url);
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
				<img
					src={preview ? preview : "https://via.placeholder.com/150"}
					alt={file.name}
					className={`object-cover w-full h-full
					${progress === 1 ? "opacity-100" : "opacity-50"}`}
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
