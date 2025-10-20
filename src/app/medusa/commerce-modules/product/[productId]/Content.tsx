"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api";
import { ProductQK } from "../api";
import { Table, Thead, Tbody } from "@/app/styles/basic/table/table/Table";
import dayjs from "dayjs";
import { AddToCart } from "../product-creation-flows/AddToCart";
import { Cart } from "../product-creation-flows/Cart";
import { CustomerQK, getCustomerList } from "../../customer/api";
import { useState } from "react";

type ContentProps = {
	productId: string;
};

export const Content = (props: ContentProps) => {
	const { productId } = props;

	const [selectedCart, setSelectedCart] = useState<string | string[] | null>(
		null
	);

	const getCustomerListQuery = useQuery({
		queryKey: [CustomerQK.GET_CUSTOMER_LIST],
		queryFn: async () => {
			const res = await getCustomerList();
			return res;
		},
	});

	const productQuery = useQuery({
		queryKey: [ProductQK.GET_PRODUCT_BY_ID],
		queryFn: async () => {
			const res = await getProductById(productId);
			return res;
		},
	});

	return (
		<div className="m-6 space-y-4">
			<div>Product ID: {productId}</div>
			<div>Title: {productQuery.data?.title}</div>
			<div>Status: {productQuery.data?.status}</div>
			<div>Created At: {productQuery.data?.created_at}</div>
			<div>Updated At: {productQuery.data?.updated_at}</div>
			<Cart
				customerQuery={getCustomerListQuery}
				selectedCart={selectedCart}
				setSelectedCart={setSelectedCart}
			/>
			<div className="p-4 border bg-neutral-400">
				<h1>Variants</h1>
				<Table>
					<Thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>SKU</th>
							<th>Prices/Add to Cart</th>
							<th>Created At</th>
							<th>Updated At</th>
						</tr>
					</Thead>
					<Tbody>
						{productQuery.data?.variants.map((variant: any) => (
							<tr key={variant.id}>
								<td>{variant.id}</td>
								<td>{variant.title}</td>
								<td>{variant.sku}</td>
								<td>
									{variant.prices.map((price: any) => (
										<div key={price.id}>
											{price.amount} {price.currency_code}{" "}
											<AddToCart
												variantId={variant.id}
												cartId={selectedCart}
											/>
										</div>
									))}
								</td>
								<td>
									{dayjs(variant.created_at).format(
										"YYYY-MM-DD HH:mm:ss"
									)}
								</td>
								<td>
									{dayjs(variant.updated_at).format(
										"YYYY-MM-DD HH:mm:ss"
									)}
								</td>
							</tr>
						))}
					</Tbody>
				</Table>
			</div>
		</div>
	);
};
