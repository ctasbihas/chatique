"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";

interface AvatraProps {
	user: User;
}

const Avatar: React.FC<AvatraProps> = ({ user }) => {
	const { members } = useActiveList();
	const isActive = members.indexOf(user?.email!) !== -1;
	return (
		<div className="relative">
			<div className="relative inline-block rounded-full overflow-hidden w-9 h-9 md:w-11 md:h-11">
				<Image
					src={user?.image || "/images/userPlaceholder.jpg"}
					alt="Avatar"
					fill
				/>
			</div>
			{isActive && (
				<span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
			)}
		</div>
	);
};

export default Avatar;
