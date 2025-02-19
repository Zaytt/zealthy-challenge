import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const components = await prisma.onboardingComponent.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(components)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching components' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('Request body:', body)

    const component = await prisma.onboardingComponent.create({
      data: body,
    })
    return NextResponse.json(component, { status: 201 })
  } catch (error) {
    // Log the full error
    if (error instanceof Error) {
      console.log('Error: ', error.stack)
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 })
  }
}
