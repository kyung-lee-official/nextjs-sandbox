import Link from "next/link";

const Block = ({
	title,
	list,
	children,
}: {
	title: string;
	list: { link: string; text: string }[];
	children?: React.ReactNode;
}) => {
	return (
		<div className="flex flex-col gap-3">
			<h1 className="text-xl">{title}</h1>
			{children}
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
						link: "/animation/framer-motion/animatepresence",
						text: "AnimatePresence",
					},
					{
						link: "/animation/framer-motion/animatepresence-bug",
						text: "AnimatePresence bug",
					},
					{
						link: "/animation/framer-motion/animation",
						text: "animation",
					},
					{
						link: "/animation/framer-motion/buttons",
						text: "buttons",
					},
					{
						link: "/animation/framer-motion/chitubox-drop",
						text: "chitubox-drop",
					},
					{
						link: "/animation/framer-motion/clippath",
						text: "clippath",
					},
					{
						link: "/animation/framer-motion/gooey-effect",
						text: "gooey-effect",
					},
					{
						link: "/animation/framer-motion/layout-animation",
						text: "layout animation",
					},
					{
						link: "/animation/framer-motion/motion-path",
						text: "motion path",
					},
					{
						link: "/animation/framer-motion/theme-switch",
						text: "theme switch",
					},
					{
						link: "/animation/framer-motion/variants",
						text: "variants",
					},
				]}
			/>
			<Block
				title="Animation | keyframes"
				list={[
					{
						link: "/animation/keyframes/basic",
						text: "basic",
					},
				]}
			/>
			<Block
				title="Animation | Lottie"
				list={[
					{
						link: "/animation/lottie/lottie-basic",
						text: "lottie basic",
					},
				]}
			/>
			<Block
				title="Animation | React Spring"
				list={[
					{
						link: "/animation/react-spring/basic-spring",
						text: "basic spring",
					},
					{
						link: "/animation/react-spring/usetransition",
						text: "useTransition",
					},
					{
						link: "/animation/react-spring/declaretive-vs-imperative",
						text: "declaretive vs imperative",
					},
					{
						link: "/animation/react-spring/chain",
						text: "chain",
					},
					{
						link: "/animation/react-spring/trail",
						text: "trail",
					},
				]}
			>
				<Link
					href={"https://github.com/pmndrs/react-spring/issues/2146"}
					className={"underline"}
				>
					Bug #2146
				</Link>
			</Block>
			<Block
				title="Auth | Google OAuth2"
				list={[
					{ link: "/auth/google-oauth-2/vanilla", text: "vanilla" },
				]}
			/>
			<Block
				title="Casl"
				list={[{ link: "/casl/basic", text: "basic" }]}
			/>
			<Block
				title="Files"
				list={[
					{ link: "/files/image-cropper", text: "image cropper" },
					{ link: "/files/file-transmit", text: "file transmit" },
					{ link: "/files/tencent-cos", text: "tencent cos" },
				]}
			/>
			<Block
				title="Javascript | React"
				list={[
					{
						link: "/js/react/context",
						text: "context",
					},
					{
						link: "/js/react/event-listener",
						text: "event listener",
					},
					{ link: "/js/react/new-date", text: "new date" },
				]}
			/>
			<Block
				title="Javascript | Vanilla"
				list={[
					{
						link: "/js/vanilla/drag-and-drop",
						text: "drag and drop",
					},
					{
						link: "/js/vanilla/event-listener",
						text: "event listener",
					},
					{ link: "/js/vanilla/new-date", text: "new date" },
				]}
			/>
			<Block
				title="Payment"
				list={[
					{
						link: "/payment/paypal",
						text: "paypal",
					},
				]}
			/>
			<Block
				title="Styles | Menu"
				list={[
					{
						link: "/styles/menu/menu-1",
						text: "menu 1",
					},
					{
						link: "/styles/menu/menu-2",
						text: "menu 2",
					},
					{
						link: "/styles/menu/cat1/menu-3",
						text: "menu 3",
					},
					{
						link: "/styles/menu/cat1/menu-4",
						text: "menu 4",
					},
				]}
			/>
		</main>
	);
}
