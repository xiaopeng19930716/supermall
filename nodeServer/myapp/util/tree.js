/*
 * @Descripttion:// 对象数组根据id和pid树形化 默认顶级部门root = { id: 0, pid: null, children: [] };
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-02-21 10:32:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-01 10:13:07
 */
export default {
    tree(list) {
        let root = null;
        if (list && list.length) {
            root = { id: 0, pid: null, children: [] };
            const group = {};
            for (let index = 0; index < list.length; index += 1) {
                if (list[index].pid !== null && list[index].pid !== undefined) {
                    if (!group[list[index].pid]) {
                        group[list[index].pid] = [];
                    }
                    group[list[index].pid].push(list[index]);
                }
            }
            const queue = [];
            queue.push(root);
            while (queue.length) {
                const node = queue.shift();
                // console.log(node);
                node.children = group[node.id] && group[node.id].length ? group[node.id] : null;
                if (node.children) {
                    queue.push(...node.children);
                }
                // console.log(queue);
            }
        }
        root = [root];
        console.log(root);
        return root;
    },
    // 根据上级部门查找下一级
    fetchChild(list, deptno) {},
};
