"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import axios from "axios";

interface IProps {
	initialMessages: FullMessageType[];
}

const Body: React.FC<IProps> = ({ initialMessages }) => {
	const [messages, setMessages] = useState(initialMessages);
	const bottomRef = useRef<HTMLDivElement>(null);
	const { conversationId } = useConversation();

	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	}, [conversationId]);

	return (
		<div className="flex-1 overflow-y-auto">
			{messages.map((message, i) => (
				<Message
					key={message.id}
					isLast={i === messages.length - 1}
					data={message}
				/>
			))}
			<div
				ref={bottomRef}
				className="pt-24"
			/>
		</div>
	);
};

export default Body;
