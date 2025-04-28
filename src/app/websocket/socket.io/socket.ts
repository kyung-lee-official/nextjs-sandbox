import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
	if (!socket) {
		/* initialize the socket instance if it doesn't exist */
		socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || "", {
			autoConnect: false /* prevent auto-connect */,
		});
	}
	return socket;
};
