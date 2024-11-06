import { ObjectId } from "mongodb";
import axios from "axios";

import getCollection from "@/lib/get-collection";
import { scope } from "./constants";

const isTokenExpired = (expires_at: Date): boolean => new Date() >= new Date(expires_at)

export async function getSalesIqAccessToken(_id: string) {
  const thirdPartyCollection = await getCollection('third-party')
  const details = await thirdPartyCollection.findOne({ _id: new ObjectId(_id) })

  if (!details) throw Error("Document not found")

  if (isTokenExpired(details?.expires_at)) {
    const url = `https://accounts.zoho.${details?.salesIQDomain}/oauth/v2/token?client_id=${details?.client_id}&client_secret=${details?.client_secret}&redirect_uri=${details?.redirect_uri}&refresh_token=${details?.refresh_token}&grant_type=refresh_token&scope=${scope}`
    const newTokenData = await axios.post(url).then(d => d.data)
    if (!newTokenData || newTokenData?.error) throw Error('Unable to refresh access token')

    const expiresInMinutes = 55
    const expirationTime = new Date(Date.now() + expiresInMinutes * 60 * 1000)

    await thirdPartyCollection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          access_token: newTokenData.access_token,
          expires_at: expirationTime,
        },
      }
    )

    return newTokenData.access_token
  }

  return details?.access_token
}