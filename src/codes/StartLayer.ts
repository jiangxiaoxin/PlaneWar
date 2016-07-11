

class StartLayer extends egret.DisplayObjectContainer{

    public static START:string = "start_btn";

    private startBtn:Button;

    private stageWidth:number;
    private stageHeight:number;

    public constructor(width:number,height:number){
        super();

        this.stageWidth = width;
        this.stageHeight = height;

        this.startBtn = new Button("bntstart_png");
        this.addChild(this.startBtn);   //开始按钮居中显示
        this.startBtn.x = this.stageWidth - this.startBtn.width >> 1;
        this.startBtn.y = this.stageHeight - this.startBtn.height >> 1;
        this.startBtn.touchEnabled = true;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchStart,this);

    }

    private touchStart(e:egret.TouchEvent):void{
        this.dispatchEvent(new egret.Event(StartLayer.START));
    }
}