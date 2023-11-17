"use client";

import EmptyState from "../components/EmptyState";
import useConversation from "../hooks/useConversation";

export default function Home() {
	const { isOpen } = useConversation();
	return (
		<div
			className={`lg:pl-80 h-full lg:block ${
				isOpen ? "block" : "hidden"
			}`}
		>
			<EmptyState />
		</div>
	);
}
