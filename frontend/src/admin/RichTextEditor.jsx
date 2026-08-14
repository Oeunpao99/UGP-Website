import { useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import { uploadImage } from './adminApi'

const ICON = { stroke: 'currentColor', fill: 'none', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const i = 'h-[15px] w-[15px]'

const ICONS = {
  bold: <svg viewBox="0 0 24 24" {...ICON} className={i}><path d="M6 4h8a4 4 0 0 1 0 8H6zM6 12h9a4 4 0 0 1 0 8H6z" /></svg>,
  italic: <svg viewBox="0 0 24 24" {...ICON} className={i}><path d="M10 4h6M8 20h6M14 4 10 20" /></svg>,
  underline: <svg viewBox="0 0 24 24" {...ICON} className={i}><path d="M6 4v6a6 6 0 0 0 12 0V4M5 20h14" /></svg>,
  strike: <svg viewBox="0 0 24 24" {...ICON} className={i}><path d="M6 12h12M8 6.5c0-1.4 1.8-2.5 4-2.5s4 1.1 4 2.5c0 .9-.6 1.6-1.6 2.1M16 17.5c0 1.4-1.8 2.5-4 2.5s-4-1.1-4-2.5c0-.7.4-1.3 1-1.8" /></svg>,
  h2: <span className="font-display text-[.72rem] font-bold">H2</span>,
  h3: <span className="font-display text-[.72rem] font-bold">H3</span>,
  quote: <svg viewBox="0 0 24 24" {...ICON} className={i}><path d="M7 8a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3M17 8a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3" /></svg>,
  code: <svg viewBox="0 0 24 24" {...ICON} className={i}><path d="m9 8-4 4 4 4M15 8l4 4-4 4" /></svg>,
  ul: <svg viewBox="0 0 24 24" {...ICON} className={i}><circle cx="4.5" cy="6" r="1" fill="currentColor" stroke="none" /><circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="4.5" cy="18" r="1" fill="currentColor" stroke="none" /><path d="M9 6h11M9 12h11M9 18h11" /></svg>,
  ol: <svg viewBox="0 0 24 24" {...ICON} className={i}><path d="M9 6h11M9 12h11M9 18h11M4 5v3M4 5l-1 .8M4 12h1.5a.9.9 0 0 1 0 1.8H4M4.4 17.8h1a.9.9 0 0 1 0 1.8H4l1.5-1.9" /></svg>,
  link: <svg viewBox="0 0 24 24" {...ICON} className={i}><path d="M9 15l6-6M8.5 12.5 6 15a3 3 0 0 0 4.2 4.2l2.5-2.5M15.5 11.5 18 9a3 3 0 0 0-4.2-4.2l-2.5 2.5" /></svg>,
  image: <svg viewBox="0 0 24 24" {...ICON} className={i}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>,
  undo: <svg viewBox="0 0 24 24" {...ICON} className={i}><path d="M9 8 4 12l5 4M4 12h11a5 5 0 0 1 0 10h-1" /></svg>,
  redo: <svg viewBox="0 0 24 24" {...ICON} className={i}><path d="m15 8 5 4-5 4M20 12H9a5 5 0 0 0 0 10h1" /></svg>,
}

function Btn({ active, disabled, onClick, label, children }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`grid h-7 w-7 flex-none cursor-pointer place-items-center rounded-[6px] border-0 transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
        active ? 'bg-ink text-white' : 'bg-transparent text-grey hover:bg-paper-2 hover:text-fg'
      }`}
    >
      {children}
    </button>
  )
}

export default function RichTextEditor({ value, onChange, placeholder, labels = {} }) {
  const fileRef = useRef(null)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'rte-content min-h-[140px] px-3.5 py-2.5 text-[.92rem] focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? '' : editor.getHTML()),
  })

  if (!editor) return null

  async function insertImage(e) {
    const file = e.target.files?.[0]
    if (fileRef.current) fileRef.current.value = ''
    if (!file) return
    try {
      const r = await uploadImage(file)
      editor.chain().focus().setImage({ src: r.url }).run()
    } catch {
      // upload failure — leave the editor content untouched
    }
  }

  function setLink() {
    const prev = editor.getAttributes('link').href || ''
    const url = window.prompt(labels.linkPrompt || 'Link URL', prev)
    if (url === null) return
    if (!url) {
      editor.chain().focus().unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="overflow-hidden rounded-[10px] border border-line bg-paper-2 focus-within:border-blue">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-line bg-card px-2 py-1.5">
        <Btn label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>{ICONS.bold}</Btn>
        <Btn label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>{ICONS.italic}</Btn>
        <Btn label="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>{ICONS.underline}</Btn>
        <Btn label="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>{ICONS.strike}</Btn>
        <span className="mx-1 h-5 w-px flex-none bg-line" />
        <Btn label="Link" active={editor.isActive('link')} onClick={setLink}>{ICONS.link}</Btn>
        <span className="mx-1 h-5 w-px flex-none bg-line" />
        <Btn label="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>{ICONS.h2}</Btn>
        <Btn label="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>{ICONS.h3}</Btn>
        <span className="mx-1 h-5 w-px flex-none bg-line" />
        <Btn label="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>{ICONS.quote}</Btn>
        <Btn label="Code block" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>{ICONS.code}</Btn>
        <span className="mx-1 h-5 w-px flex-none bg-line" />
        <Btn label="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>{ICONS.ul}</Btn>
        <Btn label="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>{ICONS.ol}</Btn>
        <span className="mx-1 h-5 w-px flex-none bg-line" />
        <Btn label="Insert image" onClick={() => fileRef.current?.click()}>{ICONS.image}</Btn>
        <span className="mx-1 h-5 w-px flex-none bg-line" />
        <Btn label="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>{ICONS.undo}</Btn>
        <Btn label="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>{ICONS.redo}</Btn>
      </div>
      <EditorContent editor={editor} placeholder={placeholder} />
      <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={insertImage} />
    </div>
  )
}
