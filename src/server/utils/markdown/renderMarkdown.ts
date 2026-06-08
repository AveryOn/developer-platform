import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

export const renderMarkdown = async (
  markdown: string
): Promise<string> => {
  const rawHtml = await marked.parse(markdown, {
    async: true,
    gfm: true,
    breaks: false
  })

  return sanitizeHtml(rawHtml, {
    allowedTags: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'br',
      'strong',
      'em',
      's',
      'blockquote',
      'ul',
      'ol',
      'li',
      'a',
      'code',
      'pre',
      'hr',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td'
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      code: ['class']
    },
    allowedSchemes: ['http', 'https', 'mailto']
  })
}
