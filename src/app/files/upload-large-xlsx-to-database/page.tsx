import { GenerateXlsx } from "./GenerateXlsx";
import { Tasks } from "./Tasks";
import { TanStackWrapper } from "./TanStackWrapper";

const Page = () => {
	return (
		<TanStackWrapper>
			<GenerateXlsx />
			<Tasks />
		</TanStackWrapper>
	);
};

export default Page;
