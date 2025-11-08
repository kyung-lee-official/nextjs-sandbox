import axios from "axios";
import { z } from "zod";

export enum UploadLargeXlsxToDatabaseQK {
	GET_TASKS = "get_tasks",
	GET_TASK_BY_ID = "get_task_by_id",
}

/* Task schemas and types */
const TaskStatusSchema = z.enum([
	"PENDING",
	"LOADING_WORKBOOK",
	"VALIDATING_HEADERS",
	"VALIDATING",
	"SAVING",
	"COMPLETED",
	"HAS_ERRORS",
	"FAILED",
]);

const TaskSchema = z.object({
	id: z.string(),
	createdAt: z.string().datetime(),
	errorRows: z.number().min(0),
	savedRows: z.number().min(0),
	savingProgress: z.number().min(0).max(100),
	status: TaskStatusSchema,
	totalRows: z.number().min(0),
	updatedAt: z.string().datetime(),
	validatedRows: z.number().min(0),
	validationProgress: z.number().min(0).max(100),
});

/* Infer TypeScript types from Zod schemas */
type TaskStatus = z.infer<typeof TaskStatusSchema>;
type Task = z.infer<typeof TaskSchema>;

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
	const res = await axios.post<UploadFileResponse>(
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

	return res.data;
};

export const getTaskList = async (page?: number): Promise<Task[]> => {
	const params = new URLSearchParams();
	if (page !== undefined) {
		params.append("page", page.toString());
	}

	const res = await axios.get<Task[]>(
		`/applications/upload-large-xlsx/tasks?${params.toString()}`,
		{
			baseURL: process.env.NEXT_PUBLIC_NESTJS,
		}
	);
	return res.data;
};

/* Export schemas and types for use in components */
export { TaskSchema, TaskStatusSchema };
export type { Task, TaskStatus, UploadFileResponse, UploadProgressCallback };
