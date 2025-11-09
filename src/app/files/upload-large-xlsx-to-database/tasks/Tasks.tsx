"use client";

import { useQuery } from "@tanstack/react-query";
import { getTaskList, Task, UploadLargeXlsxToDatabaseQK } from "../api";
import { usePagination } from "@/app/components/pagination/usePagination";
import { Pagination } from "@/app/components/pagination/Pagination";
import { TaskCard } from "./Task";

export const Tasks = () => {
	const { currentPage, updatePage } = usePagination();

	const activeStatuses = ["PENDING", "VALIDATING", "SAVING"];
	const tasksQuery = useQuery({
		queryKey: [UploadLargeXlsxToDatabaseQK.GET_TASKS, currentPage],
		queryFn: () => getTaskList(currentPage),
		refetchInterval: (query) => {
			/* Smart polling: only poll if there are active tasks */
			const hasActiveTasks = query.state.data?.some((task: Task) =>
				activeStatuses.includes(task.status)
			);
			/* 5s if has active, 30s for all static */
			return hasActiveTasks ? 5000 : 30000;
		},
		refetchIntervalInBackground: false,
	});

	if (tasksQuery.isLoading) {
		return (
			<div className="p-6">
				<h2 className="text-2xl font-bold mb-6">Tasks</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<div
							key={i}
							className="bg-gray-200 rounded-lg h-48 animate-pulse"
						></div>
					))}
				</div>
			</div>
		);
	}

	if (tasksQuery.error) {
		return (
			<div className="p-6">
				<h2 className="text-2xl font-bold mb-6">Tasks</h2>
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
					Error loading tasks: {(tasksQuery.error as Error).message}
				</div>
			</div>
		);
	}

	const tasks = tasksQuery.data || [];

	return (
		<div className="p-6 space-y-3">
			<h2 className="text-2xl font-bold text-gray-900">
				Tasks ({tasks.length})
			</h2>
			{tasks.length === 0 ? (
				<div className="text-center py-12">
					<div className="text-gray-400 text-lg mb-2">
						No tasks found
					</div>
					<div className="text-gray-500 text-sm">
						Create your first task to get started
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{tasks.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</div>
			)}
			<div className="flex justify-end">
				<Pagination
					currentPage={currentPage}
					onPageChange={updatePage}
					/* Simplified logic, could be enhanced with actual pagination info */
					hasNextPage={tasks.length > 0}
					hasPreviousPage={currentPage > 1}
				/>
			</div>
		</div>
	);
};
