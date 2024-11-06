import { NextResponse } from 'next/server';

import getCollection from '@/lib/get-collection';
import transporter from '@/utils/mailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    const usersCollection = await getCollection('profile')

    const isUserExisting = await usersCollection.findOne({ email });
    if (!isUserExisting) return new NextResponse("Email not found...!", { status: 422 })

    const passKey = Math.floor(100000 + Math.random() * 900000)

    await usersCollection.updateOne({ email }, {
      "$set": {
        passKey,
      }
    })

    await transporter.sendMail({
      to: email,
      from: process.env.gmail_id,
      subject: "Reset password key",
      html: `
        <p style="margin-bottom:1rem;">Following is the reset password key,</p>
        <p style="margin-bottom:2rem;">${passKey}</p>
        <p>Best,</p>
        <p>Nidum Team</p>
        `
    })

    return NextResponse.json({ message: "User created successful" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}