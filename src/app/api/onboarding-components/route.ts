import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const components = await prisma.onboardingComponent.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(components)
  } catch {
    return NextResponse.json({ error: 'Error fetching components' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const component = await prisma.onboardingComponent.create({
      data: body,
    })
    return NextResponse.json(component)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
