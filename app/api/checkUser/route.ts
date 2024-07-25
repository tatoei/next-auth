import { NextResponse } from "next/server";
import { connentMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: any) {
    try {
        await connentMongoDB();
        const { email } = await req.json();
        const user = await User.findOne({ email }).select("id");
        console.log("User:", user);

        return NextResponse.json({ user });

    } catch (error) {
        console.log(error);
    }
}