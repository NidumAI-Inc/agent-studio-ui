import { NextResponse } from 'next/server';
import getCollection from '@/lib/get-collection';

type param = {
  email: string
}

export async function GET(req: Request, context: { params: param }) {
  try {
    const { email } = context.params

    const usersCollection = await getCollection('profile')
    const user = await usersCollection.findOne({ email })

    return NextResponse.json({ userId: user?.userId })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}