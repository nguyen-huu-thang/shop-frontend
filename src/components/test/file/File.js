import React from 'react';
import FileList from './FileList';
import UploadFile from './UploadFile';
import FileDetail from './FileDetail';
import DeleteFile from './DeleteFile';



const File = () => {
    return (
      <div>
        <section>
          <h2>File List</h2>
          <FileList />
        </section>
  
        <section>
          <h2>Upload File</h2>
          <UploadFile />
        </section>
  
        <section>
          <h2>File Detail</h2>
          <FileDetail />
        </section>

        <section>
          <h2>Delete File</h2>
          <DeleteFile />
        </section>
      </div>
    );
  };
  
  export default File;
  