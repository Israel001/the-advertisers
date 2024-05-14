import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { MutableRefObject } from "react";

const CustomEditor = ({ description, editorRef }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={description}
      onReady={(editor) => {
        // eslint-disable-next-line react/prop-types
        editorRef.current = editor;
      }}
    />
  );
};

export default CustomEditor;
