# autojs
> android autojs红包礼物类脚本

### 说明
脚本主要用于红包礼物类自动处理

* 聊天室礼物
*自动识别抽红包



### TODO
1. 添加动态识别检测
2. 添加方框类显示
3. 因为无法通过id\text\desc找到控件, 全部使用找图方式
4. 当指定控件\文字\id不存在时，后续的延时操作取消
5. 在可以判断处理是否成功的前提下，写入悬浮日志，后续通过展示日志图表快速预览运行情况



### 展示
<div align=center><img height="300" width="550" src="https://github.com/Lirubn/SoulGiftAide/blob/main/Main.jpg"/></div>
<br>




### other
1. 目前所使用机型[Oneplus 7][1080 x 2400][开发者选项中最小宽度设值380]
2. 如果要通过shell直接运行脚本：
```
am start -n org.autojs.autojs/.external.open.RunIntentActivity -d file:///storage/emulated/0/脚本/大众点评-签到.js -t text/javascript
```
3. 编写代码[代码尽量在PC端vscode中编写，使用Autojs-VSCodeExt插件调试脚本，使用坚果云同步到手机端]
