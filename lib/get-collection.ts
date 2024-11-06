import clientPromise from "@/lib/mongodb";

async function getCollection(name: string) {
  const client = await clientPromise
  await client.connect()

  return client.db().collection(name)
}

export default getCollection