import { MenuPageLayout } from "../MenuPageLayout";

const Page: React.FC<any> = () => {
	return (
		<MenuPageLayout activeKey={"/styles/menu/menu-1"}>
			<h1>1</h1>
		</MenuPageLayout>
	);
};

export default Page;
