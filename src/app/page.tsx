import Link from "next/link";

const Block = ({
	title,
	list,
}: {
	title: string;
	list: { link: string; text: string }[];
}) => {
	return (
		<div className="flex flex-col gap-3">
			<h1 className="text-xl">{title}</h1>
			<div className="flex flex-col">
				{list.map((item) => {
					return (
						<Link key={item.link} href={item.link}>
							{item.text}
						</Link>
					);
				})}
			</div>
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
					{
						link: "/animation/animejs/chitubox-logo-stroke-dashoffset",
						text: "chitubox-logo-stroke-dashoffset",
					},
					{
						link: "/animation/animejs/hover",
						text: "hover",
					},
					{
						link: "/animation/animejs/lemon-drop",
						text: "lemon drop",
					},
					{
						link: "/animation/animejs/line-drawing",
						text: "line drawing",
					},
					{
						link: "/animation/animejs/requestanimationframe",
						text: "requestanimationframe",
					},
					{
						link: "/animation/animejs/stroke-dashoffset",
						text: "stroke-dashoffset",
					},
					{
						link: "/animation/animejs/svg-sphere",
						text: "svg sphere",
					},
					{
						link: "/animation/animejs/timeline",
						text: "timeline",
					},
				]}
			/>
			<Block
				title="Animation | Framer Motion"
				list={[
					{
						link: "/animation/framer-motion/animate-function",
						text: "animate function",
					},
					{
						link: "/animation/framer-motion/motion-path",
						text: "motion path",
					},
				]}
			/>
		</main>
	);
}
