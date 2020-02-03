export function Select(table, column, params) {
  const sql = "select" + column + "from" + table + "where" + params;
  return sql;
};
export function Insert(table, column, value) {
  const sql = "insert into" + table + column + "values" + value;
  return sql;
}
export function Update(table, column, params) {
  const sql = "update" + table+'set' +column + "where" +params;
  return sql;
}
export function Delete(table,params) {
  const sql = "delete from" + table + "where" + params;
  return sql;
}
