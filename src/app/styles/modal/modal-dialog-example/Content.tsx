"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { EditId, EditPanel, EditProps } from "./EditPanel";

const Content = () => {
	const [edit, setEdit] = useState<EditProps>({
		show: false,
		id: EditId.NAME,
	});

	return (
		<div className="flex flex-col justify-center items-center gap-6 p-10">
			<button
				className="bg-black/10 hover:bg-black/20 px-2 py-1 rounded-md"
				onClick={() => {
					setEdit({ show: true, id: EditId.NAME });
				}}
			>
				Edit Name
			</button>
			<button
				className="bg-black/10 hover:bg-black/20 px-2 py-1 rounded-md"
				onClick={() => {
					setEdit({ show: true, id: EditId.EMAIL });
				}}
			>
				Edit Email
			</button>
			In this case, we use a transparent layer as a click listener to
			detect click outside the edit panel. A ref `listenerRef` is used to
			add click event listener.
			{createPortal(
				<EditPanel edit={edit} setEdit={setEdit} />,
				document.body
			)}
		</div>
	);
};

export default Content;
