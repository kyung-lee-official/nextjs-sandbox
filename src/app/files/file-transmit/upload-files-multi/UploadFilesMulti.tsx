import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FileToUpload } from "./FileToUpload";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { FileToPreview } from "./FileToPreview";

export type Preview = {
	name: string;
	isImage: boolean;
};

export const UploadFilesMulti = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [fileList, setFileList] = useState<(File | Preview)[] | null>(null);

	const previewQuery = useQuery<Preview[], AxiosError>({
		queryKey: ["get-preview"],
		queryFn: async () => {
			const res = await axios.get<any>(
				`${process.env.NEXT_PUBLIC_NESTJS}/techniques/preview-filelist`
			);
			return res.data;
		},
		retry: false,
		refetchOnWindowFocus: false,
	});
	useEffect(() => {
		if (previewQuery.data) {
			setFileList(previewQuery.data);
		}
	}, [previewQuery.data]);

	async function onFileChange(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		console.log(e.target.files);
		const files = e.target.files as File[] | null;
		if (!files) return;
		console.log(files);
		/* convert FileList to Array so it can be mapped */
		setFileList(Array.from(files));
	}

	return (
		<div className="flex flex-col justify-center items-start gap-2">
			<h1 className="text-lg">Upload Files (one by one in a loop)</h1>
			<p>The files are uploaded in multipart/form-data format.</p>
			<p>
				Essentially the same as uploading a single file, but do it in a
				loop for each file in the array.
			</p>
			<p>
				Throttle down (fast 4G) your network in the dev tools to test
				this feature. The file will be uploaded to the server, check it
				out in the server&apos;s file system.
			</p>
			<button
				className="py-2 px-4
				text-white font-bold
				bg-blue-500 hover:bg-blue-700
				rounded"
				onClick={() => {
					/* clear the input field */
					inputRef.current!.value = "";
					setFileList(null);
					/* trigger the input field */
					inputRef.current?.click();
				}}
			>
				Upload
			</button>
			<form>
				<input
					type="file"
					multiple
					ref={inputRef}
					onChange={onFileChange}
					className="hidden"
				/>
			</form>
			<div
				className="grid grid-cols-6 min-w-96 min-h-32 p-2 gap-2
				bg-black/5
				rounded"
			>
				{fileList &&
					fileList.length > 0 &&
					fileList.map((file, i) => {
						if (file instanceof File) {
							return <FileToUpload key={i} file={file} />;
						} else {
							return (
								<FileToPreview
									key={i}
									preview={file as Preview}
								/>
							);
						}
					})}
			</div>
		</div>
	);
};
