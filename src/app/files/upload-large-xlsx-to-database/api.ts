import axios from "axios";

/* Response types */
interface UploadFileResponse {
	success: boolean;
	message: string;
	fileId?: string;
	filename?: string;
	size?: number;
	recordsProcessed?: number;
}

interface UploadProgressCallback {
	(progressEvent: {
		loaded: number;
		total?: number;
		progress?: number;
	}): void;
}

/* Upload file to application endpoint */
export const uploadLargeXlsxFile = async (
	file: File,
	onProgress?: UploadProgressCallback
): Promise<UploadFileResponse> => {
	/* Create FormData to handle file upload */
	const formData = new FormData();
	formData.append("file", file);

	/* Make the upload request */
	const response = await axios.post<UploadFileResponse>(
		"/applications/upload-large-xlsx/upload",
		formData,
		{
			baseURL: process.env.NEXT_PUBLIC_NESTJS,
			headers: {
				"Content-Type": "multipart/form-data",
			},
			/* Progress tracking */
			onUploadProgress: (progressEvent) => {
				if (onProgress && progressEvent.total) {
					const progress = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					onProgress({
						loaded: progressEvent.loaded,
						total: progressEvent.total,
						progress,
					});
				}
			},
			/* Timeout for large files (5 mins) */
			timeout: 5 * 60 * 1000,
		}
	);

	return response.data;
};

/* Export types for use in components */
export type { UploadFileResponse, UploadProgressCallback };
