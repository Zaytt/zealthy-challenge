import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Fetch user data from your database
    const userData = await prisma.user.findUnique({
      where: { id: params.id },
    })

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(userData)
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error: ', error.stack)
    }
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()

    if (body.birthdate) {
      // Convert YYYY-MM-DD to ISO-8601
      body.birthdate = new Date(body.birthdate).toISOString()
    } else {
      delete body.birthdate
    }

    const user = await prisma.user.update({
      where: { id },
      data: body,
      select: {
        aboutMe: true,
        street: true,
        city: true,
        state: true,
        zip: true,
        birthdate: true,
        progress: true,
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error: ', error.stack)
    }
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 })
  }
}
