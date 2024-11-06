import { NextResponse } from 'next/server';
import { genSalt, hash } from 'bcryptjs';

import getCollection from '@/lib/get-collection';

export async function PUT(req: Request) {
  try {
    const data = await req.json()

    const usersCollection = await getCollection('profile')

    let payload: any = {}

    if (data?.password) {
      const salt = await genSalt(10)
      const hashed = await hash(data?.password, salt)
      payload.password = hashed
    }

    if (Object.keys(payload).length > 0) {
      await usersCollection.updateOne({ email: data.email }, { $set: payload })
    }

    return NextResponse.json({ mesage: "Use details updated" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
