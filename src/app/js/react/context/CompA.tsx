import { useContext } from "react";
import { TestContext } from "./Context";

const CompA = (props: any) => {
	const { setNum } = props;
	const context = useContext(TestContext);
	return (
		<div
			className="w-fit p-2
			rounded-lg border-[1px] border-solid"
		>
			CompA context: {context},{" "}
			<button
				className="underline"
				onClick={() => {
					setNum(Math.random());
				}}
			>
				Update context
			</button>
		</div>
	);
};

export default CompA;
