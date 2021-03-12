import TextEditor from "@components/cms/TextEditor";
import Parser from 'html-react-parser';
import React from 'react';

export default ({readOnly, editFunc, content}) => {
  return readOnly ?
    <div className="visitDetailSectionTextbox">
      {Parser(content)}
    </div> : <TextEditor
      className="visitDetailSectionTextbox"
      onChange={val => editFunc(val)}
      defaultValue={content}
    />
}