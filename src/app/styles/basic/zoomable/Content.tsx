"use client";

import { Zoomable } from "./Zoomable";

const Content = () => {
	return (
		<div className="flex flex-col w-full min-h-svh p-10 gap-20">
			<h1 className="text-4xl">Zoomable Image</h1>
			<Zoomable
				mode="regular"
				filetype="jpg"
				src={"/images/styles/image/2000x300.jpg"}
				width={300}
			/>
			<Zoomable
				mode="regular"
				filetype="jpg"
				src={"/images/styles/image/300x2000.jpg"}
				width={100}
			/>
		</div>
	);
};

export default Content;
