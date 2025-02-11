import { NextResponse } from "next/server";
import { connentMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs'

export async function POST(req: any) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connentMongoDB();
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An Error occured while regisrating the user" }, { status: 500 });
    }
}