# autojs
> android autojs红包礼物类脚本


### 展示
<div align=center><img height="300" width="550" src="https://github.com/Lirubn/SoulGiftAide/blob/main/Main.jpg"/></div>
<br>

### 使用说明
******
1. 检查设备环境

- 操作系统: Android 7.0+

2. 下载并安装 Auto.js

- [4.1.1 Alpha2](https://github.com/SuperMonster002/Hello-Sockpuppet/raw/master/%5Bauto.js%5D%5B4.1.1_alpha2%5D%5Barm-v7%5D(b69a4e23).apk?raw=true) (`免费版本`)
- [Pro 7.0.4-1](https://github.com/SuperMonster002/Hello-Sockpuppet/blob/master/%5Bauto.js%5D%5Bpro_7.0.4-1%5D(31b16c93).apk?raw=true) (`付费版本`)
- [Pro 8.3.16-0](https://github.com/SuperMonster002/Hello-Sockpuppet/blob/master/%5Bauto.js%5D%5Bpro_8.3.16-0%5D(9a414abf).apk?raw=true) (`付费版本`)

3. 下载并部署项目 (任意一种方式)

- [下载项目部署工具](http://doc.autoxjs.com/)
    1. 将部署工具 (脚本文件) `保存` 或 `另存为` 至本地存储
    2. 用 `Auto.js` 直接运行 (或导入后运行) 脚本文件完成部署
    3. 部署后可能需要关闭并重启 `Auto.js` 才能看到项目目录
- [下载最新项目数据包](https://github.com/Lirubn/SoulGiftAide)
    1. 将项目数据包解压到本地存储
    2. 定位到设备的内部存储目录 如:  
       `/内部存储/` `/Internal Storage/` `/sdcard/` `/storage/emulated/0/` 等
    3. 在此目录下找到 `Auto.js` 默认工作目录  
       · 中文系统默认目录 `./脚本/`  
       · 英文系统默认目录 `./Scripts/`
    4. 若不存在则需手动建立工作目录  
       或在 `Auto.js` 软件中设置工作目录
    5. 将解压后的项目文件夹放置在工作目录中

4. 使用 Auto.js 运行项目

- 运行 `main.js` 启动项目

******
### 使用指南
******
* [编译器文档](http://doc.autoxjs.com) (`文字`)
******
### 功能简介
******
* 聊天室礼物
*自动识别抽红包



### 版本历史

[comment]: <> (Version history only shows last 3 versions)
# v21.40
###### 2021/08/02
* `新增` 添加动态识别检测
* `新增` 添加方框类显示
* `修复` 因为无法通过id\text\desc找到控件, 全部使用找图方式
* `优化` 在可以判断处理是否成功的前提下，写入悬浮日志，后续通过展示日志图表快速预览运行情况
* `优化` 当指定控件\文字\id不存在时，后续的延时操作取消


### other
1. 目前所使用机型[Oneplus 7][1080 x 2400][开发者选项中最小宽度设值380]
2. 如果要通过shell直接运行脚本：
```
am start -n org.autojs.autojs/.external.open.RunIntentActivity -d file:///storage/emulated/0/脚本/App/Main.js -t text/javascript
```
3. 编写代码[代码尽量在PC端vscode中编写，使用Autojs-VSCodeExt插件调试脚本，使用坚果云同步到手机端]
