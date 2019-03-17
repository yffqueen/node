var express = require('express');
var router = express.Router();
var mgdb = require('../../common/mgdb');
router.get('/', function(req, res, next) {

  let {start,q,rule,count}=res.params;

  mgdb(
    {
      collection:'product'
    },
    ({collection,client})=>{
      collection.find(
        q ? {title: eval('/'+ q +'/g') } : {},{
        projection:{},
        sort:rule ? {[rule]:-1} : {'time':-1}
      }).toArray((err,result)=>{
        // console.log(result)
        let checkResult=result.slice(start*count,start*count+count)//提取要分页的数据
        let data = {
          error:0,msg:'成功',
          total:result.length,
          start:start+1,count,
          page_count: Math.ceil(result.length / count),//计算总页数
          page_data: checkResult,
        }
        res.send(data);
        client.close();
      })
    }
  );
});

module.exports = router;
