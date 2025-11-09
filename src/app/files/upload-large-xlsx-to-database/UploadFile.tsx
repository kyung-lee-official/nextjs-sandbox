"use client";

import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadLargeXlsxFile } from "./api";
import { validateFile } from "../utils/xlsx";
import { humanReadableSize } from "../utils/file";

export const UploadFile = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isDragOver, setIsDragOver] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	/* Upload mutation using TanStack Query */
	const uploadMutation = useMutation({
		mutationFn: (file: File) =>
			uploadLargeXlsxFile(file, (progressEvent) => {
				setUploadProgress(progressEvent.progress || 0);
			}),
		onSuccess: (data) => {
			alert(
				`File uploaded successfully: ${
					data.filename || "Unknown filename"
				}`
			);
			setSelectedFile(null);
			setUploadProgress(0);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		},
		onError: (error: any) => {
			console.error("Upload error:", error);

			let errorMessage = "An unexpected error occurred during upload";

			/* Handle axios errors */
			if (error?.isAxiosError) {
				if (error.response) {
					/* Server responded with error status */
					errorMessage =
						error.response.data?.message ||
						`Upload failed with status ${error.response.status}`;
				} else if (error.request) {
					/* Request was made but no response received */
					errorMessage = "Network error: No response from server";
				} else {
					/* Something else happened */
					errorMessage = `Request setup error: ${error.message}`;
				}
			} else if (error?.message) {
				errorMessage = error.message;
			}

			alert(`Upload failed: ${errorMessage}`);
			setUploadProgress(0);
		},
	});

	const handleFileSelect = (file: File) => {
		const validation = validateFile(file);
		if (!validation.valid) {
			alert(validation.error);
			return;
		}
		setSelectedFile(file);
	};

	const handleFileInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file) {
			handleFileSelect(file);
		}
	};

	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (event: React.DragEvent) => {
		event.preventDefault();
		setIsDragOver(false);
	};

	const handleDrop = (event: React.DragEvent) => {
		event.preventDefault();
		setIsDragOver(false);

		const files = event.dataTransfer.files;
		if (files.length > 0) {
			handleFileSelect(files[0]);
		}
	};

	const handleUpload = () => {
		if (selectedFile) {
			uploadMutation.mutate(selectedFile);
		}
	};

	const handleRemoveFile = () => {
		setSelectedFile(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h2 className="text-2xl font-bold mb-6">Upload Large Excel File</h2>

			{/* File Drop Zone */}
			<div
				className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
					isDragOver
						? "border-blue-500 bg-blue-50"
						: "border-gray-300 hover:border-gray-400"
				}`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				{selectedFile ? (
					/* Selected File Display */
					<div className="space-y-4">
						<div className="flex items-center justify-center">
							<div className="bg-green-100 rounded-full p-3">
								<svg
									className="w-6 h-6 text-green-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
							</div>
						</div>
						<div>
							<p className="font-medium text-gray-900">
								{selectedFile.name}
							</p>
							<p className="text-sm text-gray-500">
								{humanReadableSize(selectedFile.size)}
							</p>
						</div>
						<div className="flex gap-3 justify-center">
							<button
								onClick={handleUpload}
								disabled={uploadMutation.isPending}
								className={`px-4 py-2 rounded-lg font-medium ${
									uploadMutation.isPending
										? "bg-gray-400 cursor-not-allowed"
										: "bg-blue-600 hover:bg-blue-700"
								} text-white transition-colors`}
							>
								{uploadMutation.isPending
									? "Uploading..."
									: "Upload File"}
							</button>
							<button
								onClick={handleRemoveFile}
								disabled={uploadMutation.isPending}
								className="px-4 py-2 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
							>
								Remove
							</button>
						</div>
					</div>
				) : (
					/* File Selection Area */
					<div className="space-y-4">
						<div className="flex items-center justify-center">
							<div className="bg-gray-100 rounded-full p-3">
								<svg
									className="w-6 h-6 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
									/>
								</svg>
							</div>
						</div>
						<div>
							<p className="text-lg font-medium text-gray-900">
								Drop your Excel file here
							</p>
							<p className="text-sm text-gray-500">
								or click to browse files
							</p>
						</div>
						<div>
							<input
								ref={fileInputRef}
								type="file"
								accept=".xlsx,.xls"
								onChange={handleFileInputChange}
								className="hidden"
								id="file-upload"
							/>
							<label
								htmlFor="file-upload"
								className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
							>
								Choose File
							</label>
						</div>
						<p className="text-xs text-gray-400">
							Supports .xlsx and .xls files up to 50MB
						</p>
					</div>
				)}
			</div>

			{/* Upload Progress */}
			{uploadMutation.isPending && (
				<div className="mt-6 bg-white rounded-lg shadow-md p-6">
					<div className="flex justify-between items-center mb-2">
						<span className="text-sm font-medium text-gray-700">
							Uploading...
						</span>
						<span className="text-sm text-gray-500">
							{uploadProgress}%
						</span>
					</div>
					<div className="bg-gray-200 rounded-full h-2">
						<div
							className="bg-blue-600 h-2 rounded-full transition-all duration-300"
							style={{ width: `${uploadProgress}%` }}
						></div>
					</div>
				</div>
			)}

			{/* Upload Status */}
			{uploadMutation.isError && (
				<div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
					<strong>Error:</strong> {uploadMutation.error?.message}
				</div>
			)}

			{/* Instructions */}
			<div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
				<div className="flex">
					<div className="ml-3">
						<p className="text-sm text-blue-700">
							<strong>Instructions:</strong> Upload your Excel
							file (.xlsx or .xls) containing the data you want to
							import to the database. The file will be processed
							and the records will be inserted.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
