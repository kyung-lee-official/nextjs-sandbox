"use client";

import { useEffect, useState } from "react";
import { getSocket } from "./socket";

const Content = () => {
	const [isConnected, setIsConnected] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		/**
		 * Get the singleton socket instance
		 * the best practice is to use a singleton pattern for the socket instance
		 * to avoid creating multiple instances of the socket connection
		 *
		 * but if you prefer to use a page-level socket instance, you should
		 * use useRef to persist the socket instance across renders
		 */
		const socket = getSocket();

		/* event listeners */
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
			console.log("Message received:", message);
		});
		socket.on("progress", (data: any) => {
			const { progress } = data;
			setProgress(progress);
		});

		/* cleanup on component unmount */
		/**
		 * why `off` not `disconnect`?
		 * The socket.off method removes specific event listeners that were
		 * added using socket.on
		 *
		 * The socket.disconnect method closes the connection to the server,
		 * this is a more drastic action and is typically used when you want to stop all communication with the server,
		 * not just clean up event listeners.
		 */
		return () => {
			socket.off("connect");
			socket.off("disconnect");
			socket.off("message");
			socket.off("progress");
		};
	}, []);

	const handleStart = () => {
		/* get the singleton socket instance */
		const socket = getSocket();
		socket.connect();
		socket.emit("message", {
			message: "Hello from client",
		});
	};

	const handleDisconnect = () => {
		const socket = getSocket(); // Get the singleton socket instance
		socket.disconnect();
	};

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
					onClick={handleStart}
				>
					Start
				</button>
				<button
					className="px-2 py-1
					text-white
					bg-red-500 hover:bg-red-600
					rounded"
					onClick={handleDisconnect}
				>
					Disconnect
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
