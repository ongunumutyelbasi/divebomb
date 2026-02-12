/* eslint-disable */
import { 
  REST_DELETE, 
  REST_GET, 
  REST_OPTIONS, 
  REST_PATCH, 
  REST_POST 
} from '@payloadcms/next/routes'
import config from './payload.config'

export const GET = async (req: Request, { params }: any) => {
  const resolved = await params
  return REST_GET(config)(req, { params: resolved })
}

export const POST = async (req: Request, { params }: any) => {
  const resolved = await params
  return REST_POST(config)(req, { params: resolved })
}

export const DELETE = async (req: Request, { params }: any) => {
  const resolved = await params
  return REST_DELETE(config)(req, { params: resolved })
}

export const PATCH = async (req: Request, { params }: any) => {
  const resolved = await params
  return REST_PATCH(config)(req, { params: resolved })
}

export const OPTIONS = async (req: Request, { params }: any) => {
  const resolved = await params
  return REST_OPTIONS(config)(req, { params: resolved })
}