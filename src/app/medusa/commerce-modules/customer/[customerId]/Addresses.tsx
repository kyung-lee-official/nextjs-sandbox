import { AddAddress } from "./AddAddress";

type AddressProps = {
	address_1: string;
	city: string;
	country_code: string;
	postal_code: string;
	first_name: string;
	last_name: string;
};

const Address = (props: AddressProps) => {
	const {
		address_1,
		city,
		country_code,
		postal_code,
		first_name,
		last_name,
	} = props;
	return (
		<div className="border-t border-dotted">{`${first_name} ${last_name}, ${address_1}, ${city}, ${country_code}, ${postal_code}`}</div>
	);
};

type AddressesProps = {
	customerId: string;
	addresses: AddressProps[];
};

export const Addresses = (props: AddressesProps) => {
	const { customerId, addresses } = props;
	return (
		<div
			className="p-2
			border border-neutral-700 border-dashed rounded"
		>
			<div className="flex justify-between">
				<h2>Addresses</h2>
				<AddAddress customerId={customerId} />
			</div>
			{addresses.map((address, index) => (
				<div key={index} className="mt-2">
					<Address {...address} />
				</div>
			))}
		</div>
	);
};
