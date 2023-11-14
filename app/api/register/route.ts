import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { name, email, password } = await request.json();
		if (!name || !email || !password) {
			return new NextResponse("Missing Info", { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await prisma.user.create({
			data: {
				name,
				email,
				hashedPassword,
			},
		});

		return NextResponse.json(user);
	} catch (error: any) {
		console.log(error, "REGISTRATION_ERROR");
		return new NextResponse("Internal Error", { status: 500 });
	}
}
