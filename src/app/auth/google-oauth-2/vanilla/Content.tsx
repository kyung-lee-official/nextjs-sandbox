"use client";

import { useSearchParams } from "next/navigation";
import { getGoogleOAuth2Url } from "./api";

const Content = () => {
	let searchParams = useSearchParams();
	const id = searchParams.get("id");
	const name = searchParams.get("name");
	const email = searchParams.get("email");
	const picture = searchParams.get("picture") as string;

	if (name) {
		return (
			<div>
				<ul>
					<li>Hi, {name}</li>
					<li>id: {id}</li>
					<li>email: {email}</li>
					<img src={picture} alt="" />
				</ul>
			</div>
		);
	} else {
		return <a href={getGoogleOAuth2Url()}>Sign In with Google</a>;
	}
};

export default Content;
