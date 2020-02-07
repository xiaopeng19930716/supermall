import FileSaver from "file-saver";
import XLSX from "xlsx";
// xlsx转表格
export function leadin() {
  
}
// 表格转xlsx
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
    );
    // filename为导出的文件名
  } catch (e) {
    console.log(e, etout);
  }
  return etout;
}