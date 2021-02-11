export default (dataURI) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);

  console.log(dataURI)

  // separate out the mime component
  const prefix =  dataURI.split(',')[0]
  var mimeString = prefix.split(':')[1].split(';')[0];
  console.log(prefix.split(';')[1])
  var nameString = prefix.split(';')[1].slice(5);
  console.log(nameString)

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

 const blob = new Blob([ia], {
      type: mimeString,
    })

  return new File([blob], nameString, {type: mimeString})

}