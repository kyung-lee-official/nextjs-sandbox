"use client";

import { useMemo, useState } from "react";
import { io } from "socket.io-client";

const Content = () => {
	const [isConnected, setIsConnected] = useState(false);
	const [progress, setProgress] = useState(0);

	const socket = useMemo(() => {
		const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL, {
			autoConnect: false,
		});
		socket.on("connect", () => {
			console.log("Connected to server");
			setIsConnected(true);
		});
		socket.on("disconnect", () => {
			console.log("Disconnected from server");
			setIsConnected(false);
		});
		socket.on("message", (data: any) => {
			const { message } = data;
			console.log(message);
		});
		socket.on("progress", (data: any) => {
			const { progress } = data;
			setProgress(progress);
		});
		return socket;
	}, []);

	return (
		<div
			className="flex flex-col justify-start items-start my-10 p-10 min-h-[70vh] gap-4
			bg-gray-200"
		>
			<div className="flex items-center gap-6">
				<button
					className="px-2 py-1
					text-white
					bg-blue-500 hover:bg-blue-600
					rounded"
					onClick={() => {
						socket.connect();
						socket.emit("message", {
							message: "Hello from client",
						});
					}}
				>
					Start
				</button>
				<div
					className={`w-3 h-3 
					${isConnected ? "bg-green-500" : "bg-gray-500"}
					${isConnected ? "shadow-[0_0_10px_#00ff00]" : ""}
					rounded-full duration-700`}
				></div>
			</div>
			<div>Progress: {progress}</div>
		</div>
	);
};

export default Content;
