"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { User } from "@prisma/client";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import Avatar from "../Avatar";

interface DesktopSidebarProps {
	currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
	const routes = useRoutes();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-40 md:w-24 md:px-6 md:overflow-y-auto md:bg-white md:border-r-[1px] md:pb-4 md:flex md:flex-col justify-between">
			<nav className="mt-4 flex flex-col justify-between">
				<ul
					role="list"
					className="flex flex-col items-center space-y-1"
				>
					{routes.map((route) => (
						<DesktopItem
							key={route.label}
							href={route.href}
							label={route.label}
							icon={route.icon}
							active={route.active}
							onClick={route.onClick}
						/>
					))}
				</ul>
			</nav>
			<nav className="mt-4 flex flex-col items-center justify-center">
				<div
					className="cursor-pointer hover:opacity-75 transition"
					onClick={() => setIsOpen(true)}
				>
					<Avatar user={currentUser} />
				</div>
			</nav>
		</div>
	);
};

export default DesktopSidebar;
