/* eslint-disable @typescript-eslint/restrict-template-expressions */
import multer from 'multer'

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: (_req, file, cb) => {
    console.log('HOLAAAA ==> ', file.filename)
    const uniqueSuffix = (Date.now() as unknown as string) + '-' + (Math.round(Math.random() * 1E9) as unknown as string)
    cb(null, `${file.fieldname}-${uniqueSuffix}`)
  }
})

const upload = multer({ storage })

export { upload }
