import { cookies } from "next/headers";
import { Content } from "./Content";

type PageProps = {
	params: Promise<{ productId: string }>;
};

export default async function Page(props: PageProps) {
	const cookieStore = await cookies();
	const region = cookieStore.get("medusaRegion")?.value;
	const customer = cookieStore.get("medusaCustomer")?.value;
	const { productId } = await props.params;
	return (
		<Content
			productId={productId}
			regionId={region}
			customerId={customer}
		/>
	);
}
