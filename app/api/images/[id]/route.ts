import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import getCollection from '@/lib/get-collection';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const imgCollection = await getCollection('images')
    const image = await imgCollection.findOne({ _id: new ObjectId(id) })

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    const headers = new Headers()
    headers.set('Content-Type', image.contentType)
    headers.set('Content-Disposition', `inline filename="${image.filename}"`)

    return new NextResponse(image.data.buffer, {
      status: 200,
      headers: headers,
    })

  } catch (error) {
    return NextResponse.json({ error: 'Error retrieving image' }, { status: 400 })
  }
}