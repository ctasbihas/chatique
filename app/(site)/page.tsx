"use client";

import Image from "next/image";
import AuthForm from "./components/AuthForm";
import { useState } from "react";

type Varient = "Sign Up" | "Sign In";

export default function Home() {
	const [varient, setVarient] = useState<Varient>("Sign Up");
	return (
		<div className="flex flex-col justify-center min-h-full sm:px-6 lg:px-8 bg-gray-100">
			<div className="sm:max-w-md sm:w-full sm:mx-auto">
				<Image
					src="/images/logo.png"
					alt="Logo"
					height={58}
					width={58}
					className="mx-auto w-auto"
				/>
				<h2 className="sm:text-3xl text-2xl text-center mt-6 tracking-tight font-bold text-gray-900">
					Sign {varient === "Sign Up" ? "Up" : "In"} to your account
				</h2>
			</div>
			<AuthForm
				varient={varient}
				setVarient={setVarient}
			/>
		</div>
	);
}
