import React, {useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { actionMessegeFile } from '../store/actions';
import { connect } from 'react-redux'
const CDropZone = connect(state=> ({
  ChatId: state.promise.NowChat?.payload._id

}), {onSend: actionMessegeFile})(DropZone)
function DropZone({visible, onSend, ChatId}) {
  const [Message, setMessage] = useState('');
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path}
        </li>
      ));
  return (  
    <div className="modal-dialog position-reletive">
    <div className="modal-content m-3">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">New message</h5>
        <button type="button" onClick={() => {visible()}} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">Message:</label>
            <textarea className="form-control" id="message-text" value={Message} onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">File:</label>
            <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
          </div>
        </form>
      </div>
      <div className="modal-footer d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {visible()}}>Close</button>
        <button type="button" className="btn btn-primary" onClick={() => {visible(); onSend(Message, ChatId, acceptedFiles[0])}}>Send message</button>
      </div>
    </div>
  </div>
  )
}

export default CDropZone