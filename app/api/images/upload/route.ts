import { NextResponse } from 'next/server';
import getCollection from '@/lib/get-collection';

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileData = await file.arrayBuffer()
    const buffer = Buffer.from(fileData)

    const imgCollection = await getCollection('images')

    const result = await imgCollection.insertOne({
      filename: file.name,
      contentType: file.type,
      data: buffer,
    })

    return NextResponse.json({ message: 'Image uploaded successfully', id: result.insertedId }, { status: 201 })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}