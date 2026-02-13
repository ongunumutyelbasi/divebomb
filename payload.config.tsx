import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { 
  lexicalEditor, 
  HeadingFeature, 
  FixedToolbarFeature, 
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import React from 'react'
import './src/styles/admin-custom.scss'

// Graphics components
const Logo: any = () => (
  <img 
    src="/db-white-logo.svg" 
    alt="DIVEBOMB" 
    style={{ width: '200px', height: 'auto' }} 
  />
)

const Icon: any = () => (
  <img 
    src="/db-white-icon.svg" 
    alt="DIVEBOMB Icon" 
    style={{ width: '24px', height: '24px' }} 
  />
)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  admin: {
    user: 'users',
    theme: 'dark',
    meta: {
      titleSuffix: '- DIVEBOMB',
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
      UploadFeature({
        collections: {
          media: {
            fields: [{ name: 'caption', type: 'text' }],
          },
        },
      }),
    ],
  }),
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      access: {
        // Allows any logged-in user to see/create other users
        // In a bigger team, you'd restrict this to 'admin' roles
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
      fields: [
        { name: 'username', type: 'text', required: true },
        { name: 'name', type: 'text', required: false },
        { name: 'surname', type: 'text', required: false },
        { name: 'role', type: 'text', required: false },
        { name: 'profile_picture', type: 'upload', relationTo: 'media', required: false },
      ],
    },
    {
      slug: 'media',
      upload: {
        staticDir: 'public/media', 
      },
      access: {
        read: () => true,
      },
      fields: [{ name: 'alt', type: 'text', required: true }],
    },
    {
      slug: 'authors',
      admin: { useAsTitle: 'name' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'bio', type: 'textarea' },
        { name: 'avatar', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      slug: 'posts',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
        { name: 'author', type: 'relationship', relationTo: 'authors', required: true },
      ],
    },
  ],
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',
  typescript: {
    outputFile: 'payload-types.ts', 
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: true,
    idType: 'uuid',
  }),
})