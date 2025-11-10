import { z } from "zod";

/* Database Task Status Schema */
export const DbTaskStatusSchema = z.enum([
	"PENDING",
	"PROCESSING",
	"COMPLETED",
	"HAS_ERRORS",
	"FAILED",
]);

/* Redis Progress Status Schema */
export const RedisProgressStatusSchema = z.enum([
	"LOADING_WORKBOOK",
	"VALIDATING_HEADERS",
	"VALIDATING",
	"SAVING",
]);

export const TaskSchema = z.object({
	id: z.number().int(),
	status: DbTaskStatusSchema,
	totalRows: z.number().int().min(0),
	validatedRows: z.number().int().min(0),
	savedRows: z.number().int().min(0),
	errorRows: z.number().int().min(0),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

/* Infer TypeScript types from Zod schemas */
export type DbTaskStatus = z.infer<typeof DbTaskStatusSchema>;
export type Task = z.infer<typeof TaskSchema>;

/* Response schemas and types */
export const UploadFileResponseSchema = z.object({
	success: z.boolean(),
	message: z.string(),
	fileId: z.string().optional(),
	filename: z.string().optional(),
	size: z.number().int().min(0).optional(),
	recordsProcessed: z.number().int().min(0).optional(),
});
export type UploadFileResponse = z.infer<typeof UploadFileResponseSchema>;

export const UploadProgressEventSchema = z.object({
	loaded: z.number().min(0),
	total: z.number().min(0).optional(),
	progress: z.number().min(0).max(100).optional(),
});
export type UploadProgressEvent = z.infer<typeof UploadProgressEventSchema>;
export type UploadProgressCallback = (
	progressEvent: UploadProgressEvent
) => void;
