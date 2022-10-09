"ui";
ui.statusBarColor("#0061A6"); //通知栏颜色
let errorWza = "当前设备不支持跳转设置,请手动开启权限!";
let WzaYes = "无障碍服务已启动！";
let textWzaTrue = "无障碍服务(已开启)";
let XfcYes = "悬浮窗权限已获取！";
let textXfcTrue = "悬浮窗权限(已获取)";
let TextQx = "未获取到权限";
let ColoredButton = ColoredButtonS();
var NetworkStates = false;
var window = null;
var GetHongBao = false;
var GetLiWu = false;
ui.layout(
    <vertical w="*">
        <appbar>
            <toolbar id="toolbar" title="SoulGiftAide"bg="#0061A6" />
        </appbar>
        <vertical w="*" h="75">
            <frame w="*"h="*">
                <button id="ButtomWza"w="*"h="*"background="?android:attr/selectableItemBackground"/>
                <horizontal w="*"h="*">
                    <img  tint="#49454F"src="@drawable/ic_accessibility_black_48dp" layout_gravity="center_vertical|left" margin="15 0 15 0" w="auto"h="auto"/>
                    <text id="TextWza"text="无障碍服务" textStyle="bold" textColor="#000000"textSize="18sp" marginLeft='15'layout_gravity="center_vertical"/>
                    <frame w="*"h="*">
                        <checkbox theme="#000000" id="CheBoxWza"paddingRight="20" layout_gravity="right|center_vertical" w="auto" h="auto" />
                    </frame >
                </horizontal>
            </frame>
        </vertical>
        /**/
        <vertical w="*" h="75">
            <frame w="*"h="*">
                <button id="ButtomXfc"w="*"h="*"background="?android:attr/selectableItemBackground"/>
                <horizontal w="*"h="*">
                    <img  tint="#49454F"src="@drawable/ic_photo_size_select_large_black_48dp" layout_gravity="center_vertical|left" margin="15 0 15 0" w="auto"h="auto"/>
                    <text id="TextXfc"text="悬浮窗权限" textStyle="bold" textColor="#000000"textSize="18sp" marginLeft='15'layout_gravity="center_vertical"/>
                    <frame w="*"h="*">
                        <checkbox id="CheBoxXfc"paddingRight="20" layout_gravity="right|center_vertical" w="auto" h="auto" />
                    </frame >
                </horizontal>
            </frame>
        </vertical>
        /**/
        <vertical w="*" h="75">
            <frame w="*"h="*">
                <button id="ButtomQhb"w="*"h="*"background="?android:attr/selectableItemBackground"/>
                <horizontal w="*"h="*">
                    <img  tint="#49454F"src="@drawable/ic_account_balance_wallet_black_48dp" layout_gravity="center_vertical|left" margin="15 0 15 0" w="auto"h="auto"/>
                    <text id="TextQhb"text="抢红包" textStyle="bold" textColor="#000000"textSize="18sp" marginLeft='15'layout_gravity="center_vertical"/>
                    <frame w="*"h="*">
                        <checkbox id="CheBoxQhb"paddingRight="20" layout_gravity="right|center_vertical" w="auto" h="auto" />
                    </frame >
                </horizontal>
            </frame>
        </vertical>
        /**/
        <vertical w="*" h="75">
            <frame w="*"h="*">
                <button id="ButtomQlw"w="*"h="*"background="?android:attr/selectableItemBackground"/>
                <horizontal w="*"h="*">
                    <img  tint="#49454F"src="@drawable/ic_card_giftcard_black_48dp" layout_gravity="center_vertical|left" margin="15 0 15 0" w="auto"h="auto"/>
                    <text id="TextQlw"text="抢礼物" textStyle="bold" textColor="#000000"textSize="18sp" marginLeft='15'layout_gravity="center_vertical"/>
                    <frame w="*"h="*">
                        <checkbox id="CheBoxQlw"paddingRight="20" layout_gravity="right|center_vertical" w="auto" h="auto" />
                    </frame >
                </horizontal>
            </frame>
        </vertical>
        /**/
        <vertical w="*" h="75">
            <frame w="*"h="*">
                <button id="ButtomQd"w="*"h="*"background="?android:attr/selectableItemBackground"/>
                <horizontal w="*"h="*">
                    <img  tint="#49454F"src="@drawable/ic_play_arrow_black_48dp" layout_gravity="center_vertical|left" margin="15 0 15 0" w="auto"h="auto"/>
                    <text id="TextQd"text="启动" textStyle="bold" textColor="#000000"textSize="18sp" marginLeft='15'layout_gravity="center_vertical"/>
                </horizontal>
            </frame>
        </vertical>
    </vertical>
);

