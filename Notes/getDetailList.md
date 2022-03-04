# 当前数据格式

```json
[
  {
    "_id": "621a6cba27d75d512bb149bc",
    "category": "Gift",
    "amount": 120,
    "type": 0,
    "icon": "gift-o",
    "year": 2022,
    "month": 2,
    "day": 2,
    "createAt": "2022-02-26T18:08:52.707Z",
    "uid": "6213f31da264bcabc69d4469",
    "__v": 0
  },
  {
    "_id": "621a6ce327d75d512bb149be",
    "category": "Work",
    "amount": 1200,
    "type": 1,
    "icon": "work-o",
    "year": 2022,
    "month": 2,
    "day": 2,
    "createAt": "2022-02-26T18:08:52.707Z",
    "uid": "6213f31da264bcabc69d4469",
    "__v": 0
  },
  {
    "_id": "621a6cf127d75d512bb149c0",
    "category": "Work",
    "amount": 1200,
    "type": 1,
    "icon": "work-o",
    "year": 2022,
    "month": 2,
    "day": 20,
    "createAt": "2022-02-26T18:08:52.707Z",
    "uid": "6213f31da264bcabc69d4469",
    "__v": 0
  },
  {
    "_id": "621a6cfc27d75d512bb149c2",
    "category": "Work",
    "amount": 1200,
    "type": 1,
    "icon": "work-o",
    "year": 2022,
    "month": 2,
    "day": 26,
    "createAt": "2022-02-26T18:08:52.707Z",
    "uid": "6213f31da264bcabc69d4469",
    "__v": 0
  },
  {
    "_id": "621a6d0e27d75d512bb149c4",
    "category": "Gift",
    "amount": 300,
    "type": 0,
    "icon": "gift-o",
    "year": 2022,
    "month": 2,
    "day": 26,
    "createAt": "2022-02-26T18:08:52.707Z",
    "uid": "6213f31da264bcabc69d4469",
    "__v": 0
  }
]
```

后端应该给前端返回

```json
[
        {
            "id": 1, // 第几天
            "month": 1,
            "day": 13,
            "year": 2022,
            "amount": -98, // 当天的收支总额
            "list": [
                {
                    "category": "Gift",
                    "icon": "gift-o", // 图标
                    "type": 0, // 0 表示支出，1表示收入
                    "amount": 193 // 单个商品的消费
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
```
