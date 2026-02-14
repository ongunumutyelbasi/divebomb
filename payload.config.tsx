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
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'

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
  // [FIXED] Added the plugins array here
  plugins: [
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
      },
    }),
  ],
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
      // [FIXED] Simplified upload for cloud storage
      upload: true, 
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
        defaultColumns: ['title', 'status', 'category', 'publishedAt'],
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data.status === 'published' && !data.publishedAt) {
              return {
                ...data,
                publishedAt: new Date().toISOString(),
              };
            }
            return data;
          },
        ],
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          unique: true,
          required: true,
          admin: {
            position: 'sidebar',
            description: 'Used for the URL (e.g., divebomb.app/post-slug)',
          },
          hooks: {
            beforeValidate: [
              ({ value, data }) => {
                if (value) return value;
                return data?.title
                  ?.toLowerCase()
                  .replace(/ /g, '-')
                  .replace(/[^\w-]+/g, '');
              },
            ],
          },
        },
        {
          name: 'publishedAt',
          type: 'date',
          admin: {
            position: 'sidebar',
            date: {
              pickerAppearance: 'dayAndTime',
              timeIntervals: 15,
            },
          },
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'In Review', value: 'review' },
            { label: 'Published', value: 'published' },
          ],
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: true,
          required: true,
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'authors',
          required: true,
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'featuredImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      slug: 'categories',
      admin: {
        useAsTitle: 'title',
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          unique: true,
          required: true,
          admin: {
            position: 'sidebar',
          },
          hooks: {
            beforeValidate: [
              ({ value, data }) => {
                if (value) return value;
                return data?.title
                  ?.toLowerCase()
                  .replace(/ /g, '-')
                  .replace(/[^\w-]+/g, '');
              },
            ],
          },
        },
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