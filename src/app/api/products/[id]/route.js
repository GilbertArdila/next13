import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

//create GETBYID function
export async function GET (request, { params }) {
    
   try{
    const product = await prisma.product.findUnique({
        where: {
            id: Number(params.id)
        }
    })
    if(!product){
        return NextResponse.json( { message: "this product doesn't exist" })
    }
    return NextResponse.json( { message: "this is your product", product })
   }catch(error){
    return NextResponse.error( { message: "upss, something wrong" })
   }
}

//create PUT function
export async function PUT (request,{params}) {
   const data = await request.json();
   try{
    const product = await prisma.product.update({
        where: {
            id: Number(params.id)
        },
        data: data
    })
    
    return NextResponse.json( { message: "this is your updated product", product })
    }catch(error){
        return NextResponse.error( { message: "upss, something wrong" })
    }
   
}

//create DELETE function
export async function DELETE (request,{params}) {
   try {
    const product = await prisma.product.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json( { message: "this product was deleted", product })

   
} catch (error) {
    return NextResponse.error( { message: "upss, something wrong" })
}
}