// yyyy-mm-dd HH:MM:SS
export function formatDate(date){
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var mm = date.getMinutes();
  var s = date.getSeconds();
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  h = h < 10 ? "0" + h : h;
  mm = mm < 10 ? "0" + mm : mm;
  s = s < 10 ? "0" + s : s;
  date = y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
  return date
}