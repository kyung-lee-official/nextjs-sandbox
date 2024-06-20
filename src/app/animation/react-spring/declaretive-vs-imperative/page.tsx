import dynamic from "next/dynamic";

const ApiComponent = dynamic(() => import("./ApiComponent"), { ssr: false });
const StateComponent = dynamic(() => import("./StateComponent"), {
	ssr: false,
});

const Page = () => {
	return (
		<div className="flex flex-col items-center p-4 gap-8">
			<ApiComponent />
			<StateComponent />
		</div>
	);
};

export default Page;
