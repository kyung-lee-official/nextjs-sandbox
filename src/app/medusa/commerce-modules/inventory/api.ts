import axios from "axios";

export enum InventoryQK {
	GET_INVENTORY_LIST = "get_inventory_list",
}

export const getInventoryList = async () => {
	const res = await axios.get(`/commerce-modules/inventory`, {
		baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
		headers: {
			"x-publishable-api-key":
				process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
		},
	});
	return res.data;
};
