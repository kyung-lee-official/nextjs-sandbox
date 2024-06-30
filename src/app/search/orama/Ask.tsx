import { useMemo, useState } from "react";
import { oramaClient } from "./orama-client";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { Bubble } from "./Bubble";

export const Ask = () => {
	const [conversation, setConversation] = useState<any[]>([]);
	const [question, setQuestion] = useState("");

	const cachedAnswerSession = useMemo(() => {
		return oramaClient.createAnswerSession({
			inferenceType: "documentation",
			initialMessages: [],
			events: {
				onMessageChange: (messages) => console.log({ messages }),
				onMessageLoading: (loading) => console.log({ loading }),
				onAnswerAborted: (aborted) => console.log({ aborted }),
				onSourceChange: (sources) => console.log({ sources }),
			},
		});
	}, []);

	return (
		<div className="flex-[0_1_50%] flex flex-col gap-4">
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
					className="p-2
					bg-neutral-200"
					onClick={async () => {
						setConversation((conversation) => [
							...conversation,
							{
								type: "q",
								bubbleId: nanoid(),
								state: "fulfilled",
								content: question,
								timestamp: dayjs().format(
									"YYYY-MM-DD HH:mm:ss"
								),
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
								timeStamp: undefined,
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
											timeStamp: dayjs().format(
												"YYYY-MM-DD HH:mm:ss"
											),
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
											timeStamp: dayjs().format(
												"YYYY-MM-DD HH:mm:ss"
											),
										};
									}
									return bubble;
								});
							});
						}
					}}
				>
					Ask
				</button>
			</div>
			<div
				className="flex flex-col min-h-8 p-4 gap-4
				bg-neutral-100"
			>
				{conversation.map((bubble, i) => {
					return (
						<Bubble
							key={i}
							type={bubble.type}
							state={bubble.state}
							content={bubble.content}
						/>
					);
				})}
			</div>
		</div>
	);
};
