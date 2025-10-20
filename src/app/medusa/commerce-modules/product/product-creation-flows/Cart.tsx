import { Dropdown } from "@/app/styles/dropdown/universal-dropdown/dropdown/Dropdown";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
	CartQK,
	getCartCheckoutInfoById,
	getCartsByCustomerId,
} from "../../cart/api";

type CartProps = {
	customerQuery: UseQueryResult<any, Error>;
	selectedCart: string | string[] | null;
	setSelectedCart: Dispatch<SetStateAction<string | string[] | null>>;
};

export const Cart = (props: CartProps) => {
	const { customerQuery, selectedCart, setSelectedCart } = props;

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState<
		string | string[] | null
	>(null);

	useEffect(() => {
		/* initialize selected customer */
		if (customerQuery.data) {
			setSelectedCustomer(customerQuery.data[0].id);
			getCartsByCustomerIdMutation.mutate(customerQuery.data[0].id);
		}
	}, [customerQuery.data]);

	const cartQuery = useQuery({
		queryKey: [CartQK.GET_CART_CHECKOUT_INFO_BY_ID, selectedCart],
		queryFn: async () => {
			const res = await getCartCheckoutInfoById(selectedCart as string);
			return res;
		},
	});

	const getCartsByCustomerIdMutation = useMutation({
		mutationFn: async (customerId: string | string[] | null) => {
			if (!customerId) return null;
			const res = await getCartsByCustomerId(customerId as string);
			return res;
		},
		onSuccess: (data) => {
			/* initialize selected cart */
			if (data && data.length > 0) {
				setSelectedCart(data[0].id);
			} else {
				setSelectedCart([]);
			}
		},
		onError: (error) => {
			console.error("Error fetching carts:", error);
		},
	});

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<div className="relative h-4">
			<button
				className="absolute right-0
				underline decoration-dotted cursor-pointer"
				onClick={openModal}
			>
				Cart
			</button>

			{/* Modal */}
			{isModalOpen &&
				createPortal(
					<div
						className="fixed inset-0 flex items-center justify-center z-50
						bg-black/80 bg-opacity-50"
						onClick={closeModal}
					>
						<div
							className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[700px] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Modal Header */}
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold">
									Shopping Cart
								</h2>
								<button
									onClick={closeModal}
									className="text-gray-500 hover:text-gray-700 text-xl font-bold"
								>
									×
								</button>
							</div>

							{/* Modal Content */}

							<div>Select a cart</div>
							{customerQuery.data && (
								<div className="flex gap-2">
									<Dropdown
										mode="regular"
										options={customerQuery.data.map(
											(c: any) => c.id
										)}
										selected={selectedCustomer}
										setSelected={setSelectedCustomer}
										placeholder="Select a customer"
										getLabel={(option: any) => {
											const found =
												customerQuery.data.find(
													(obj: any) =>
														obj.id === option
												);
											return (
												<div>
													{found?.first_name}{" "}
													{found?.last_name}{" "}
													{found?.email}
												</div>
											);
										}}
										controlClassName="flex items-center flex-wrap min-h-8 px-2 py-1 gap-2
										bg-neutral-200
										border-1 border-neutral-700 rounded-md cursor-pointer"
										renderOption={(
											option,
											{ selected, hovered }
										) => {
											const found =
												customerQuery.data.find(
													(obj: any) =>
														obj.id === option
												);

											return (
												<div
													className={`flex items-center px-2 gap-2 ${
														selected
															? "text-blue-500"
															: ""
													} ${
														hovered
															? "bg-neutral-700"
															: ""
													}
													rounded truncate`}
												>
													<span>
														{found?.first_name}{" "}
														{found?.last_name}
													</span>
													<span className="text-neutral-400">
														{found?.email}
													</span>
												</div>
											);
										}}
									/>
									<Dropdown
										mode="regular"
										options={
											getCartsByCustomerIdMutation.data
												? getCartsByCustomerIdMutation.data.map(
														(c: any) => c.id
												  )
												: []
										}
										selected={selectedCart}
										setSelected={setSelectedCart}
										placeholder="Select a cart"
										getLabel={(option: any) => {
											const found =
												getCartsByCustomerIdMutation.data.find(
													(obj: any) =>
														obj.id === option
												);
											return (
												<div>{found?.region_name}</div>
											);
										}}
										controlClassName="flex items-center flex-wrap min-h-8 px-2 py-1 gap-2
										bg-neutral-200
										border-1 border-neutral-700 rounded-md cursor-pointer"
										renderOption={(
											option,
											{ selected, hovered }
										) => {
											const found =
												getCartsByCustomerIdMutation.data.find(
													(obj: any) =>
														obj.id === option
												);

											return (
												<div
													className={`flex items-center px-2 gap-2 ${
														selected
															? "text-blue-500"
															: ""
													} ${
														hovered
															? "bg-neutral-700"
															: ""
													}
													rounded truncate`}
												>
													{found?.region_name}
												</div>
											);
										}}
									/>
								</div>
							)}

							{selectedCart && (
								<div className="my-4 p-4 border bg-neutral-100 rounded">
									<div>
										<strong>Cart ID:</strong> {selectedCart}
									</div>
									<div>
										<strong>Region:</strong>{" "}
										{cartQuery.data?.region_name}
									</div>
									<div>
										<strong>Currency:</strong>{" "}
										{cartQuery.data?.currency_code}
									</div>
								</div>
							)}

							{/* Cart Items */}

							<div className="space-y-4">
								{cartQuery.data &&
								cartQuery.data.items.length > 0 ? (
									cartQuery.data.items.map((item: any) => {
										return (
											<div
												key={item.id}
												className="pb-2
												border-b border-dotted"
											>
												<span>
													Product Title:{" "}
													{item.product_title}
												</span>
												<div className="flex justify-between">
													<span>
														Variant Title:{" "}
														{item.variant_title}
													</span>
													<span>
														Unit Price: $
														{item.unit_price}
													</span>
												</div>
												<div className="text-sm text-gray-500">
													Qty: {item.quantity}
												</div>
											</div>
										);
									})
								) : (
									<div className="text-gray-500">
										No items in cart
									</div>
								)}
							</div>

							{/* Modal Footer */}
							<div
								className="mt-6 p-2
								bg-neutral-100 rounded"
							>
								<div className="flex justify-between items-center mb-4">
									<span className="font-semibold">
										Total: {cartQuery.data?.total}{" "}
										{cartQuery.data?.currency_code}
									</span>
								</div>
								<div className="flex gap-2">
									<button
										onClick={closeModal}
										className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
									>
										Continue Shopping
									</button>
									<button
										className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
										disabled
									>
										Checkout
									</button>
								</div>
							</div>
						</div>
					</div>,
					document.body
				)}
		</div>
	);
};
