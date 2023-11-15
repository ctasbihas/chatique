"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import SocialAuthButton from "./SocialAuthButton";

export default function AuthForm({ varient, setVarient }: any) {
	const [isLoading, setIsLoading] = useState(false);

	const toggleVarient = useCallback(() => {
		if (varient === "Sign In") {
			setVarient("Sign Up");
		} else {
			setVarient("Sign In");
		}
	}, [varient, setVarient]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		if (varient === "Sign Up") {
			axios
				.post("/api/register", data)
				.catch(() => toast.error("Something went wrong!"))
				.finally(() => setIsLoading(false));
		}
		if (varient === "Sign In") {
			signIn("credentials", {
				...data,
				redirect: false,
			})
				.then((callback) => {
					console.log(callback);
					if (callback?.error) {
						toast.error(callback.error);
					}
					if (callback?.ok && !callback?.error) {
						toast.success("Logged in");
					}
				})
				.finally(() => setIsLoading(false));
		}
	};

	const socialAction = (action: string) => {
		setIsLoading(true);

		signIn(action, {
			redirect: false,
		})
			.then((callback) => {
				console.log(callback);
				if (callback?.error) {
					toast.error(callback.error);
				}
				if (callback?.ok && !callback?.error) {
					toast.success("Logged in");
				}
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<div className="mt-8 mx-auto sm:w-full max-w-md">
			<div className="bg-white px-4 py-8 shadow rounded-lg sm:px-10">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6"
				>
					{varient === "Sign Up" && (
						<Input
							id="name"
							label="Your Name"
							type="text"
							placeholder="John Doe"
							register={register}
							errors={errors}
							disabled={isLoading}
						/>
					)}
					<Input
						id="email"
						label="Your Email"
						type="email"
						placeholder="2p1q9@example.com"
						register={register}
						errors={errors}
						disabled={isLoading}
					/>
					<Input
						id="password"
						label="Password"
						type="password"
						placeholder="********"
						register={register}
						errors={errors}
						disabled={isLoading}
					/>
					<div>
						<Button
							type="submit"
							fullWidth
							disabled={isLoading}
						>
							{varient === "Sign Up" ? "Sign Up" : "Sign In"}
						</Button>
					</div>
				</form>
				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-white px-2 text-gray-500">
								Or Countinue With
							</span>
						</div>
					</div>

					<div className="mt-6 flex gap-2">
						<SocialAuthButton
							socialAction="github"
							onClick={() => socialAction("github")}
							disabled={isLoading}
						/>
						<SocialAuthButton
							socialAction="google"
							onClick={() => socialAction("google")}
							disabled={isLoading}
						/>
					</div>
				</div>
				<div className="flex gap-2 justify-center mt-6 px-2 text-sm text-gray-500">
					<span>
						{varient === "Sign Up"
							? "Already have an account?"
							: "Don't have an account?"}
					</span>
					<button
						onClick={toggleVarient}
						className="text-blue-500 cursor-pointer hover:underline"
					>
						{varient === "Sign Up" ? "Sign In" : "Sign Up"}
					</button>
				</div>
			</div>
		</div>
	);
}
