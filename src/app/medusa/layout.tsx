import { ReactNode } from "react";
import { MedusaWrapper } from "./MedusaWrapper";

const layout = ({ children }: { children: ReactNode }) => {
	return <MedusaWrapper>{children}</MedusaWrapper>;
};

export default layout;
