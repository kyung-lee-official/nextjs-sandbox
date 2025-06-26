const OSS = require("ali-oss");
const { STS } = require("ali-oss");

export async function POST(request: Request) {
	const body = await request.json();
	const { fileName } = body;

	const client = await new OSS({
		accessKeyId: process.env.NEXT_PUBLIC_ALIYUN_OSS_ACCESS_KEY_ID,
		accessKeySecret: process.env.NEXT_PUBLIC_ALIYUN_OSS_ACCESS_SECRET,
		region: process.env.NEXT_PUBLIC_ALIYUN_OSS_REGION,
		authorizationV4: true,
		bucket: process.env.NEXT_PUBLIC_ALIYUN_OSS_BUCKET,
		endpoint: `https://${process.env.NEXT_PUBLIC_ALIYUN_OSS_REGION}.aliyuncs.com`,
	});

	const url = await client.signatureUrlV4(
		"PUT",
		600,
		{
			headers: {
				"Content-Type": "application/octet-stream",
			}, // 请根据实际发送的请求头设置此处的请求头
		},
		fileName
	);

	return new Response(url, {
		status: 200,
		headers: {
			"Content-Type": "text/plain",
		},
	});
}
