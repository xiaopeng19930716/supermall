import axios from 'axios'
// 获取数据函数
export function getData(apiurl="",postpramas="",listData=[]) {
    const url = apiurl;
    const pramas = JSON.stringify(postpramas);
    axios.post(url, pramas).then(res => {
      let data = res.data.data.items;
      let groupData = group(data);
      for (let i = 0; i < groupData.length; i++) {
        setTimeout(() => {
          listData.push(...groupData[i]);
        }, 1000 * i);
      }
    });
  }
  // 数据分组函数
  export function group(data) {
    var result = [];
    var groupItem;
    for (var i = 0; i < data.length; i++) {
      if (i % 1000 == 0) {
        groupItem != null && result.push(groupItem);
        groupItem = [];
      }
      groupItem.push(data[i]);
    }
    result.push(groupItem);
    return result;
  }
  //防抖函数
  export function  debounce(fn, wait) {
    var timeout = null;
    return function() {
      if (timeout !== null) clearTimeout(timeout);
      timeout = setTimeout(fn, wait);
    };
  }