(function UiRun() {
    //importClass(android.content.res.ColorStateList);
    // var colorStateList = new ColorStateList([[android.R.attr.state_selected,2,3],[android.R.attr.state_selected,2,3],[android.R.attr.state_selected,2,3]],[colors.parseColor("#000000"),colors.parseColor("#000000"),colors.parseColor("#000000")]);
    //ui.CheBoxWza.setButtonTintList(colorStateList);
    //log(ui.CheBoxWza)
    //log(ui.CheBoxWza.setBackgroundColor)
    var thread = null;
    if (GetAccessible()) {
        ui.CheBoxWza.setChecked(true);
        ui.TextWza.setText(textWzaTrue);
    }
    if (DetermineWindowPermissions()) {
        ui.CheBoxXfc.setChecked(true);
        ui.TextXfc.setText(textXfcTrue);
    }
    // 当用户回到本界面时，resume事件会被触发
    ui.emitter.on("resume", Resume);
    //无障碍服务
    ui.ButtomWza.on("click", buttonWza);
    //悬浮窗权限
    ui.ButtomXfc.on("click", buttonXfc);
    //抢红包
    ui.ButtomQhb.on("click", QiangHongBao);
    //抢礼物
    ui.ButtomQlw.on("click", QiangLiWu);
    //Main
    ui.ButtomQd.on("click", UiRunMain);

    function UiRunMain() {
        function MainThread() {
            if (GetHongBao == false && GetLiWu == false){
                toast("至少选择一项");
                thread = null;
                return;
            }else{
                if(GetHongBao == true && GetLiWu == true){
                    toast("请勿全选");
                    thread = null;
                    return;
                }
            }
            if (!GetAccessible() || !DetermineWindowPermissions()) {
                toast(TextQx);
                return;
            }
            //code...
            window = floaty.window( //ff5722
                <frame>
                        <colored-button id="but"text="▶" ctextSize="18sp"color="#FFb11B"/>
                    </frame>
            );
            //悬浮按钮
            window.but.on("click", NoOff);
            //横竖屏监听
            window.setPosition(device.width * 0.7, device.height * 0.8);
            setInterval(() => {}, 1000);
            Main();
        }
        if (thread == null) {
            thread = threads.start(MainThread);
        } else {
            toast("已经启动了");
        }
    }

    function QiangHongBao() {
        if(GetHongBao == false) {
            ui.CheBoxQhb.setChecked(true);
            GetHongBao = true;
        } else {
            ui.CheBoxQhb.setChecked(false);
            GetHongBao = false;
        }
    }
    
    function QiangLiWu(){
        if(GetLiWu == false) {
            ui.CheBoxQlw.setChecked(true);
            GetLiWu = true;
        } else {
            ui.CheBoxQlw.setChecked(false);
            GetLiWu = false;
        }
    }
    function NoOff() {
        if (!NetworkStates) {
            NetworkStates = true;
            window.but.setText("■");
            window.but.attr("color", "#ff5722");
        } else {
            NetworkStates = false;
            window.but.setText("▶");
            window.but.attr("color", "#FFb11B");
        }
    }

    function Resume() {
        if (GetAccessible()) {
            ui.CheBoxWza.setChecked(true);
            ui.TextWza.setText(textWzaTrue);
        } else {
            ui.CheBoxWza.setChecked(false);
        }
        if (DetermineWindowPermissions()) {
            ui.CheBoxXfc.setChecked(true);
            ui.TextXfc.setText(textXfcTrue);
        } else {
            ui.CheBoxXfc.setChecked(false);
        }

    }

    function buttonWza() {
        if (GetAccessible()) {
            toast(WzaYes);
            return;
        }
        ui.CheBoxWza.setChecked(true);
        try {
            app.startActivity({
                action: "android.settings.ACCESSIBILITY_SETTINGS",
            });
        } catch (error) {
            toast(errorWza);
        }
    }

    function buttonXfc() {
        if (DetermineWindowPermissions()) {
            toast(XfcYes);
            return;
        }
        ui.CheBoxXfc.setChecked(true);
        try {
            app.startActivity({
                action: "android.settings.action.MANAGE_OVERLAY_PERMISSION",
            });
        } catch (error) {
            toast(errorWza);
        }
    }

    function GetAccessible() {
        // body...
        importClass("android.content.pm.PackageManager");
        importClass("android.provider.Settings");
        const myPackageName = context.getPackageName(); //获取应用的包名
        if (auto.rootInActiveWindow)
            return true;
        else
            return false;
    }

    function DetermineWindowPermissions() {
        return (new android.provider.Settings).canDrawOverlays(context);
    }

    function AndroidConfirm(Message) {
        var builder = new android.app.AlertDialog.Builder(activity);
        builder.setTitle('提示');
        builder.setMessage(Message);
        builder.setCancelable(false);
        var dialog = builder.create();
        dialog.show();
    }
})();










