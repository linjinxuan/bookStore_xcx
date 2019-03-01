// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const updateAsync = db.collection('sale').doc(event.data._id).update({
    // data 传入需要局部更新的数据
    data: {
      // 表示将 Remaining 字段减1
      Remaining: _.inc(-1)
    }
  });
  const insertCart = db.collection('cart').add({
    data: event.data
  });
  // const updateCart = db.collection('cart').doc(event.data._id).update({
  //   // data 传入需要局部更新的数据
  //   data: {
  //     // 表示将 count 字段加1
  //     count: _.inc(1)
  //   }
  // });
  // const insertAsync = db.collection('cart').where({
  //   _id: event.data._id
  // });  

  try{
    return await Promise.all([updateAsync, insertCart])
  } catch(e) {
    console.log(e);
  } 
}