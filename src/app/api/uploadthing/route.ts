import { createNextRouteHandler } from 'uploadthing/next'

import { ourFileRouter } from './core'

export const { GET, POST } = createNextRouteHandler({ router: ourFileRouter })

// If I used the amazon S3 bucket it should be good!
