"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
	isOpen: boolean;
	onClose: () => void;
	src: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, isOpen, onClose }) => {
	if (!src) return null;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="h-80 w-80">
				<Image
					src={src}
					alt="image"
					className="object-cover"
					fill
				/>
			</div>
		</Modal>
	);
};

export default ImageModal;