importClass(android.graphics.Rect);
//let MLKitOCR = $plugins.load('org.autojs.autojspro.plugin.mlkit.ocr');
//let ocr = new MLKitOCR();
// 初始化ColorMapping
let ColorMapping = $colors.mapping;
// 创建ColorMapping实例
let cm = new ColorMapping();
/**/
var DrawIdentifyAreas = [];
var DrawLineRect = [];
let FloatyCanavarView = CanavarView();
let TCanavar = new Canavarinit();
let DrawView = new FloatyCanavarView(TCanavar.window.img);
threads.start(function() {
    DrawView.setDraw(function(canvas) {
        if (!DrawLineRect) {
            return 0;
        }
        for (var i = 0; i < DrawLineRect.length; i++) {
            try {
                var x = DrawLineRect[i].centerX();
                var y = DrawLineRect[i].centerY();
                var x1 = DrawIdentifyAreas[i].centerX();
                var y1 = DrawIdentifyAreas[i].centerY();
                canvas.drawLine(x, y - 80, x, y + 80, TCanavar.paint2);
                canvas.drawLine(x - 80, y, x + 80, y, TCanavar.paint2);
                canvas.drawRect(DrawIdentifyAreas[i], TCanavar.paint2);
                //canvas.drawLine(0, 0, x1, y1, TCanavar.paint2);
                floatyLog('找到' + DrawLineRect.length + '个');
            } catch (error) {
                log(error)
            }
        }
    });
});

/**/
/*
events.on("eixt", function() {
    //回收图片
    cm.recycle();
    TCanavar.window.close();
    floatystop();
    backAPP();
    thread.interrupt();
    exit();
    orientationListener.disable();
});

*/

function Main() {
    //申请截图权限
    $images.requestScreenCapture();
    GeneralFloatyLogInit(6, 0, device.height * 0.7, true) //
    floatyLog("开始启动,当前状态默认关闭,按下启动键启动此脚本");
    while (true) {
        if (NetworkStates) {
            var data = GetSoulCoordinateData();
            for (var i = 0; i < data.length; i++) {
                press(data[i].x, data[i].y + 15, 10);
            }
        } else {
            DrawIdentifyAreas = [];
            DrawLineRect = [];
        }
    }
}



function GetSoulCoordinateData() {
    //while (true) {
    // 截屏
    let img = $images.captureScreen();
    // 初始化颜色映射
    cm.reset(img);
    //let ColorData = ['#D81D6F', '#D36F27', '#6240F9', '#4180CE'];
    var ColorData = [
        ['#7CB3E4', '#1C54BD'],
        ['#AAA0F9', '#280BCE'],
        ['#F782AB', '#C11141'],
        ['#F6D25A', '#B9450D'],
        ['#D81E6E', '#E3489E']
        //['#B44D0B', '#B44D0B']#FF4D42
    ];
    var ColorHongBao = ['#FFF384', '#FF4D42'];
    
    if (GetHongBao && GetLiWu) {
        ColorData[ColorData.length] = ColorHongBao;
    }
    if(GetHongBao){
        ColorData = [ColorHongBao];
    }
    
    /**/
    var abc = []; //方框数据
    var CoordinateData = [];
    /**/
    var CoordinateData1 = [];
    for (var i = 0; i < ColorData.length; i++) {
        var point = cm.findColor(ColorData[i][0], {
            threshold: 3
        });
        //var point = findColor(img, ColorData[i][0]);
        if (point) {
            //floatyLog("找到，坐标为(" + point.x + ", " + point.y + ")");
            var Ex = point.x,
                Ey = point.y;
            var Jx = 300,
                Jy = 300;
            var Ax = 150,
                Ay = 150;
            if (point.x - Ax < 0) {
                Ax += point.x - Ax;
            }
            if (point.y - Ay < 0) {
                Ay += point.y - Ay;
            }
            if (point.x + Jx > img.width) {
                Jx = img.width - point.x;
            }
            if (point.y + Jx > img.height) {
                Jy = img.height - point.y;
            }
            var RecognitionResult = true;
            for (var j = 1; j < ColorData[i].length; j++) {
                var GetImgPoint = false;
                try {
                    GetImgPoint = cm.findColor(ColorData[i][j], {
                        region: [point.x - Ax, point.y - Ay, Jx, Jy],
                        threshold: 2
                    });
                } catch (error) {
                    log(error);
                }
                if (!GetImgPoint) {
                    RecognitionResult = false;
                }
            }
            abc[abc.length] = new Rect(
                point.x - Ax,
                point.y - Ay,
                point.x - Ax + Jx,
                point.y - Ay + Jy
            );
            if (RecognitionResult && point.y >= device.height * 0.05) {
                /**/
                CoordinateData[CoordinateData.length] = new Rect(point.x, point.y, point.x, point.y);
                /**/
                CoordinateData1[CoordinateData1.length] = {
                    x: point.x,
                    y: point.y
                };
            }
        } else {
            //DrawLineRect = new Rect(8999, 9990, 8999, 9990);
            continue;
        }
    }
    /**/
    DrawIdentifyAreas = abc;
    DrawLineRect = CoordinateData;
    /**/
    return CoordinateData1;
    //}
}










