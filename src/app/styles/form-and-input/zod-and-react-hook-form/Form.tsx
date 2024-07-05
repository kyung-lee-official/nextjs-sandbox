import { z } from "zod";
import { Input } from "./Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const signIn = async (body: {
	email: string;
	password: string;
}): Promise<any> => {
	const res = await axios.post("/member-auth/signin", body, {
		baseURL: process.env.NEXT_PUBLIC_API_HOST,
	});
	return res.data;
};

interface IFormInput {
	email: string;
	password: string;
}

const schema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(1, { message: "Required" }),
});

export const Form = () => {
	const { register, handleSubmit, formState } = useForm<IFormInput>({
		mode: "onChange",
		resolver: zodResolver(schema),
	});

	const mutation = useMutation<any, AxiosError, IFormInput>({
		mutationKey: ["signIn"],
		mutationFn: (data: IFormInput) => {
			return signIn(data);
		},
	});

	const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
		mutation.mutate(data);
	};

	return (
		<form
			className="flex flex-col gap-4 w-full"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				title={"title"}
				isInvalid={!!formState.errors.email}
				isRequired={true}
				errorMessage={formState.errors.email?.message}
				{...register("email")}
				disabled={mutation.isPending}
			/>
			<Input
				title={"Password"}
				isInvalid={!!formState.errors.password}
				isRequired={true}
				errorMessage={formState.errors.password?.message}
				{...register("password")}
				type="password"
				placeholder="Password"
				disabled={mutation.isPending}
			/>
			{mutation.isError && mutation.error.response?.status === 401 && (
				<div className="text-base text-red-400 font-bold">
					Account or password is incorrect
				</div>
			)}
			<button type="submit" className="font-bold">
				Sign In
			</button>
		</form>
	);
};
