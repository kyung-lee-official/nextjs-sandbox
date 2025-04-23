import { Button } from "@/app/components/button/Button";
import { MouseEventHandler, ReactNode, useCallback, useState } from "react";

export const ConfirmDialog = (props: {
	entryButton: ReactNode;
	question: string;
	description?: string;
	confirmText?: string;
	/* data to be passed to the onOk function */
	data?: any;
	onOk: Function;
	onCancel?: Function;
}) => {
	const {
		entryButton,
		question,
		description,
		confirmText = "Confirm",
		data,
		onOk,
		onCancel,
	} = props;

	const [show, setShow] = useState(false);

	const handleOpenDialog = useCallback(() => {
		setShow(true);
	}, []);

	const handleConfirm = useCallback(() => {
		onOk(data); /* pass the optional data on confirmation */
		setShow(false);
	}, [onOk, data]);

	const handleCancel = useCallback(() => {
		if (onCancel) {
			onCancel();
		}
		setShow(false);
	}, [onCancel]);

	return (
		<div>
			<button
				onClick={handleOpenDialog}
				className="flex justify-center items-center"
			>
				{entryButton}
			</button>
			{show && (
				<div
					className="fixed inset-0
					bg-black/50 flex justify-center items-center
					z-30"
				>
					<div
						className="w-full max-w-[400px] mx-auto
						text-white/90
						bg-neutral-800
						border-[1px] border-white/10
						shadow-lg rounded-md backdrop:bg-black/50 outline-none"
					>
						<div className="flex flex-col pt-6 px-6 gap-1.5">
							<div className="font-semibold">{question}</div>
							<div className="text-sm text-white/50">
								{description}
							</div>
						</div>
						<div
							className="flex justify-end p-6 gap-1.5
							leading-4"
						>
							<Button
								color="cancel"
								size="sm"
								onClick={handleCancel}
							>
								Cancel
							</Button>
							<Button size="sm" onClick={handleConfirm}>
								{confirmText}
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
