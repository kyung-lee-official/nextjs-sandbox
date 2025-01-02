"use client";

type PropsWithText = {
	text: string;
};
type PropsWithChildren = {
	children: React.ReactNode;
};

const Comp = (props: PropsWithText | PropsWithChildren) => {
	if ("text" in props) {
		return <div className="w-fit p-1 border">string</div>;
	}
	return <div className="w-fit p-1 border">{props.children}</div>;
};

export const Content = () => {
	return (
		<div className="p-2">
			<p>
				While React functional components don't support traditional
				function overloading like in other languages, you can achieve
				similar behavior using TypeScript and conditional props.
			</p>
			<p>Check out code for details</p>
			<Comp text={"pass in 'text'"} />
			<Comp>use children</Comp>
		</div>
	);
};
