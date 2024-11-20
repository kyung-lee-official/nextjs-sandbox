import {
	Dispatch,
	forwardRef,
	SetStateAction,
	useCallback,
	useEffect,
} from "react";

type MenuProps = {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
};

export const Menu = forwardRef(function Menu(props: MenuProps, ref) {
	const { show, setShow } = props;
	const entryRef = ref as React.MutableRefObject<HTMLDivElement>;

	const handleClick = useCallback((e: any) => {
		if (entryRef.current) {
			if (e.target === entryRef.current) {
				/* entry clicked */
				setShow((state) => {
					return !state;
				});
			} else {
				/* menu item clicked */
				if (entryRef.current.contains(e.target)) {
					/* do nothing or hide menu, up to you */
					// setShow(false);
				} else {
					/* outside clicked */
					setShow(false);
				}
			}
		}
	}, []);

	useEffect(() => {
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<div className="relative w-fit">
			<div
				ref={entryRef}
				className="p-2 bg-black/30 hover:bg-black/40
				rounded-md shadow-lg cursor-pointer"
			>
				Left click this Menu.
				{show && (
					<div
						className="absolute 
						flex flex-col top-12
						bg-gray-200/80 rounded-md shadow-lg"
					>
						<button
							className="p-2"
							onClick={() => {
								console.log("Keep");
							}}
						>
							Keep
						</button>
						<button
							className="p-2"
							onClick={() => {
								setShow(false);
							}}
						>
							Hide
						</button>
					</div>
				)}
			</div>
		</div>
	);
});
