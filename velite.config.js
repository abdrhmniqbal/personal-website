import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { defineCollection, defineConfig, s } from 'velite'

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string(),
      summary: s.string(),
      createdAt: s.isodate(),
      body: s.mdx(),
      metadata: s.metadata(),
      tags: s.string().array().optional(),
      cover: s
        .image({
          absoluteRoot: './public',
        })
        .optional(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split('/').slice(1).join('/'),
    })),
})

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string(),
      summary: s.string(),
      createdAt: s.isodate(),
      body: s.mdx(),
      type: s.string(),
      cover: s.image({
        absoluteRoot: './public',
      }),
      technologies: s.string().array().optional(),
			linkDemo: s.string().optional(),
			linkSource: s.string().optional(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split('/').slice(1).join('/'),
    })),
})

export default defineConfig({
  root: 'contents',
  output: {
    data: '.velite',
    assets: 'public/images',
    base: '/images/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts, projects },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'kanagawa-dragon',
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
})
