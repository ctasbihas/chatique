"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface GroupAvatarProps {
	users?: User[];
}

const GroupAvatar: React.FC<GroupAvatarProps> = ({ users = [] }) => {
	const slicedUsers = users.slice(0, 4);
	const positionMap = {
		0: "top-0 left-2",
		1: "-bottom-1 -left-1",
		2: "-bottom-1 -right-1",
		3: "top-4 left-2",
	};

	return (
		<div className="relative h-9 w-9">
			{slicedUsers.map((user, index) => (
				<div
					key={user.id}
					className={`absolute inline-block rounded-full overflow-hidden h-5 w-5 ${
						positionMap[index as keyof typeof positionMap]
					}`}
				>
					<Image
						src={user?.image || "/images/userPlaceholder.jpg"}
						fill
						alt="Avatar"
					/>
				</div>
			))}
		</div>
	);
};

export default GroupAvatar;
