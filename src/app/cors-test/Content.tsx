import axios from "axios";

export const Content = async () => {
	const res = await axios.get(process.env.NEXT_PUBLIC_CORS_TEST as string);
	return <div>{JSON.stringify(res.data)}</div>;
};
