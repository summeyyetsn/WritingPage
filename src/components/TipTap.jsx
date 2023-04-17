import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useCallback, useState, useEffect } from 'react'
import {FaBold, FaItalic, FaStrikethrough, FaHeading, FaListOl, FaListUl, FaQuoteLeft, FaRedo, FaUndo, FaUnderline, FaAlignCenter, FaAlignLeft, FaAlignRight,FaImage} from "react-icons/fa";
import Underline from "@tiptap/extension-underline";
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'


import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'

import Placeholder from '@tiptap/extension-placeholder'




const MenuBar = ({ editor }) => {
    const addImage = useCallback(() => {
      const url = window.prompt('Enter the image URL:')
  
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    }, [editor])
  
if (!editor) {
    return null
}

  return (
    <div className='menu-bar'>
        <div>


            {/* ..........Resim Ekle.......................................................... */}
            <button onClick={addImage}>
        <FaImage/>
        </button>

            
            {/* ...................................................................... */}
        <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? 'is-active' : ''}
        >
        <FaBold/> 
        </button>
        <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={editor.isActive('italic') ? 'is-active' : ''}
        >
            <FaItalic/>
        </button>
        <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleUnderline()
                .run()
            }
            className={editor.isActive('underline') ? 'is-active' : ''}
        >
            <FaUnderline/>
        </button>
            <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        >
            <FaAlignLeft/>
        </button>
        <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
        >
            <FaAlignCenter/>
        </button>
        <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        >
            <FaAlignRight/>
        </button>
        
        
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
            <FaHeading/>
        </button>
        
        <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
            <FaListUl/>
        </button>
        <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
            <FaListOl/>
        </button>
        
        <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
            <FaQuoteLeft/>
        </button>
      </div>
      <div>
        <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
        >
            <FaUndo/>
        </button>
        <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
        >
            <FaRedo/>
        </button>
        
      </div>
     
    </div>
  )
}

const TipTap = ({setDesc}) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
  
    const titleEditor = useEditor({
      extensions: [
        StarterKit,
        Placeholder.configure({
          // Use a placeholder:
          placeholder: 'Write Your Title ...',
        }),
      ],
      content: '',
      onUpdate: ({editor}) => {
        const html = editor.getHTML()
        setTitle(html)
      },
    })
  
    const editor = useEditor({
      extensions: [
        Dropcursor,
        Document,
        Paragraph,
        Text,
        Image,
        Heading,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Underline,
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] }),
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
          },
        }),
      ],
      content: ``,
      onUpdate: ({editor}) => {
        const html = editor.getHTML()
        setContent(html)
      },
    })
  
    useEffect(() => {
      setDesc(`<h1>${title}</h1>${content}`)
    }, [title, content])
  
    return (
      <div>
        <MenuBar editor={editor} />
        <EditorContent editor={titleEditor} className='title-content' />
        <EditorContent editor={editor} />
      </div>
    )
  }

export default TipTap