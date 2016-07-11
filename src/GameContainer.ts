class GameContainer extends egret.DisplayObjectContainer {
    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.touchEnabled = true;
    }

    //滚动的舞台背景
    private scrollStage: StageScroll;
    private myPlane: MyPlane;
    private startLayer:StartLayer;
    private bgMusic:egret.Sound;


    public enemys:EnemyPlane[];

    /**
     * 主容器添加到舞台，初始化游戏
     */
    private addToStage(e: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);

        //添加滚动舞台
        this.scrollStage = new StageScroll();
        this.addChild(this.scrollStage);
        this.scrollStage.start();
        //添加背景音乐，背景音乐一直存在，从一开始就播放
        this.bgMusic = RES.getRes("music_mp3");
        this.bgMusic.play();
        //游戏开始的按钮层
        this.startLayer = new StartLayer(this.stage.stageWidth,this.stage.stageHeight);  
        this.addChild(this.startLayer);      
        this.startLayer.addEventListener(StartLayer.START,this.startBtnTap,this);
        

        

    }

    private startBtnTap():void{
        console.log('start btn tap');
        this.removeChild(this.startLayer);
        //开始 
        this.addEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
        this.initMyPlane();
        this.initEnemy();

    }


    private onFrame(e:egret.Event):void{
        console.log(this.enemys.length);
    }

    private initMyPlane(): void {
        this.myPlane = new MyPlane(this);
        this.addChild(this.myPlane);
        this.myPlane.x = this.stage.stageWidth - this.myPlane.width >> 1;
        this.myPlane.y = this.stage.stageHeight - this.myPlane.height >> 1;
        this.myPlane.start();
        
    }

    private enemeyTimer:egret.Timer;
    private initEnemy():void{
        this.enemys = [];
        this.enemeyTimer = new egret.Timer(1500);//1.5s
        this.enemeyTimer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        this.enemeyTimer.start();
    }

    private onTimer(e:egret.Timer):void{
        var enemy = new EnemyPlane(this);
        this.addChild(enemy);
        enemy.x = Math.random() * (this.stage.stageWidth - enemy.width);
        enemy.y = -enemy.height;
        this.enemys.push(enemy);
    }



}