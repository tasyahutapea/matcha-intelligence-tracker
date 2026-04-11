import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const data = await prisma.matcha.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return Response.json(data)
}

export async function POST(req) {
  const body = await req.json()

  const matcha = await prisma.matcha.create({
    data: {
      name: body.name,
      rating: parseInt(body.rating),
      notes: body.notes || null
    }
  })

  return Response.json(matcha)
}

export async function DELETE(req) {
  const body = await req.json()

  await prisma.matcha.delete({
    where: { id: body.id }
  })

  return Response.json({ success: true })
}