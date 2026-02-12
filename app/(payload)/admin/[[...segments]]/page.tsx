import { RootPage } from '@payloadcms/next/views'
import payloadConfig from '../../../../payload.config'
// @ts-ignore
import { importMap } from '../importMap'

type PageProps = {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const Page = async ({ params, searchParams }: PageProps) => {
  // Await the Next.js 15 dynamic parameters
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  return (
    <RootPage
      config={payloadConfig}
      importMap={importMap}
      // Casting to any helps avoid the strict Promise type mismatch 
      // while letting Payload's internal logic handle the resolution
      params={resolvedParams as any}
      searchParams={resolvedSearchParams as any}
    />
  )
}

export default Page