import { NextResponse } from "next/server";


export function GET () {
    return NextResponse.json( { message: "get" })
}

export function POST () {
    return NextResponse.json( { message: "post" })
}

export function PUT () {
    return NextResponse.json( { message: "put" })
}

export function DELETE () {
    return NextResponse.json( { message: "delete" })
}