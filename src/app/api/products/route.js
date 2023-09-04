import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

//create GET function
export async function GET () {
   try{
    const products = await prisma.product.findMany();
    return NextResponse.json( { message: "these are the products in your API", products })
    }catch(error){
        return NextResponse.error( { message: "upss, something wrong" })
    }

}

// create POST function
export async function POST (request) {
    try{
    const {name, price, categoryId,image} = await request.json();
    const product = await prisma.product.create({
        data: {
            name,
            price,
            categoryId,
            image
        }
    })
    return NextResponse.json( { message: "this is your new product", product })
    }catch(error){
        return NextResponse.error( { message: "upss, something wrong" })
    }
    
}

