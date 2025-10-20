import { Content } from "./Content";

type PageProps = {
	params: Promise<{ productId: string }>;
};

export default async function Page(props: PageProps) {
	const { productId } = await props.params;
	return <Content productId={productId} />;
}
