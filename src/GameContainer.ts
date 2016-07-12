class GameContainer extends egret.DisplayObjectContainer {
    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.touchEnabled = true;
    }

    //滚动的舞台背景
    private scrollStage: StageScroll;
    //开始的按钮层，始终要保持这一层在最高级
    private startLayer:StartLayer;
    private bgMusic:egret.Sound;
    
    private gameLoop:GameLoop;

    

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

        

        this.gameLoop = new GameLoop(this);
        

        //游戏开始的按钮层
        this.startLayer = new StartLayer(this.stage.stageWidth,this.stage.stageHeight);  
        this.addChild(this.startLayer);      
        this.startLayer.addEventListener(StartLayer.START,this.startBtnTap,this);
        

        

    }

    private startBtnTap():void{
        console.log('start btn tap');
        this.removeChild(this.startLayer);
        //开始 
        this.gameLoop.start();
       

    }


    

    

    



}