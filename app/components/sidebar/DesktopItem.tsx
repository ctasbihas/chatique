"use client";

import Link from "next/link";

interface DesktopItemProps {
	label: string;
	href: string;
	icon: any;
	active?: boolean;
	onClick?: () => void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
	label,
	href,
	icon: Icon,
	active,
	onClick,
}) => {
	const handleClick = () => {
		if (onClick) {
			return onClick();
		}
	};

	return (
		<li>
			<Link
				href={href}
				className={`group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 ${
					active && "bg-gray-100 text-black"
				}`}
				onClick={handleClick}
			>
				<Icon className="w-6 h-6 shrink-0" />
				<span className="sr-only">{label}</span>
			</Link>
		</li>
	);
};

export default DesktopItem;
