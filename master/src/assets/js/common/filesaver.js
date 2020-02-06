import FileSaver from "file-saver";
import XLSX from "xlsx";

export function leadin(table, filename) {
  console.log(table, filename)
}
export function leadout(table, fliename) {
  var filename = fliename + ".xlsx";
  let et = XLSX.utils.table_to_book(
    document.getElementById(table)
  ); //此处传入table的DOM节点
  let etout = XLSX.write(et, {
    bookType: "xlsx",
    bookSST: true,
    type: "array"
  });
  try {
    FileSaver.saveAs(
      new Blob([etout], {
        type: "application/octet-stream"
      }),
      filename
    ); //trade-publish.xlsx 为导出的文件名
  } catch (e) {
    console.log(e, etout);
  }
  return etout;
}