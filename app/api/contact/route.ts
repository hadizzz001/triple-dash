
import prisma from "../../../prisma";
import { NextResponse } from "next/server";

export async function main() {
    try {
        await prisma.$connect();

    }
    catch (err) {
        return Error("Database connect unsuccessful")
    }
}

 



export const POST = async (req: Request, res: NextResponse) => {
    try {
        const {description} = await req.json();
 
        await main();   
        const post = await prisma.contact.createMany({ data: {description} });  
        return NextResponse.json({ message: "Success", post }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
};
 
