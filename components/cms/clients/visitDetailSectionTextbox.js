import React, { PureComponent } from "react";
import TextEditor from "../TextEditor";
import Parser from 'html-react-parser';
//import TextEditor from "./TextEditor";
export default ({readOnly, editFunc, content}) => {
  return readOnly ?
    <div className="visitDetailSectionTextbox">
      {Parser(content)}
    </div> :  <TextEditor
      className="visitDetailSectionTextbox"
      onChange={val => editFunc(val)}
      defaultValue={content}
    />
}

