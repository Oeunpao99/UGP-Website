import DOMPurify from 'dompurify'

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 's', 'a',
  'ul', 'ol', 'li', 'h2', 'h3', 'blockquote', 'pre', 'code', 'img',
]
const ALLOWED_ATTR = ['href', 'target', 'rel', 'src', 'alt']

// Renders admin-authored HTML (product/event descriptions written with the
// rich-text editor) safely — sanitized against XSS regardless of how it got
// into the database, since it's shown to every site visitor. Always a <div>
// wrapper: the content itself may contain block elements (<p>, <ul>, ...)
// which can't legally nest inside a <p>.
export default function RichText({ html, className = '' }) {
  if (!html) return null
  const clean = DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR })
  return <div className={`rte-content ${className}`} dangerouslySetInnerHTML={{ __html: clean }} />
}
