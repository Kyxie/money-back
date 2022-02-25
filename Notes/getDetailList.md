后端给前端返回

```json
{
  "detail-list": [
    {
      "id": 1,
      "month": 1,
      "day": 13,
      "year": 2022,
      "amount": -98,	// 当天的收支总额
      "list": [
        {
          "category": "Gift",
          "icon": "gift-o",	// 图标
          "type": 0,	// 0 表示支出，1表示收入
          "amount": 193	// 单个商品的消费
        },
        {
          "category": "Work",
          "icon": "user-o",
          "type": 1,
          "amount": 24
        },
        {
          "category": "Play",
          "icon": "service-o",
          "type": 0,
          "amount": 13
        }
      ]
    },
    {},
    {}
  ]
}
```

