import React from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const schema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Invalid email address"),
});

function SimpleContactForm() {
	const form = useForm({
		defaultValues: {
			email: "",
		},
		/* you can either specify the schema here or in the field */
		validators: {
			onChange: schema,
		},
		onSubmit: async ({ value }) => {
			console.log("Form submitted with:", value);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<div>
				<label htmlFor="email">Email</label>
				<form.Field
					name="email"
					/* in case you want to specify the schema for this field only */
					// validators={{
					// 	onChange: schema.shape.email,
					// }}
				>
					{(field) => (
						<>
							<input
								id="email"
								type="email"
								className="border p-2 rounded w-full"
								value={field.state.value}
								onChange={(e) =>
									field.handleChange(e.target.value)
								}
							/>
							{field.state.meta.errors && (
								<span className="text-red-500">
									{field.state.meta.errors[0]?.message}
								</span>
							)}
						</>
					)}
				</form.Field>
			</div>
			<button
				type="submit"
				disabled={form.state.isSubmitting}
				className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${
					form.state.isSubmitting
						? "opacity-50 cursor-not-allowed"
						: ""
				}
				`}
			>
				Submit
			</button>
		</form>
	);
}

export default SimpleContactForm;
