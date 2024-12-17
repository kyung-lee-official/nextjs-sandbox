"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { UserQK, UserResponse } from "./types/user";
import { useEffect, useState } from "react";
import { queryClient } from "@/app/data-fetching/tanstack-query/queryClient";

export const Content = () => {
	/**
	 * the reason to fill oldData is to avoid 'undefined' value, however you could use 'undefined' if you want.
	 * the initial data doesn't matter, because you could use a loading UI to block the form and pervent user from submitting
	 * until data from server is fetched.
	 */
	const [oldData, setOldData] = useState<UserResponse>({
		id: 0,
		name: "",
		age: 0,
	});
	const [newData, setNewData] = useState<UserResponse>(oldData);
	/**
	 * the reason to separate properties into states is to make data editing easier, this way you can edit each property separately.
	 * then you can use them to update newData in a useEffect snippet.
	 */
	const [name, setName] = useState<string>(oldData.name);
	const [age, setAge] = useState<number>(oldData.age);

	const usersQuery = useQuery<UserResponse, AxiosError>({
		queryKey: [UserQK.GET_ALL_USERS],
		queryFn: async () => {
			const res = await axios.get<UserResponse>("/api/update-data");
			return res.data;
		},
		retry: false,
		refetchOnWindowFocus: false,
	});

	const mutation = useMutation({
		mutationFn: async () => {
			const res = await axios.patch<UserResponse>("/api/update-data", {
				name: name,
				age: age,
			});
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [UserQK.GET_ALL_USERS],
			});
		},
		onError: () => {},
	});

	/* for initializing data */
	useEffect(() => {
		if (usersQuery.data) {
			/**
			 * DON'T DO THIS:
			 * const initialData = usersQuery.data;
			 *
			 * because if you're creating a new object, you don't need the 'id' property.
			 * response data structure doesn't always match the structure of the object you're using in the form.
			 */
			const initialData = {
				id: usersQuery.data.id,
				name: usersQuery.data.name,
				age: usersQuery.data.age,
			};
			setOldData(initialData);
			setNewData(initialData);
			setName(initialData.name);
			setAge(initialData.age);
		}
	}, [usersQuery.data]);

	/* for updating data */
	useEffect(() => {
		setNewData({
			id: newData.id,
			name: name,
			age: age,
		});
	}, [name, age]);

	if (usersQuery.isPending) {
		return <div>loading...</div>;
	}

	if (usersQuery.isError) {
		return <div>error: {usersQuery.error.message}</div>;
	}

	return (
		<div className="flex items-center p-4 gap-6">
			<form>
				<div className="flex items-center gap-4">
					<div>{newData.id}</div>
					<input
						className="p-1"
						value={newData.name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<input
						type="number"
						value={newData.age}
						onChange={(e) => {
							setAge(parseInt(e.target.value));
						}}
					/>
				</div>
			</form>
			<button
				className="p-1 border"
				onClick={() => {
					mutation.mutate();
				}}
			>
				Save
			</button>
		</div>
	);
};
