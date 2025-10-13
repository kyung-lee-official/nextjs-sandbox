import axios from "axios";

export enum ProductQK {
	GET_PRODUCT_LIST = "get-product-list",
}

export async function createProducts(data: any) {
	const res = await axios.post(`/commerce-modules/product`, data, {
		baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
		headers: {
			"x-publishable-api-key":
				process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
		},
	});
	return res.data;
}

export async function publishProduct(productId: string) {
	const res = await axios.put(
		`/commerce-modules/product/publish/${productId}`,
		{},
		{
			baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
			headers: {
				"x-publishable-api-key":
					process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
			},
		}
	);
	return res.data;
}

export async function getProductList() {
	const res = await axios.get(`/commerce-modules/product`, {
		baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
		headers: {
			"x-publishable-api-key":
				process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
		},
	});
	return res.data;
}

export async function softDeleteProduct(productId: string) {
	const res = await axios.delete(
		`/commerce-modules/product/soft-delete/${productId}`,
		{
			baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
			headers: {
				"x-publishable-api-key":
					process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
			},
		}
	);
	return res.data;
}

export async function deleteProduct(productId: string) {
	const res = await axios.delete(`/commerce-modules/product/${productId}`, {
		baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
		headers: {
			"x-publishable-api-key":
				process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
		},
	});
	return res.data;
}
