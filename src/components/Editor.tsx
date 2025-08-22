import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  List,
  Underline
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'
import { Button } from 'react-bootstrap'
import { AiOutlinePaperClip } from 'react-icons/ai'

const Editor = () => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={{
          licenseKey: 'GPL', // Or 'GPL'.
          plugins: [Essentials, Paragraph, Bold, Italic, Underline, List],
          toolbar: [
            'undo',
            'redo',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'bulletedList',
            'numberedList'
          ]
        }}
      />
      <div className="mt-2 d-flex justify-content-end">
        <div className="me-3">
          <Button variant="link">
            <AiOutlinePaperClip size={25} />
          </Button>
          <Button className="w-80">Post</Button>
        </div>
      </div>
    </div>
  )
}

export default Editor
