const express = require('express');
const app = express();

// 子类词库
const sub = {
  food: ['苹果', '猪肉', '大米', '牛奶', '鸡蛋', '面包', '牛肉', '鱼'],
  daily: ['纸巾', '洗衣液', '牙膏', '垃圾袋', '毛巾', '洗发水', '肥皂'],
  electronics: ['手机', '耳机', '充电宝', '数据线', '鼠标', '键盘', 'U盘']
};

app.get('/scan', (req, res) => {
  const category = req.query.category;

  // 校验参数：如果没传 category 或 传入的值不在词库中，返回 400
  if (!category || !sub[category]) {
    return res.status(400).json({
      code: 400,
      result: '无效的母类'  // 可根据需要自定义错误提示
    });
  }

  // 随机抽取子类
  const list = sub[category];
  const randomItem = list[Math.floor(Math.random() * list.length)];

  // 成功返回
  res.json({
    code: 200,
    result: randomItem
  });
});

// 处理其他不存在的路由，统一返回 404（可选）
app.use((req, res) => {
  res.status(404).json({ code: 404, result: '接口不存在' });
});

// 监听端口（适配 Railway 等平台的环境变量）
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
