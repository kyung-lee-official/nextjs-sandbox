import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { EditId, EditProps } from "./EditPanel";
import { UnsavedDialog } from "./UnsavedDialog";

export const EditContentName = (props: {
	edit: EditProps;
	setEdit: Dispatch<SetStateAction<EditProps>>;
}) => {
	const editId = EditId.NAME;
	const { edit, setEdit } = props;

	const panelRef = useRef<HTMLDivElement>(null);

	const [oldData, setOldData] = useState<any>("Kyung Lee");
	const [newData, setNewData] = useState<any>(null);

	const listenerRef = useRef<HTMLDivElement>(null);
	const [isChanged, setIsChanged] = useState(false);
	const isChangedRef = useRef(isChanged);
	const _setIsChanged = (data: any) => {
		isChangedRef.current = data;
		setIsChanged(data);
	};
	const [showUnsaved, setShowUnsaved] = useState(false);

	function onSave() {
		/* here we call API to update the data */
		// mutation.mutate();
	}

	useEffect(() => {
		if (newData && JSON.stringify(newData) !== JSON.stringify(oldData)) {
			_setIsChanged(true);
		} else {
			_setIsChanged(false);
		}
	}, [newData]);

	function quit() {
		if (isChangedRef.current) {
			setShowUnsaved(true);
		} else {
			setEdit({ show: false, id: editId });
		}
	}

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (!listenerRef.current) {
				return;
			}
			if (listenerRef.current === event.target) {
				quit();
			}
		}
		listenerRef.current?.addEventListener("click", handleClickOutside);
		return () => {
			listenerRef.current?.removeEventListener(
				"click",
				handleClickOutside
			);
		};
	}, [isChanged]);

	return (
		<div
			ref={listenerRef}
			className="w-full h-svh
			flex justify-end items-center"
		>
			<motion.div
				ref={panelRef}
				initial={{ x: "100%" }}
				animate={{ x: "0%" }}
				transition={{ duration: 0.1 }}
				className="flex flex-col h-[calc(100svh-16px)] w-full max-w-[560px] m-2
				text-white/90
				bg-neutral-900
				rounded-lg border-[1px] border-neutral-700 border-t-neutral-600"
			>
				<div
					className="flex-[0_0_61px] flex justify-between px-6 py-4
					font-semibold text-lg
					border-b-[1px] border-white/10"
				>
					<div>Edit Profile</div>
					<button
						className="flex justify-center items-center w-7 h-7
						text-white/50
						hover:bg-white/10 rounded-md"
						onClick={() => {
							quit();
						}}
					>
						x
					</button>
				</div>
				<form
					action={onSave}
					className="flex-[1_0_100px] flex flex-col"
				>
					<div
						className="flex-[1_0_100px] flex flex-col px-6 py-4
						border-b-[1px] border-white/10"
					>
						<div
							className="flex flex-col gap-1.5
							text-sm"
						>
							Name
							<input
								type="text"
								className="px-2 py-1.5
								bg-white/10
								rounded-md outline-none
								border-[1px] border-white/10"
								defaultValue={oldData}
								onChange={(e) => {
									setNewData({
										...newData,
										name: e.target.value,
									});
								}}
							/>
						</div>
					</div>
					<div className="flex-[0_0_61px] flex justify-end px-6 py-4 gap-1.5">
						<button
							onClick={(e: any) => {
								e.preventDefault();
								quit();
							}}
						>
							Cancel
						</button>
						<button type="submit">Save</button>
					</div>
				</form>
			</motion.div>
			<UnsavedDialog
				edit={edit}
				setEdit={setEdit}
				showUnsaved={showUnsaved}
				setShowUnsaved={setShowUnsaved}
			/>
		</div>
	);
};
