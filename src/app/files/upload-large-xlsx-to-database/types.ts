import { z } from "zod";

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
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
export type Task = z.infer<typeof TaskSchema>;

/* Response types */
export type UploadFileResponse = {
	success: boolean;
	message: string;
	fileId?: string;
	filename?: string;
	size?: number;
	recordsProcessed?: number;
};

export type UploadProgressCallback = (progressEvent: {
	loaded: number;
	total?: number;
	progress?: number;
}) => void;