function GeneralFloatyLogInit(linesCount, x, y, islog) {
    importClass(android.view.View);
    let _linesCount = linesCount || 6;
    if (typeof _linesCount != 'number') _linesCount = 6;
    if (typeof x != 'number') x = 0;
    if (typeof y != 'number') y = 10;
    if (typeof islog != 'boolean') islog = true;
    let initX = x
    let initY = y
    let rawWindowStr = '\
    <card w="*" id="plk" visibility="visible" h="auto" marginLeft="3" cardBackgroundColor="#88242424" cardCornerRadius="8dp" cardElevation="1dp" gravity="center_vertical">\
        <vertical  paddingLeft="5" paddingRight="5" w="*">\
            <Chronometer id="chronometer" textSize="13dp" textColor="#02DF6D" w="*" style="Widget/AppCompat.Button.Borderless" textStyle="bold"/>\
            <text id="info" text="" textSize="13dp"  textColor="#02DF6D" textStyle="bold" layout_width="wrap_content" layout_height="wrap_content" />\
            <button id="log" textSize="13dp" textColor="#02DF6D" style="Widget/AppCompat.Button.Borderless"  textStyle="bold"\
                layout_gravity="left" layout_weight="5" layout_width="wrap_content" layout_height="wrap_content" />\
        </vertical>\
    </card>'
    floatyLogW = floaty.rawWindow(rawWindowStr);
    ui.run(() => {
        floatyLogW.info.setVisibility(View.GONE)
    })
    let nowlogArr = [];
    Log = function(string) {
        let s = '[' + dateFormat(new Date(), "HH:mm:ss") + '] '
        for (let param of arguments) {
            if (param === false) continue;
            s += param + ' ';
        }
        var file = files.exists("/sdcard/log.ini");
        if (file) {
            files.append("/sdcard/log.ini", (s + "\n"));
        } else {
            files.createWithDirs("/sdcard/log.ini");
            files.append("/sdcard/log.ini", (s + "\n"));
        }
        log(s);
    }
    floatyLog = function(noLog, age) {
        let s = '[' + dateFormat(new Date(), "HH:mm:ss") + '] '
        for (let param of arguments) {
            if (param === false) continue;
            s += param + ' ';
        }
        nowlogArr.push(s);

        if (nowlogArr.length > _linesCount) nowlogArr.shift();
        let printContent = nowlogArr.join('\n');
        ui.run(() => {
            //floatyLogW.chronometer.setFormat('[正在运行中  请勿进行其它操作] %s\n已收集：' + lengths)
            floatyLogW.log.setText(printContent)
        })
        if (islog && noLog !== false) log(s);
    }

    floatyLogShow = function(x, y) {
        let _x = x || initX
        let _y = y || initY
        ui.run(() => {
            floatyLogW.setPosition(_x, _y)
        })
    }

    floatyLogHide = function() {
        ui.run(() => {
            floatyLogW.setPosition(3000, 3000)
        })
    }

    floatystop = function() {
        ui.run(() => {
            floatyLog("结束");
            floatyLogW.chronometer.stop();
        })
    }
    floatySetPos = function(x, y) {
        ui.run(() => {
            floatyLogW.setPosition(x, y)
        })
    }

    floatySetInfo = function(arr) {
        ui.run(() => {
            if (!arr || arr.length <= 0) {
                floatyLogW.info.setVisibility(View.GONE);
            } else {
                let nowInfoArr = [];
                for (let param of arr) nowInfoArr.push(param)
                let infoContent = nowInfoArr.join('\n');
                floatyLogW.info.setText(infoContent)
                floatyLogW.info.setVisibility(View.VISIBLE);
            }
        })
    }

    function dateFormat(date, fmt_str) {
        return java.text.SimpleDateFormat(fmt_str).format(new Date(date || new Date()));
    }

    ui.run(() => {
        //floatyLog('点击右侧悬浮按钮启动')
        floatyLogW.chronometer.setFormat('Time: %s')
        floatyLogW.chronometer.start()
        floatyLogW.setTouchable(false);
        floatyLogW.setPosition(x, y);
    })
}

