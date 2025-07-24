import { getOSSClient } from "../client";

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);
	const filename = searchParams.get("filename");

	const client = await getOSSClient();
	const result = await client.delete(filename);
	return new Response(JSON.stringify(result), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
