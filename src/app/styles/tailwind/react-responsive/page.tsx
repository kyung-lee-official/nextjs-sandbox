import dynamic from "next/dynamic";

const DynamicContent = dynamic(() => import("./Content"), {
	ssr: false,
});

const Page = () => {
	return <DynamicContent />;
};
export default Page;
