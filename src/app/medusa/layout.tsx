import { cookies } from "next/headers";
import { ReactNode } from "react";
import { MedusaWrapper } from "./MedusaWrapper";

type LayoutProps = {
	children: ReactNode;
};

const layout = async (props: LayoutProps) => {
	const { children } = props;

	/* read cookies - access any cookie by name */
	const cookieStore = await cookies();
	/* default to "us" if undefined */
	const regionId = cookieStore.get("medusaRegion")?.value;
	const customerId = cookieStore.get("medusaCustomer")?.value;

	/* you can also get all cookies */
	// const allCookies = cookieStore.getAll();

	return (
		<MedusaWrapper regionId={regionId} customerId={customerId}>
			{children}
		</MedusaWrapper>
	);
};

export default layout;
