"use client";

import axios from "axios";
import { FormEvent } from "react";
import pako from "pako";

type ArchiveFile = {
	purpose: string;
	name: string;
	data: number[];
};

export const Content = () => {
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		/* attach purpose to each file */
		const formData = new FormData(event.currentTarget);
		const source1File = formData.get("source1") as File | null;
		const source2File = formData.get("source2") as File | null;

		/* create a single archive*/
		const archive: ArchiveFile[] = [];

		if (source1File) {
			const arrayBuffer = await source1File.arrayBuffer();
			archive.push({
				purpose: "source1",
				name: source1File.name,
				data: Array.from(new Uint8Array(arrayBuffer)),
			});
		}

		if (source2File) {
			const arrayBuffer = await source2File.arrayBuffer();
			archive.push({
				purpose: "source2",
				name: source2File.name,
				data: Array.from(new Uint8Array(arrayBuffer)),
			});
		}

		/* compress entire archive as single blob */
		const archiveJson = JSON.stringify(archive);
		const compressed = pako.gzip(new TextEncoder().encode(archiveJson));
		const compressedBlob = new Blob([compressed as any], {
			type: "application/gzip",
		});

		try {
			const uploadData = new FormData();
			uploadData.append(
				"compressed_archive",
				compressedBlob,
				"files.json.gz"
			);
			const res = await axios.post(
				"techniques/upload-compressed-single-blob",
				uploadData,
				{
					baseURL: process.env.NEXT_PUBLIC_NESTJS,
				}
			);
			if (res.status !== 201) {
				throw new Error("Failed to upload files");
			}
			const result = res.data;
			console.log("Upload successful:", result);
		} catch (error) {
			console.error("Error uploading files:", error);
		}
	};

	return (
		<div className="flex flex-col gap-1 m-6">
			<h1 className="text-lg">
				Upload Multiple Excel Files For Different Purposes
			</h1>
			<h3>
				use multiple inputs for different files, identified using
				specific strings, compress to a single blob for uploading
			</h3>
			<form className="flex flex-col w-60 gap-2" onSubmit={handleSubmit}>
				{/* purpose: source 1 */}
				<input
					type="file"
					name="source1"
					accept=".xlsx,.xls"
					className="border border-gray-300 p-2 rounded"
				/>
				{/* purpose: source 2 */}
				<input
					type="file"
					name="source2"
					accept=".xlsx,.xls"
					className="border border-gray-300 p-2 rounded"
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white py-2 px-4 rounded"
				>
					Submit
				</button>
			</form>
		</div>
	);
};
