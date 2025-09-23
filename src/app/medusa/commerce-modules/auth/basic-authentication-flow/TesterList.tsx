"use client";

import { useQuery } from "@tanstack/react-query";
import { getTesterList, TesterQK } from "./api";
import { Table, Tbody, Thead } from "@/app/styles/basic/table/table/Table";

export const TesterList = () => {
	const getTesterListQuery = useQuery({
		queryKey: [TesterQK.GET_TESTER_LIST],
		queryFn: async () => {
			const res = await getTesterList();
			return res;
		},
	});

	if (getTesterListQuery.isLoading) {
		return <div>Loading...</div>;
	}

	if (getTesterListQuery.isError) {
		return <div>Error loading testers.</div>;
	}

	console.log(getTesterListQuery.data);

	return (
		<div>
			<h1>Tester List</h1>
			<div className="bg-neutral-500">
				<Table>
					<Thead>
						<tr>
							<th>ID</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th></th>
						</tr>
					</Thead>
					<Tbody>
						{getTesterListQuery.data?.map((tester: any) => (
							<tr key={tester.id}>
								<td>{tester.id}</td>
								<td>{tester.first_name}</td>
								<td>{tester.last_name}</td>
								<td>{tester.email}</td>
								<td>delete</td>
							</tr>
						))}
					</Tbody>
				</Table>
			</div>
		</div>
	);
};
