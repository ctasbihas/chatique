import { BsGithub, BsGoogle } from "react-icons/bs";

interface SocialAuthButtonProps {
	socialAction: string;
	onClick: () => void;
	disabled?: boolean;
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
	socialAction,
	onClick,
	disabled,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			type="button"
			className={`inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 ${
				disabled && "cursor-not-allowed"
			}`}
		>
			{socialAction === "google" && <BsGoogle />}
			{socialAction === "github" && <BsGithub />}
		</button>
	);
};

export default SocialAuthButton;
