import React from "react";
import FileList from "./FileList";
import UploadFile from "./UploadFile";
import FileViewer from "./FileViewer";
import DeleteFile from "./DeleteFile";
import AllFiles from "./AllFiles"; // Hiển thị toàn bộ file
import FilesByUser from "./FilesByUser"; // Lấy danh sách file theo user
import UpdateFile from "./UpdateFile"; // Cập nhật thông tin file
import SearchFiles from "./SearchFiles"; // Tìm kiếm file

const File = () => {
  const userId = 1; // Dùng làm ví dụ cho FilesByUser
  const fileId = 1; // Dùng làm ví dụ cho FileDetail và UpdateFile

  return (
    <div>
      <section>
        <AllFiles />
      </section>

      <section>
        <FileList page={1} limit={10} />
      </section>

      <section>
        <UploadFile />
      </section>

      <section>
       < FileViewer />
      </section>

      <section>
        <h2>Update File Information</h2>
        <UpdateFile fileId={fileId} />
      </section>

      <section>
        <h2>Delete a File</h2>
        <DeleteFile fileId={fileId} />
      </section>

      <section>
        <h2>Files by User</h2>
        <FilesByUser userId={userId} />
      </section>

      <section>
        <SearchFiles />
      </section>
    </div>
  );
};

export default File;
