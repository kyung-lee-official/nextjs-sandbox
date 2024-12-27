import axios from "axios";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";

export const UploadFilesAny = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [progress, setProgress] = useState<string>("0%");

	async function onFileChange(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		console.log(e.target.files);
		const files = e.target.files;
		if (!files) return;
		const data = new FormData();
		for (let i = 0; i < files.length; i++) {
			data.append("files", files[i]);
		}
		const res = await axios.put(
			`${process.env.NEXT_PUBLIC_NESTJS}/techniques/files-upload-any`,
			data,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress: (progressEvent) => {
					const percentCompleted = progressEvent.progress
						? (progressEvent.progress * 100).toFixed(2) + "%"
						: "0%";
					setProgress(percentCompleted);
				},
			}
		);
	}

	return (
		<div className="flex flex-col justify-center items-start gap-2">
			<h1 className="text-lg">
				<Link
					href={
						"https://docs.nestjs.com/techniques/file-upload#any-files"
					}
					className="underline"
				>
					Upload Files (with arbitrary field name keys)
				</Link>
			</h1>
			<p>The files are uploaded in multipart/form-data format.</p>
			<p>
				To upload an array of files (identified with a single field
				name)
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
					/* set progress to 0% */
					setProgress("0%");
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
			{progress}
		</div>
	);
};
