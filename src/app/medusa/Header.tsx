import { Customer } from "./commerce-modules/customer/Customer";
import { Region } from "./commerce-modules/region/Region";

type HeaderProps = {
	regionId: string | undefined;
	customerId: string | undefined;
};

export const Header = (props: HeaderProps) => {
	const { regionId, customerId } = props;
	return (
		<div
			className="flex h-14 p-2 gap-2
			border-b border-dashed border-neutral-700"
		>
			<Region regionId={regionId} />
			<Customer customerId={customerId} />
		</div>
	);
};
