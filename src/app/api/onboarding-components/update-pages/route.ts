import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { OnboardingComponent } from '@/types/OnboardingComponent.type'

const prisma = new PrismaClient()

export async function PUT(request: Request) {
  try {
    const { components } = await request.json()

    // Update all components in a single transaction
    await prisma.$transaction(
      components.map((component: OnboardingComponent) =>
        prisma.onboardingComponent.update({
          where: { id: component.id },
          data: { pageNumber: component.pageNumber },
        })
      )
    )

    return NextResponse.json({ message: 'Components updated successfully' })
  } catch (error) {
    console.error('Error updating components:', error)
    return NextResponse.json({ error: 'Failed to update components' }, { status: 500 })
  }
}
