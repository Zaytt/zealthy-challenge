import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, ...userData } = body

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        ...userData,
        progress: 2, // Email/password completed
      },
    })

    // eslint-disable-next-line
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error creating user'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        aboutMe: true,
        street: true,
        city: true,
        state: true,
        zip: true,
        birthdate: true,
        progress: true,
        createdAt: true,
      },
    })
    return NextResponse.json(users)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error fetching users'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
