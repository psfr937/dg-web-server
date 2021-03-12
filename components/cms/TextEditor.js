import React from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const ResizeModule = dynamic(() => import('quill-image-resize-module'), { ssr: false })
//import '../node_modules/react-quill/dist/quill.snow.css';
//import '../styles/react-draft-wysiwg.css'
import imageAPI from "../../api/ecommerce/images";
import dataURIToBlob from "../../helpers/dataURIToBlob";
//import { ImageResize } from 'quill-image-resize-module';
const imageResize = ResizeModule.ImageResize;
//ReactQuill.Quill.register('modules/imageResize', imageResize);

//  const reader = new window.FileReader();
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export default function TextEditor({ onChange, placeholder = '', defaultValue = '' }){


  let quill = null;

  const handleChange = (html) => {
  // this.setState({ editorHtml: html });
    onChange(html)
  };

  const apiPostNewsImage = () => {
    // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
  };

  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();




    input.onchange = async () => {
      const file = input.files[0];
    //  const formData = new FormData();

     // formData.append('image', file);

      console.log(input.files);

      const mimeString = file.type;

      const byteString = await toBase64(file);
      console.log(byteString)
      // var ia = new Uint8Array(byteString.length);
      // for (var i = 0; i < byteString.length; i++) {
      //   ia[i] = byteString.charCodeAt(i);
      // }
      // let blob = new Blob([ia], {
      //   type:  mimeString
      // });
      // const ext = mimeString.split('/')[1]
      // const fileBlob = new File([blob], `${Date.now()}.${ext}`, {type: mimeString})
      // console.log(fileBlob );

      let mediaFiles = {};
      mediaFiles['image_1'] = dataURIToBlob(byteString);
      // Save current cursor state
      const range = this.quill.getSelection(true);

      // Insert temporary loading placeholder image
      this.quill.insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);

      // Move cursor to right side of image (easier to continue typing)
      this.quill.setSelection(range.index + 1);

      const json = await imageAPI.upload(mediaFiles); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
      const res = json.data.data
      console.log(json.data)
      // Remove placeholder image
      this.quill.deleteText(range.index, 1);

      // Insert uploaded image
      // this.quill.insertEmbed(range.index, 'image', res.body.image);
      this.quill.insertEmbed(range.index, 'image', res);
    };
  }


  return (
    <div className="text-editor">
      <ReactQuill
        ref={el => {
          quill = el;
        }}
        onChange={handleChange}
        placeholder={placeholder}
        value={defaultValue}
        modules={{
          toolbar: {
            container: [
              [{ font: [] }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image']
            ],
            handlers: {
              image: imageHandler
            },
            imageResize
          }
        }}
      />
    </div>
  );
}

