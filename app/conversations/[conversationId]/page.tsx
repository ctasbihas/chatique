import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Body from "./components/Body";
import Header from "./components/Header";
import Messagebar from "./components/Messagebar";

interface IParams {
	conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
	const { conversationId } = params;
	const conversation = await getConversationById(conversationId);
	const messages = await getMessages(conversationId);
	if (!conversation) {
		return (
			<div className="lg:pl-80 h-full">
				<div className="h-full flex flex-col">
					<EmptyState />
				</div>
			</div>
		);
	}

	return (
		<div className="lg:pl-80 h-full">
			<div className="h-full flex flex-col">
				<Header conversation={conversation} />
				<Body initialMessages={messages} />
				<Messagebar />
			</div>
		</div>
	);
};

export default ConversationId;
