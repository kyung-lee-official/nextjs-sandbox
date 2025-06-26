"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type FormValues = {
	files: FileList;
};

const uploadFiles = async (files: FileList) => {
	// Replace this with your actual upload logic (e.g., to Aliyun OSS)
	// Here we just simulate a delay and log the files
	await new Promise((res) => setTimeout(res, 1000));
	return Array.from(files).map((file) => file.name);
};

const Content = () => {
	const { register, handleSubmit, reset } = useForm<FormValues>();
	const mutation = useMutation({
		mutationFn: async (files: FileList) => {
			if (!files || files.length === 0) {
				console.error("No files selected");
				return;
			}
			for (const file of files) {
				const res = await axios.post(
					"/api/aliyun-oss/get-signed-url",
					{
						fileName: file.name,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				console.log(res.data);
				const ossRes = await axios.put(res.data, file, {
					headers: {
						"Content-Type": "application/octet-stream",
					},
				});
				console.log(ossRes.data);
			}
			return uploadFiles(files);
		},
		onSuccess: (data) => {
			console.log("Uploaded files:", data);
			reset();
		},
	});

	const inputRef = useRef<HTMLInputElement>(null);

	const onSubmit = async () => {
		const files = inputRef.current?.files;
		if (files && files.length > 0) {
			mutation.mutate(files);
		}
	};

	return (
		<form
			className="p-12
			space-y-4"
		>
			<input
				type="file"
				multiple
				ref={(e) => {
					register("files").ref(e);
					inputRef.current = e;
				}}
				className="block w-fit px-2
				bg-neutral-400"
			/>
			<button
				type="submit"
				className="px-1.5
				text-white
				bg-blue-500
				rounded"
				onClick={handleSubmit(onSubmit)}
			>
				Upload
			</button>
		</form>
	);
};

export default Content;
