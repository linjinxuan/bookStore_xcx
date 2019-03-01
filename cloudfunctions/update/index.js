// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({env: 'ivy-903e57'});

const db = cloud.database();
const _ = db.command;

// 更新修改数据库sale集合中的余数字段
exports.main = async (event, context) => {
  return await db.collection('sale').doc(event.id).update({
    // data 传入需要局部更新的数据
    data: {
      // 表示将 Remaining 字段减1
      Remaining: _.inc(-1)
    }
  })
}