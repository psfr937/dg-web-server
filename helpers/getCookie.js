export default (name) => {
  if (typeof window === 'undefined') return null;
  var dc = window.document.cookie;
  console.log(dc)
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  }
  else
  {
    begin += 2;
    var end = window.document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  const answer = decodeURI(dc.substring(begin + prefix.length, end));
  console.log(name)
  console.log(answer)
  return answer
}