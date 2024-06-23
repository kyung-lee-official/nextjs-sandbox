"use client";

import { useRef, useState } from "react";
import Dialog from "./Dialog";

const DialogPage = () => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [showDialog, setShowDialog] = useState<boolean>(false);

	return (
		<div className="flex flex-col justify-center items-center gap-6 p-10">
			<button
				className="bg-black/10 hover:bg-black/20 px-2 py-1 rounded-md"
				onClick={() => {
					if (dialogRef.current) {
						dialogRef.current.showModal();
						setShowDialog(true);
					}
				}}
			>
				Open Modal
			</button>
			<Dialog
				ref={dialogRef}
				showDialog={showDialog}
				setShowDialog={setShowDialog}
			/>
			{[...Array(10)].map((_, i) => {
				return (
					<div key={i}>
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Consequatur perferendis libero quidem ducimus
						placeat corrupti, sed saepe repudiandae accusamus, ipsa
						beatae sequi? Eos, dignissimos aliquid incidunt officiis
						obcaecati quisquam explicabo.
					</div>
				);
			})}
		</div>
	);
};

export default DialogPage;
