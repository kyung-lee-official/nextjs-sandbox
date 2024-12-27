"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/data-fetching/tanstack-query/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UploadFilesMulti } from "./UploadFilesMulti";

const Content = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="flex flex-col gap-10 p-10 w-1/2">
				<UploadFilesMulti />
			</div>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default Content;
