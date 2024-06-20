import { ReactNode } from "react";
import Link from "next/link";

const Block = ({
	title,
	list,
}: {
	title: string;
	list: { link: string; text: string }[];
}) => {
	return (
		<div className="flex flex-col">
			<h1 className="text-xl">{title}</h1>
			{list.map((item) => {
				return <Link href={item.link}>{item.text}</Link>;
			})}
		</div>
	);
};

export default function Home() {
	return (
		<main className="flex flex-col items-start w-fit min-h-svh p-10 m-auto gap-6">
			<Block title="Home" list={[{ link: "/", text: "home" }]} />
			<Block
				title="Animation | AnimeJS"
				list={[
					{
						link: "/animation/animejs/anime-basic",
						text: "anime basic",
					},
				]}
			/>
		</main>
	);
}
