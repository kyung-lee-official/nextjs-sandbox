"use client";

import { useState } from "react";
import { ConfirmDialog } from "./confirm-dialog/ConfirmDialog";

const DeleteOutlineOutlined = (props: { size: number }) => {
	const { size } = props;
	return (
		<svg
			focusable="false"
			viewBox="0 0 24 24"
			width={size}
			height={size}
			className="fill-neutral-400"
		>
			<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8zm7.5-5-1-1h-5l-1 1H5v2h14V4z"></path>
		</svg>
	);
};

type User = { id: number; user: string };

export const Content = () => {
	const [mockData, setMockData] = useState<User[]>([
		{
			id: 1,
			user: "John Doe",
		},
		{
			id: 2,
			user: "Jane Smith",
		},
		{
			id: 3,
			user: "Alice Johnson",
		},
		{
			id: 4,
			user: "Bob Brown",
		},
	]);

	return (
		<div
			className="p-8 h-svh
			bg-neutral-950"
		>
			<div className="text-neutral-400">
				{mockData.map((item) => (
					<div
						key={item.id}
						className="flex items-center p-4 gap-4
						border-b border-neutral-700"
					>
						<div>{item.user}</div>
						<ConfirmDialog
							entryButton={
								<div
									className="flex cursor-pointer
									bg-neutral-800 hover:bg-neutral-700
									rounded"
								>
									<DeleteOutlineOutlined size={24} />
								</div>
							}
							confirmText="Delete"
							data={item.id}
							onOk={(id: typeof item.id) => {
								/* typically, you would call an API to delete the user here */
								setMockData((prev) =>
									prev.filter((i) => i.id !== id)
								);
							}}
							question={"Delete this user?"}
							description={
								"Are you sure you want to delete this user?"
							}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
