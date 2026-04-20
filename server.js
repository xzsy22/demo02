const express = require('express');
const app = express();

const sub = {
  food: ['苹果','猪肉','大米','牛奶','鸡蛋'],
  daily: ['纸巾','洗衣液','牙膏','垃圾袋','毛巾'],
  electronics: ['手机','耳机','充电宝','数据线','鼠标']
};

app.get('/scan', (req, res) => {
  const cat = req.query.category;
  const list = sub[cat] || ['未知类别'];
  const item = list[Math.floor(Math.random() * list.length)];
  res.json({ code: 200, result: item });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
