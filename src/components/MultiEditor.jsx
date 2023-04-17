import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'

const BlogPost = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const titleEditor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => setTitle(editor.getHTML()),
  })

  const bodyEditor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => setBody(editor.getHTML()),
  })
  const otherEditor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => setBody(editor.getHTML()),
  })

  return (
    <div>
      <h6></h6>
      <EditorContent editor={titleEditor} />
      <h6></h6>
      <EditorContent editor={bodyEditor} />
      <h6></h6>
      <EditorContent editor={otherEditor} />
    </div>
  )
}

export default BlogPost
