import { NextResponse } from 'next/server';
import { genSalt, hash } from 'bcryptjs';

import getCollection from '@/lib/get-collection';

export async function POST(req: Request) {
  try {
    const { email, password, passKey } = await req.json()

    const usersCollection = await getCollection('profile')

    const isUserExisting = await usersCollection.findOne({ email });
    if (!isUserExisting) return new NextResponse("Email not found...!", { status: 422 })
    if (passKey !== `${isUserExisting.passKey}`) {
      return new NextResponse("Pass key is not matched...!", { status: 422 })
    }

    const salt = await genSalt(10)
    const hashed = await hash(password, salt)

    await usersCollection.updateOne({ email }, {
      "$set": {
        password: hashed,
        passKey: ""
      }
    })

    return NextResponse.json({ message: "User created successful" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}