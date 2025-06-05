export type Product = {
	id: number;
	name: string;
	category: string;
	price: number;
	stock: number;
	/* Added type to distinguish rows */
	type: "product" | "categorySummary";
	/* For category summary rows */
	summaryText?: string;
};

export const makeData = (len: number): Product[] => {
	const data: Product[] = [];
	const categories = [
		"Electronics",
		"Books",
		"Clothing",
		"Food",
		"Home Goods",
		"Sports",
	];
	for (let i = 0; i < len; i++) {
		const category =
			categories[Math.floor(Math.random() * categories.length)];
		data.push({
			id: i,
			name: `Product ${i}`,
			category: category,
			price: parseFloat((Math.random() * 100).toFixed(2)),
			stock: Math.floor(Math.random() * 500),
			type: "product",
		});

		/* Add a category summary row every ~10 products for demonstration */
		if (i > 0 && i % 10 === 0) {
			data.push({
				/* Use a float ID or another unique identifier to ensure uniqueness */
				id: i + 0.5,
				name: "",
				category: category,
				price: 0,
				/* Dummies, as they won't be displayed */
				stock: 0,
				type: "categorySummary",
				summaryText: `Category Summary for '${category}' (items ${
					i - 9
				} to ${i})`,
			});
		}
	}
	return data;
};
