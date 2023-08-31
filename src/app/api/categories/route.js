import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

//create GET function
export async function GET () {
    const categories = await prisma.category.findMany();
    return NextResponse.json( { message: "these are the categories in your API", categories })

}

// create POST function
export async function POST (request) {
    const {name} = await request.json();
    const category = await prisma.category.create({
        data: {
            name
        }
    })

    return NextResponse.json( { message: "this is your new category", category })
}
