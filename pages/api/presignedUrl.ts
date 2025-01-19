import type { NextApiRequest, NextApiResponse } from 'next'
import S3 from 'aws-sdk/clients/s3'
import { randomUUID } from 'crypto'

const s3 = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const ex = (req.query.fileType as string).split('/')[1] // 예를들면 "image/png" 에서 "png"만 추출
  const { fileType } = req.query

  const key = `${randomUUID()}.${ex}`

  const s3Params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 60,
    // ContentType: `image/${ex}`,
    ContentType: fileType,
    // ACL: 'public-read',
  }

  const uploadUrl = await s3.getSignedUrlPromise('putObject', s3Params)

  console.log('uploadUrl: ', uploadUrl)

  res.status(200).json({
    uploadUrl,
    key,
  })
}
