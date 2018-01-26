[TOC]

# API文档生成和测试的工具

### 产品背景  
团队协作中，前后端往往因为没有协商好API接口规范，导致了巨大的沟通成本与低效的开发。该工具就是为了解决这一问题而设计。

### 产品介绍：  
该工具为开发者提供符合RESTful风格的API文档管理、编辑、生成、预览、测试等功能。

### 模块分类：
- 角色模块  
    -   分类：用户、用户组
    -   关系：用户与用户组一对多
    -   管理：用户组用户按照权限对用户进行增加、删除
- 文档编辑模块  
    -   开发人员在配置表单里做请求路径、参数、方式等配置
- 文档生成模块 
    -   将配置表单生成为定制化的API文档
- 文档预览模块
    -   可对生成后的API文档做预览
    -   可选中某一份API文档进行预览、编辑  
- 接口测试模块
    -   对某一API文档的某一接口做请求测试，验证状态码及响应数据
- 文档管理模块
    - 用户组下用户根据对应权限对用户组下API文档做管理  


### 技术选型
- 前端: electron + react + ant-design
- 后端：nodejs + express + mongodb

### 界面设计
- 登录&注册  
![login.png](http://upload-images.jianshu.io/upload_images/9193234-2ffd30afeafe1d42.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 用户组登录  
选择进入对应的用户组  
![user-group.png](http://upload-images.jianshu.io/upload_images/9193234-6cd0a27a3f50c80a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 用户管理  
对用户进行增加、删除
![user-manage](http://upload-images.jianshu.io/upload_images/9193234-188503595a5bc196.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 配置表单  
配置请求路径、请求参数、响应状态码等
![image.png](http://upload-images.jianshu.io/upload_images/9193234-a99b97b7c563da4e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- API文档预览
![user.png](http://upload-images.jianshu.io/upload_images/9193234-3cd212da61bf9c5a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- API文档管理  
对文档进行编辑、删除
![manage](http://upload-images.jianshu.io/upload_images/9193234-6a352c8fe5a84cbe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 接口测试
    - 请求参数
![params](http://upload-images.jianshu.io/upload_images/9193234-7d516b73ba0416be.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 
    - 响应数据
![resData](http://upload-images.jianshu.io/upload_images/9193234-0a5f1bbc59ca6488.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

