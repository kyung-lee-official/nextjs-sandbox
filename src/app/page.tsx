import Link from "next/link";
import { ReactNode } from "react";

const Block = ({
	title,
	list,
	children,
}: {
	title: string | ReactNode;
	list: { link: string; text: string }[];
	children?: ReactNode;
}) => {
	return (
		<div
			className="flex flex-col p-6 gap-3
			bg-white/50
			rounded-lg"
		>
			<h1 className="text-xl">{title}</h1>
			{children}
			<div className="flex flex-col">
				{list.map((item) => {
					return (
						<Link
							key={item.link}
							href={item.link}
							className="hover:underline"
						>
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
		<main
			className="grid
			grid-cols-1
			sm:grid-cols-2
			md:grid-cols-3
			lg:grid-cols-4
			xl:grid-cols-5
			min-h-svh p-10 gap-6
			bg-gradient-to-br from-cyan-500/60 to-purple-500/60"
		>
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
					{
						link: "/animation/keyframes/tailwind",
						text: "tailwind",
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
				title={<del>Animation | React Spring</del>}
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
				title="Chart | Visx"
				list={[{ link: "/chart/visx/barstack", text: "barstack" }]}
			/>
			<Block
				title="Data Fetching"
				list={[
					{
						link: "/data-fetching/tanstack-query",
						text: "TanStack Query",
					},
				]}
			/>
			<Block
				title="Files"
				list={[
					{ link: "/files/image-cropper", text: "image cropper" },
					{
						link: "/files/file-transmit",
						text: "file transmit (upload and download)",
					},
					{
						link: "/files/file-transmit/upload-files-multi",
						text: "upload files (one by one in a loop)",
					},
					{ link: "/files/tencent-cos", text: "tencent cos" },
				]}
			/>
			<Block
				title="Javascript | React"
				list={[
					{
						link: "/js/react/array-map-caveat",
						text: "array map() caveat",
					},
					{
						link: "/js/react/component-overload",
						text: "Component Overload",
					},
					{
						link: "/js/react/falsy-value",
						text: "falsy value",
					},
					{
						link: "/js/react/setstate-union-type",
						text: "setState union type",
					},
					{
						link: "/js/react/context",
						text: "context",
					},
					{
						link: "/js/react/event-listener",
						text: "event listener",
					},
					{
						link: "/js/react/functional-update",
						text: "functional update",
					},
					{
						link: "/js/react/generics/arrow-component",
						text: "generics | arrow component",
					},
					{
						link: "/js/react/suspense",
						text: "Suspense",
					},
					{
						link: "/js/react/useeffect-order",
						text: "useEffect order",
					},
					{
						link: "/js/react/useeffect-timer",
						text: "useEffect timer",
					},
					{ link: "/js/react/useref", text: "useRef" },
					{ link: "js/react/usereducer", text: "useReducer" },
					{ link: "/js/react/usetransition", text: "useTransition" },
					{
						link: "/js/react/resize-observer",
						text: "work with resize observer",
					},
				]}
			/>
			<Block
				title="Javascript | React Features"
				list={[
					{
						link: "/js/react-features/drag-and-drop",
						text: "drag and drop",
					},
				]}
			/>
			<Block
				title="Javascript | Vanilla"
				list={[{ link: "/js/vanilla/new-date", text: "new date" }]}
			/>
			<Block
				title="Libraries"
				list={[
					{ link: "/libraries/local-library", text: "local library" },
				]}
			/>
			<Block
				title="NextJS"
				list={[
					{
						link: "/nextjs/data-crud",
						text: "data CRUD best practice",
					},
					{
						link: "/nextjs/image-onload",
						text: "image-onload",
					},
					{
						link: "/nextjs/usepathname",
						text: "usePathname",
					},
				]}
			/>
			<Block
				title="Search"
				list={[
					{
						link: "/search/orama",
						text: "orama",
					},
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
				title="Styles | Ant Design"
				list={[
					{
						link: "/styles/ant-design/tables",
						text: "tables",
					},
				]}
			/>
			<Block
				title="Styles | Basic"
				list={[
					{
						link: "/styles/basic/aspect-ratio",
						text: "aspect-ratio",
					},
					{
						link: "/styles/basic/clippath",
						text: "clippath",
					},
					{
						link: "/styles/basic/gradient-text",
						text: "gradient text",
					},
					{
						link: "/styles/basic/css-translate",
						text: "css translate",
					},
					{
						link: "/styles/basic/image",
						text: "image",
					},
					{
						link: "/styles/basic/zoomable",
						text: "zoomable image or video",
					},
					{
						link: "/styles/basic/mix-blend-difference",
						text: "mix blend difference",
					},
					{
						link: "/styles/basic/overflow-x",
						text: "overflow-x",
					},
					{
						link: "/styles/basic/sticky",
						text: "sticky",
					},
					{
						link: "/styles/basic/svg-icon-inline-text",
						text: "svg icon inline text",
					},
					{
						link: "/styles/basic/text-ellipsis",
						text: "text ellipsis",
					},
					{
						link: "/styles/basic/tooltip",
						text: "tooltip",
					},
					{
						link: "/styles/basic/turing-fonts",
						text: "turing fonts",
					},
				]}
			/>
			<Block
				title="Styles | reactflow.dev"
				list={[
					{
						link: "/styles/reactflow/tree-like",
						text: "tree like",
					},
				]}
			/>
			<Block
				title="Styles | Modal (Portal)"
				list={[
					{
						link: "/styles/modal/modal-dialog",
						text: "traditional modal dialog",
					},
					{
						link: "/styles/modal/modal-dialog-example",
						text: "traditional modal dialog example",
					},
					{
						link: "/styles/modal/dialog",
						text: "html <dialog>",
					},
				]}
			/>
			<Block
				title="Styles | Dropdown"
				list={[
					{
						link: "/styles/dropdown/basic",
						text: "basic",
					},
					{
						link: "/styles/dropdown/header-dropdown",
						text: "header dropdown",
					},
					{
						link: "/styles/dropdown/hover-dropdown",
						text: "hover dropdown",
					},
					{
						link: "/styles/dropdown/online-dropdown",
						text: "online dropdown",
					},
					{
						link: "/styles/dropdown/universal-dropdown",
						text: "universal dropdown",
					},
					{
						link: "/styles/dropdown/universal-dropdown-old",
						text: "universal dropdown old",
					},
				]}
			/>
			<Block
				title="Styles | Form and Input"
				list={[
					{
						link: "/styles/form-and-input/zod-and-react-hook-form",
						text: "zod and react-hook-form",
					},
					{
						link: "/styles/form-and-input/integer-input",
						text: "Integer Input",
					},
					{
						link: "/styles/form-and-input/decimal-input",
						text: "Decimal Input",
					},
					{
						link: "/styles/date/date-picker",
						text: "Date Picker",
					},
					{
						link: "/styles/date/date-range-picker",
						text: "Date Range Picker",
					},
				]}
			/>
			<Block
				title="Styles | Layout"
				list={[
					{
						link: "/styles/layout/header-flexbox",
						text: "header flexbox",
					},
					{
						link: "/styles/layout/flexbox-overflow-x",
						text: "flexbox-overflow-x",
					},
					{
						link: "/styles/layout/flexbox-overflow-y",
						text: "flexbox-overflow-y",
					},
					{
						link: "/styles/layout/grid",
						text: "grid",
					},
				]}
			/>
			<Block
				title="Styles | Menu"
				list={[
					{
						link: "/styles/menu/navigation-menu/navigation-menu-1",
						text: "navigation menu 1",
					},
					{
						link: "/styles/menu/navigation-menu/navigation-menu-2",
						text: "navigation menu 2",
					},
					{
						link: "/styles/menu/navigation-menu/cat1/navigation-menu-3",
						text: "navigation menu 3",
					},
					{
						link: "/styles/menu/navigation-menu/cat1/navigation-menu-4",
						text: "navigation menu 4",
					},
					{
						link: "/styles/menu/context-menu",
						text: "context menu",
					},
					{
						link: "/styles/menu/left-click-menu",
						text: "left click menu (popover)",
					},
				]}
			/>
			<Block
				title="Styles | Tailwind"
				list={[
					{
						link: "/styles/tailwind/react-responsive",
						text: "react-responsive",
					},
					{
						link: "/styles/tailwind/animation",
						text: "animation",
					},
				]}
			/>
			<Block
				title="Styles | Progress Gadgets"
				list={[
					{
						link: "/styles/gadgets/circular-progress",
						text: "circular progress",
					},
				]}
			/>
			<Block
				title="SVG"
				list={[
					{
						link: "/svg/mask",
						text: "mask",
					},
				]}
			/>
			<Block
				title="WebSocket"
				list={[
					{
						link: "/websocket/socket.io",
						text: "socket.io",
					},
					{
						link: "/websocket/upload-large-json",
						text: "upload large json",
					},
				]}
			/>
		</main>
	);
}
