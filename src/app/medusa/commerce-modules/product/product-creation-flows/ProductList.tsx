import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getProductList, ProductQK } from "../api";
import { Table, Tbody, Thead } from "@/app/styles/basic/table/table/Table";
import { DeleteProduct } from "./DeleteProduct";
import { SoftDeleteProduct } from "./SoftDeleteProdcut";
import { PublishProduct } from "./PublishProduct";
import Link from "next/link";

export const ProductList = () => {
	const productQuery = useQuery({
		queryKey: [ProductQK.GET_PRODUCT_LIST],
		queryFn: async () => {
			const res = await getProductList();
			return res;
		},
	});

	if (productQuery.isLoading) {
		return <div> ...</div>;
	}

	if (productQuery.isError) {
		return <div>Error loading products</div>;
	}

	return (
		<div className="relative">
			<div className="flex justify-between mb-2">
				<h1>Product List</h1>
			</div>
			<div className="bg-neutral-500">
				<Table>
					<Thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Status</th>
							<th>Created At</th>
							<th>Updated At</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
					</Thead>
					<Tbody>
						{productQuery.data?.map((product: any) => (
							<tr key={product.id}>
								<td>{product.id}</td>
								<td>{product.title}</td>
								<td>{product.status}</td>
								<td>
									{dayjs(product.created_at).format(
										"YYYY-MM-DD HH:mm:ss"
									)}
								</td>
								<td>
									{dayjs(product.updated_at).format(
										"YYYY-MM-DD HH:mm:ss"
									)}
								</td>
								<td>
									<Link
										href={`/medusa/commerce-modules/product/${product.id}`}
										className="underline decoration-dotted"
									>
										Details
									</Link>
								</td>
								<td>
									<PublishProduct productId={product.id} />
								</td>
								<td>
									<SoftDeleteProduct productId={product.id} />
								</td>
								<td>
									<DeleteProduct productId={product.id} />
								</td>
							</tr>
						))}
					</Tbody>
				</Table>
			</div>
		</div>
	);
};
