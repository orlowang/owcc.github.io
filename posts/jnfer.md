<!--begin
"title":"jnfer",
"subtitle":"A framework with new ES(js) library",
"bgphoto":"#f60",
"publishtime":"2015/03/07",
"category":"mess",
"preview":"src/assets/post1003.jpg"
end-->

## 构架
#### 1) jnfer整体构架
``` 
┌────────────┬────────────┬───────────┬────────────┐
│ ComponentA │ ComponentB │    ...    │ ComponentN │
├────────────┴────────────┴───────────┴────────────┤
│ Route Handle + System.js(dynamic load component) │
├──────────────────────────────────────────────────┤
│       Store(fetch data and bind props)           │
├──────────────────────────────────────────────────┤
│React + loadsh + other ES(js) utility-like library│
└──────────────────────────────────────────────────┘
```

#### 2) 组件构架和约定

