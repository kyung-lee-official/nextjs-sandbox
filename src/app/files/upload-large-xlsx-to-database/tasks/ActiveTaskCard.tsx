import { ActiveStatusesSchema, DbTaskStatus, Task } from "../types";

type ActiveTaskCardProps = {
	task: Task;
};

/* ActiveTaskCard - Optimized for tasks in progress */
export const ActiveTaskCard = ({ task }: ActiveTaskCardProps) => {
	const {
		id,
		status,
		totalRows,
		validatedRows,
		savedRows,
		errorRows,
		createdAt,
		updatedAt,
	} = task;

	const getStatusColor = (status: DbTaskStatus) => {
		switch (status) {
			case ActiveStatusesSchema.enum.PENDING:
				return "bg-blue-100 text-blue-700 border-blue-300";
			case ActiveStatusesSchema.enum.PROCESSING:
				return "bg-yellow-100 text-yellow-700 border-yellow-300";
			default:
				return "bg-gray-100 text-gray-700 border-gray-300";
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString();
	};

	const currentProgress = Math.round((validatedRows / totalRows) * 100) || 0;

	return (
		<div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
			{/* Header with status and actions */}
			<div className="flex justify-between items-start mb-4">
				<div className="flex items-center gap-3">
					<div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
					<span
						className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
							status
						)}`}
					>
						{status}
					</span>
				</div>
			</div>

			{/* Live Progress Bar */}
			<div className="mb-4">
				<div className="flex justify-between items-center mb-2">
					<span className="text-sm font-medium text-gray-700">
						Processing Progress
					</span>
					<span className="text-blue-600 font-semibold">
						{currentProgress}%
					</span>
				</div>
				<div className="bg-gray-200 rounded-full h-3">
					<div
						className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
						style={{ width: `${currentProgress}%` }}
					>
						<div className="h-full w-full rounded-full bg-gradient-to-r from-transparent to-white opacity-30"></div>
					</div>
				</div>
			</div>

			{/* Quick Stats */}
			<div className="grid grid-cols-2 gap-3 mb-4">
				<div className="text-center bg-blue-50 rounded-lg p-3">
					<div className="text-xl font-bold text-blue-600">
						{totalRows.toLocaleString()}
					</div>
					<div className="text-xs text-blue-500 font-medium">
						Total Rows
					</div>
				</div>
				<div className="text-center bg-green-50 rounded-lg p-3">
					<div className="text-xl font-bold text-green-600">
						{validatedRows.toLocaleString()}
					</div>
					<div className="text-xs text-green-500 font-medium">
						Validated
					</div>
				</div>
			</div>

			{/* Real-time indicators */}
			<div className="flex items-center justify-between text-xs text-gray-500">
				<span>Task ID: {id}</span>
				<span>Started: {formatDate(createdAt)}</span>
			</div>
		</div>
	);
};
