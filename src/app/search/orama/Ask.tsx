import { useMemo, useState } from "react";
import { oramaClient } from "./orama-client";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { Bubble } from "./bubble/Bubble";

export const Ask = () => {
	const [conversation, setConversation] = useState<any[]>([]);
	const [question, setQuestion] = useState("");

	const cachedAnswerSession = useMemo(() => {
		return oramaClient.createAnswerSession({
			inferenceType: "documentation",
			initialMessages: [],
			events: {
				// onMessageChange: (messages) => console.log({ messages }),
				// onMessageLoading: (loading) => console.log({ loading }),
				// onAnswerAborted: (aborted) => console.log({ aborted }),
				// onSourceChange: (sources) => console.log({ sources }),
			},
		});
	}, []);

	const askQuestion = async () => {
		setConversation((conversation) => [
			...conversation,
			{
				type: "q",
				bubbleId: nanoid(),
				state: "fulfilled",
				content: question,
				timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
			},
		]);
		const bubbleId = nanoid();
		setConversation((conversation) => [
			...conversation,
			{
				type: "a",
				bubbleId,
				state: "pending",
				content: undefined,
				timestamp: undefined,
			},
		]);
		try {
			const answer = await cachedAnswerSession.ask({
				term: question,
			});
			setConversation((conversation) => {
				return conversation.map((bubble) => {
					if (bubble.bubbleId === bubbleId) {
						return {
							...bubble,
							state: "fulfilled",
							content: answer,
							timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
						};
					}
					return bubble;
				});
			});
		} catch (error) {
			setConversation((conversation) => {
				return conversation.map((bubble) => {
					if (bubble.bubbleId === bubbleId) {
						return {
							...bubble,
							state: "error",
							content: "An error occurred",
							timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
						};
					}
					return bubble;
				});
			});
		}
	};

	return (
		<div className="flex-[0_1_50%] flex flex-col gap-4">
			<div
				className="flex flex-col h-[80dvh] p-4 gap-6
				bg-neutral-200/60
				overflow-y-auto"
			>
				{conversation.map((bubble, i) => {
					return (
						<Bubble
							key={i}
							type={bubble.type}
							state={bubble.state}
							timestamp={bubble.timestamp}
							content={bubble.content}
						/>
					);
				})}
			</div>
			<div className="flex gap-4">
				<textarea
					className="w-full p-2
					bg-neutral-100
					outline-none"
					onChange={(e) => {
						setQuestion(e.target.value);
					}}
				/>
				<button
					type="submit"
					className="p-2
					bg-neutral-200"
					onClick={askQuestion}
				>
					Ask
				</button>
			</div>
		</div>
	);
};
