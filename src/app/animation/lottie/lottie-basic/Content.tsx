"use client";

import Lottie from "lottie-react";
import data from "../../../../../public/lottie/basic/data.json";

const BasicPage = () => {
	return (
		<div className="w-full bg-slate-800">
			<Lottie animationData={data} loop={true} autoplay />
		</div>
	);
};

export default BasicPage;
