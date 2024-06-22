"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Node = ({ node }: any) => {
	const draggableRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (draggableRef.current) {
			draggableRef.current.addEventListener("dragstart", (e: any) => {
				console.log("dragstart", node.id);

				// e.dataTransfer.setData("text/plain", JSON.stringify(node));
			});
		}
	}, []);

	return (
		<div
			ref={draggableRef}
			className="flex items-center w-fit m-1
			bg-neutral-100
			active:opacity-50
			rounded"
			draggable="true"
		>
			<div
				className="flex items-center w-8 min-h-7 px-1
				active:border-2 border-dashed border-neutral-400 box-border
				cursor-move"
			>
				📁
			</div>
			<div className="px-2">{node.id}</div>
		</div>
	);
};

const Trees = ({ trees }: any) => {
	const treeDom = trees.map((node: any) => {
		if (node.subordinates.length > 0) {
			return (
				<div key={node.id} className="flex flex-col">
					<Node node={node} />
					<div className="flex items-center">
						<div className="w-8 min-h-5"></div>
						<Trees trees={node.subordinates} />
					</div>
				</div>
			);
		} else {
			return <Node key={node.id} node={node} />;
		}
	});
	return <div>{treeDom}</div>;
};

const DragAndDrop = () => {
	const [trees, setTrees] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:3001/find-all-treeify").then((res) => {
			setTrees(res.data);
		});
	}, []);

	return (
		<div className="flex flex-col items-center w-full p-6 gap-2">
			<div
				className="flex flex-col w-96 p-4 gap-2
				bg-neutral-200
				rounded"
			>
				<Trees trees={trees} />
			</div>
		</div>
	);
};

export default DragAndDrop;
