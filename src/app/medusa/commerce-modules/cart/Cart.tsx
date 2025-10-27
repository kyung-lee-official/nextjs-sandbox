import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
	CartQK,
	completePaymentCollection,
	deleteCart,
	forceCompleteCart,
	getCartByRegionIdSalesChannelIdCustomerId,
} from "./api";
import { useRouter } from "next/navigation";
import { getPaymentCollectionByCartId, PaymentQK } from "../payment/api";
import Link from "next/link";
import { ShippingAddress } from "./ShippingAddress";
import { CustomerQK, getCustomerById } from "../customer/api";

type CartProps = {
	regionId: string | undefined;
	salesChannelId: string | undefined;
	customerId: string | undefined;
};

export const Cart = (props: CartProps) => {
	const { regionId, salesChannelId, customerId } = props;
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const getCartByRegionIdAndSalesChannelIdAndCustomerIdQuery = useQuery({
		queryKey: [
			CartQK.GET_CART_BY_REGION_ID_AND_SALES_CHANNEL_ID_AND_CUSTOMER_ID,
			regionId,
			salesChannelId,
			customerId,
		],
		queryFn: async () => {
			const res = await getCartByRegionIdSalesChannelIdCustomerId(
				regionId as string,
				salesChannelId as string,
				customerId as string
			);
			return res;
		},
		enabled: !!regionId && !!salesChannelId && !!customerId,
	});

	const getPaymentCollectionByCartIdQuery = useQuery({
		queryKey: [
			PaymentQK.GET_PAYMENT_COLLECTION_BY_CART_ID,
			getCartByRegionIdAndSalesChannelIdAndCustomerIdQuery.data?.id,
		],
		queryFn: async () => {
			const res = await getPaymentCollectionByCartId(
				getCartByRegionIdAndSalesChannelIdAndCustomerIdQuery.data?.id
			);
			return res;
		},
		enabled:
			!!getCartByRegionIdAndSalesChannelIdAndCustomerIdQuery.data?.id,
	});

	const customerQuery = useQuery({
		queryKey: [CustomerQK.GET_CUSTOMER_BY_ID, customerId],
		queryFn: async () => {
			const res = await getCustomerById(customerId as string);
			return res;
		},
		enabled: !!customerId,
	});

	const completePaymentCollectionMutation = useMutation({
		mutationFn: async (cartId: string) => {
			const res = await completePaymentCollection(cartId);
			return res;
		},
		onSuccess: (data) => {
			router.push(
				`/medusa/commerce-modules/payment/payment-collection/${data.completed_cart.id}`
			);
		},
	});

	const forceCompleteCartMutation = useMutation({
		mutationFn: async (cartId: string) => {
			const res = await forceCompleteCart(cartId);
			return res;
		},
		onSuccess: (data) => {
			console.log(data);
		},
	});

	const deleteCartMutation = useMutation({
		mutationFn: async (cartId: string) => {
			const res = await deleteCart(cartId);
			return res;
		},
		onSuccess: () => {
			getCartByRegionIdAndSalesChannelIdAndCustomerIdQuery.refetch();
		},
	});

	if (getCartByRegionIdAndSalesChannelIdAndCustomerIdQuery.isLoading) {
		return <div>Loading cart...</div>;
	}

	if (getCartByRegionIdAndSalesChannelIdAndCustomerIdQuery.isError) {
		return <div>Error loading cart</div>;
	}

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const { data } = getCartByRegionIdAndSalesChannelIdAndCustomerIdQuery;

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
							{data && (
								<div className="my-4 p-4 border bg-neutral-100 rounded">
									<div>
										<strong>Cart ID:</strong> {data.id}
									</div>
									<div>
										<strong>Region:</strong>{" "}
										{data.region.name}
									</div>
									<div>
										<strong>Currency:</strong>{" "}
										{data.currency_code}
									</div>
									<div>
										<strong>Shipping Address:</strong>{" "}
										<ShippingAddress
											cartId={data.id}
											addresses={
												customerQuery.data.addresses
											}
										/>
									</div>
								</div>
							)}
							{/* Cart Items */}
							<div className="space-y-4">
								{data && data.items.length > 0 ? (
									data.items.map((item: any) => {
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
														Unit Price:{" "}
														{data.currency_code}{" "}
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
								className="mt-6 p-2 space-y-3
								bg-neutral-100 rounded"
							>
								<div className="flex justify-between items-center mb-4">
									<span className="font-semibold">
										Total: {data.total} {data.currency_code}
									</span>
								</div>
								<div className="flex gap-2">
									<button
										onClick={closeModal}
										className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
									>
										Continue Shopping
									</button>
									{getPaymentCollectionByCartIdQuery.data
										.payment_collection ? (
										<Link
											href={`/medusa/commerce-modules/payment/payment-collection/${getPaymentCollectionByCartIdQuery.data.payment_collection.id}`}
											className="flex-1 px-4 py-2 border border-neutral-300 border-dashed rounded"
										>
											Go to Payment Collection
										</Link>
									) : (
										<button
											className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
											onClick={() => {
												completePaymentCollectionMutation.mutate(
													data.id
												);
											}}
										>
											Checkout
										</button>
									)}
								</div>
								<div className="flex gap-3">
									<button
										className="text-red-500
										underline decoration-dotted cursor-pointer"
										onClick={() => {
											forceCompleteCartMutation.mutate(
												data.id
											);
										}}
									>
										Complete Cart Manually
									</button>
									<button
										className="text-red-500
										underline decoration-dotted cursor-pointer"
										onClick={() => {
											deleteCartMutation.mutate(data.id);
										}}
									>
										Delete Cart Manually
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
