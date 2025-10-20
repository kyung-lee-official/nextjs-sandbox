import { useMutation } from "@tanstack/react-query";
import { CartQK, updateCart } from "../../cart/api";
import { queryClient } from "@/app/data-fetching/tanstack-query/queryClient";

type AddToCartProps = {
	variantId: string;
	cartId: string | string[] | null;
};

export const AddToCart = (props: AddToCartProps) => {
	const { variantId, cartId } = props;

	const updateCartMutation = useMutation({
		mutationFn: async (data) => {
			const res = await updateCart(cartId as string, {
				items: [{ variant_id: variantId, quantity: 1 }],
			});
			return res;
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [CartQK.GET_CART_CHECKOUT_INFO_BY_ID, cartId],
			});
		},
	});

	return (
		<button
			className="underline decoration-dotted cursor-pointer"
			onClick={() => {
				updateCartMutation.mutate();
			}}
		>
			Add to Cart
		</button>
	);
};