function Canavarinit() {
    this.window = floaty.rawWindow(
        <ImageView id="img"/>
    );
    this.window.setSize(-1, -1);
    this.window.setTouchable(false);
    this.paint1 = new Paint;
    //paint1.setTextAlign(Paint.Align.CENTER);
    this.paint1.setStrokeWidth(6);
    this.paint1.setStyle(Paint.Style.STROKE);
    //.paint1.setStyle(Paint.Style.FILL);
    this.paint1.setARGB(255, 255, 0, 0);
    this.paint1.setTextSize(75);
    this.paint2 = new Paint;
    //paint2.setTextAlign(Paint.Align.CENTER);
    this.paint2.setStrokeWidth(6);
    //实心画笔
    //paint2.setStyle(Paint.Style.STROKE);
    //空心
    this.paint2.setStyle(Paint.Style.STROKE);
    //this.paint2.setStyle(Paint.Style.FILL);
    this.paint2.setARGB(255, 0, 255, 0);
    //this.paint2.setTextSize(75);
    setInterval(() => {}, 1000);
}



function CanavarView() {
    return function(view) {
        if (view.accessibilityClassName != "android.widget.ImageView") {
            throw "我报错";
        };
        this.width = view.getWidth();
        this.height = view.getHeight();
        this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
        this.canvas = new android.graphics.Canvas(this.bitmap);
        this.matrix = new android.graphics.Matrix();
        threads.start(new java.lang.Runnable(() => {
            while (true) {

                if (view.getWidth() != this.width || view.getHeight() != this.height) {
                    this.width = view.getWidth();
                    this.height = view.getHeight();
                    this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
                    this.canvas = new android.graphics.Canvas(this.bitmap);
                };

                sleep(0);
            };
        }));
        this.Draw = function() {};
        this.setDraw = function(fun) {
            if (typeof fun == "function") {
                this.Draw = fun;
            };
        };
        setInterval(() => {
            try {
                this.bitmap.eraseColor(0);
                this.canvas.setMatrix(this.matrix);
                this.Draw(this.canvas);
                ui.run(() => {
                    view.setImageBitmap(this.bitmap);
                });
            } catch (e) {
                toastLog(e);
            };
        }, 30);
    };
}


function Protools() {
    var mModule = {}

    //增加方法.
    mModule.test1 = {}
    mModule.test2 = function() {}

    main();

    function main() {
        limit();
    }

    function limit() {
        importClass(com.stardust.autojs.core.accessibility.AccessibilityBridge.WindowFilter);
        let bridge = runtime.accessibilityBridge;
        let bridgeField = runtime.getClass().getDeclaredField("accessibilityBridge");
        let configField = bridgeField.getType().getDeclaredField("mConfig");
        configField.setAccessible(true);
        configField.set(bridge, configField.getType().newInstance());
        bridge.setWindowFilter(new JavaAdapter(AccessibilityBridge$WindowFilter, {
            filter: function(info) {
                return true;
            }
        }));
    }
    return mModule;
}


function ColoredButtonS() {
    var ColoredButton = (function() {
        //继承ui.Widget
        util.extend(ColoredButton, ui.Widget);

        function ColoredButton() {
            //调用父类构造函数
            ui.Widget.call(this);
            //自定义属性color，定义按钮颜色
            this.defineAttr("color", (view, name, defaultGetter) => {
                return this._color;
            }, (view, name, value, defaultSetter) => {
                this._color = value;
                view.attr("backgroundTint", value);
            });
            //自定义属性onClick，定义被点击时执行的代码
            this.defineAttr("onClick", (view, name, defaultGetter) => {
                return this._onClick;
            }, (view, name, value, defaultSetter) => {
                this._onClick = value;
            });
        }
        ColoredButton.prototype.render = function() {
            return (
                <button textSize="16sp" style="Widget.AppCompat.Button.Colored" w="auto"/>
            );
        }
        ColoredButton.prototype.onViewCreated = function(view) {
            view.on("click", () => {
                if (this._onClick) {
                    eval(this._onClick);
                }
            });
        }
        ui.registerWidget("colored-button", ColoredButton);
        return ColoredButton;
    })();
    return ColoredButton;
}