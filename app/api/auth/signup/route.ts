import { NextResponse } from 'next/server';
import { genSalt, hash } from 'bcryptjs';

import { createUser } from '@/actions';
import getCollection from '@/lib/get-collection';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const usersCollection = await getCollection('profile')

    const isUserExisting = await usersCollection.findOne({ email });
    if (isUserExisting) return new NextResponse("User Already Exists...!", { status: 422 })

    const salt = await genSalt(10)
    const hashed = await hash(password, salt)

    const { data } = await createUser(email)
    await usersCollection.insertOne({ email, password: hashed, userId: data?._id })

    return NextResponse.json({ message: "User created successful" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}