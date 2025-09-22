"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../data-fetching/tanstack-query/queryClient";
import { ReactNode } from "react";

type MedusaWrapperProps = {
	children?: ReactNode;
};

export const MedusaWrapper = ({ children }: MedusaWrapperProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};
