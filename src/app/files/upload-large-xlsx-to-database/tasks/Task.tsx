import { Task, TaskStatus } from "../api";
import { Delete } from "./Delete";

interface TaskCardProps {
	task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
	const {
		id,
		createdAt,
		errorRows,
		savedRows,
		savingProgress,
		status,
		totalRows,
		updatedAt,
		validatedRows,
		validationProgress,
	} = task;

	const getStatusColor = (status: TaskStatus) => {
		switch (status) {
			case "PENDING":
				return "bg-gray-100 text-gray-700 border-gray-300";
			case "LOADING_WORKBOOK":
				return "bg-blue-100 text-blue-700 border-blue-300";
			case "VALIDATING_HEADERS":
				return "bg-yellow-100 text-yellow-700 border-yellow-300";
			case "VALIDATING":
				return "bg-orange-100 text-orange-700 border-orange-300";
			case "SAVING":
				return "bg-purple-100 text-purple-700 border-purple-300";
			case "COMPLETED":
				return "bg-green-100 text-green-700 border-green-300";
			case "HAS_ERRORS":
				return "bg-red-100 text-red-700 border-red-300";
			case "FAILED":
				return "bg-red-200 text-red-800 border-red-400";
			default:
				return "bg-gray-100 text-gray-700 border-gray-300";
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString();
	};

	const getProgressBarColor = (status: TaskStatus) => {
		switch (status) {
			case "VALIDATING":
				return "bg-orange-500";
			case "SAVING":
				return "bg-purple-500";
			case "COMPLETED":
				return "bg-green-500";
			case "HAS_ERRORS":
			case "FAILED":
				return "bg-red-500";
			default:
				return "bg-blue-500";
		}
	};

	const isInProgress = status === "VALIDATING" || status === "SAVING";
	const currentProgress =
		status === "VALIDATING" ? validationProgress : savingProgress;

	return (
		<div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
			<div className="flex justify-between items-start mb-4">
				<div>
					<h3 className="text-lg font-semibold text-gray-900">
						Task {id}
					</h3>
					<p className="text-sm text-gray-500">
						Created: {formatDate(createdAt)}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<span
						className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
							status
						)}`}
					>
						{status.replace(/_/g, " ")}
					</span>
					<Delete taskId={id} />
				</div>
			</div>

			{/* Progress Section */}
			{isInProgress && (
				<div className="mb-4">
					<div className="flex justify-between text-sm mb-1">
						<span className="text-gray-600">
							{status === "VALIDATING" ? "Validation" : "Saving"}{" "}
							Progress
						</span>
						<span className="text-gray-500">
							{currentProgress}%
						</span>
					</div>
					<div className="bg-gray-200 rounded-full h-2">
						<div
							className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(
								status
							)}`}
							style={{ width: `${currentProgress}%` }}
						></div>
					</div>
				</div>
			)}

			{/* Statistics */}
			<div className="grid grid-cols-2 gap-4 mb-4">
				<div className="text-center bg-gray-50 rounded p-3">
					<div className="text-lg font-semibold text-gray-900">
						{totalRows.toLocaleString()}
					</div>
					<div className="text-xs text-gray-500">Total Rows</div>
				</div>
				<div className="text-center bg-gray-50 rounded p-3">
					<div className="text-lg font-semibold text-green-600">
						{savedRows.toLocaleString()}
					</div>
					<div className="text-xs text-gray-500">Saved Rows</div>
				</div>
				<div className="text-center bg-gray-50 rounded p-3">
					<div className="text-lg font-semibold text-blue-600">
						{validatedRows.toLocaleString()}
					</div>
					<div className="text-xs text-gray-500">Validated</div>
				</div>
				<div className="text-center bg-gray-50 rounded p-3">
					<div className="text-lg font-semibold text-red-600">
						{errorRows.toLocaleString()}
					</div>
					<div className="text-xs text-gray-500">Errors</div>
				</div>
			</div>

			{/* Footer */}
			<div className="text-xs text-gray-500 border-t pt-3">
				Last updated: {formatDate(updatedAt)}
			</div>
		</div>
	);
};
