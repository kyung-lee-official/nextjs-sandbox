"use client";

import { queryClient } from "@/app/data-fetching/tanstack-query/queryClient";
import { QueryClientProvider, useMutation } from "@tanstack/react-query";
import axios from "axios";
import queryString from "query-string";

const Example = () => {
	const mutation = useMutation({
		mutationFn: async () => {
			const complexData = {
				key1: "value1",
				arr: [1, 2, 3],
				obj: {
					nestedKey: "nestedValue",
				},
			};
			const serialized = queryString.stringify(complexData);
			console.log("Serialized complex data:", serialized);

			const response = await axios.post(
				"/api/data",
				{ test: "hello" },
				{
					baseURL: "https://example.com",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer this.is.a.mock.token`,
					},
					/**
					 * axios's params options is only reccommended for simple query parameters.
					 * For complex query parameters, use https://www.npmjs.com/package/query-string
					 */
					params: {
						"query-param": "value",
					},
				}
			);
			return response.data;
		},
	});
	return (
		<div className="p-4">
			Check out the DevTools Network tab for request details{" "}
			<button
				className="bg-blue-500 text-white p-2 rounded cursor-pointer"
				onClick={() => mutation.mutate()}
			>
				Send Request
			</button>
		</div>
	);
};

const Content = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Example />
		</QueryClientProvider>
	);
};

export default Content;
