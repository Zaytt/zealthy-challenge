import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const component = await prisma.onboardingComponent.update({
      where: { id: params.id },
      data: body
    })
    return NextResponse.json(component)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating component' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.onboardingComponent.delete({
      where: { id: params.id }
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting component' },
      { status: 500 }
    )
  }
} 