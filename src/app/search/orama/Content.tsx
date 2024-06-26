"use client";

import { OramaCloud, useSearch } from "@oramacloud/client/react";
import Link from "next/link";
import { useState } from "react";

function Search() {
	const [term, setTerm] = useState<string>("");
	const { results, error } = useSearch({
		term: term,
		limit: 5,
	});

	return (
		<div className="flex flex-col w-96 h-8 gap-4">
			<input
				type="text"
				className="p-2
				bg-neutral-100
				rounded
				outline-none"
				onChange={(e) => {
					setTerm(e.target.value);
				}}
			/>
			<div className="flex flex-col gap-4">
				{term &&
					results?.hits.map((hit) => {
						console.log(hit);
						return (
							<Link
								key={hit.id}
								href={hit.document.path}
								className="p-4
								border-neutral-300 border-2 rounded"
							>
								<h2
									className="font-bold
								overflow-hidden whitespace-nowrap text-ellipsis"
								>
									{hit.document.title}
								</h2>
								<p className="overflow-hidden whitespace-nowrap text-ellipsis">
									{hit.document.content}
								</p>
							</Link>
						);
					})}
			</div>
		</div>
	);
}

const Content = () => {
	return (
		<div className="p-10">
			<OramaCloud
				endpoint="https://cloud.orama.run/v1/indexes/xomorf-com-dw7bqy"
				apiKey="mmO2SgNC51t95eYBetDaztPXDSbLVuvy"
			>
				<Search />
			</OramaCloud>
		</div>
	);
};

export default Content;
