import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

//create GETBYID function
export async function GET (request, { params }) {
        
       try {
        const category = await prisma.category.findUnique({
            where: {
                id: Number(params.id)
            }
        })
       
        return NextResponse.json( { message: "this is your category", category })
       
    } catch (error) {
        return NextResponse.error( { message: "this category does not exist" })

           }
    }

//create PUT function
export async function PUT (request,{params}) {
    const data = await request.json();
    
        const category = await prisma.category.update({
            where: {
                id: Number(params.id)
            },
            data: data
        })
    
        return NextResponse.json( { message: "this is your updated category", category })
    }

//create DELETE function
export async function DELETE (request,{params}) {
            
            const category = await prisma.category.delete({
                where: {
                    id: Number(params.id)
                }
            })
            return NextResponse.json( { message: "this category was deleted", category })
        }
