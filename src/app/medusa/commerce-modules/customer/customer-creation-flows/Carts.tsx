"use client";

import { useQuery } from "@tanstack/react-query";
import { CartQK, getCartsByCustomerId } from "../../cart/api";
import Link from "next/link";

type CartsProps = {
	customerId: string;
};

export const Carts = (props: CartsProps) => {
	const { customerId } = props;
	const cartsQuery = useQuery({
		queryKey: [CartQK.GET_CARTS_BY_CUSTOMER_ID, customerId],
		queryFn: async () => {
			const res = await getCartsByCustomerId(customerId);
			return res;
		},
	});

	if (cartsQuery.isLoading) {
		return <div>Loading...</div>;
	}

	if (cartsQuery.isError) {
		return <div>Error loading carts.</div>;
	}

	return (
		<div>
			{cartsQuery.data.map((cart: any) => (
				<Link
					key={cart.id}
					href={`/medusa/commerce-modules/cart/${cart.id}`}
					className="underline decoration-dotted"
				>
					{cart.region_name}
				</Link>
			))}
		</div>
	);
};
