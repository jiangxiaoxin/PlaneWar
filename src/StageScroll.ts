/**
 * StageScroll extends egret.dis
 */
class StageScroll extends egret.DisplayObjectContainer {

    private stageW:number;
    private stageH:number;
    private scrollImageTexture:egret.Texture;
    private scrollImageWidth:number;
    private scrollImageHeight:number;
    private scrollImageCount:number;
    private scrollImageArr:egret.Bitmap[];
    private stageScrollSpeed:number = 1.5;

    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
    }

    private addToStage(e:egret.Event):void{
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
        this.createGameScene();
        
    }

    public start():void{
        this.addEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
    }

    public stop():void{
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
    }

    private onFrame(e:egret.Event):void{
        for(var i = 0;i<this.scrollImageCount;i++){
            var image = this.scrollImageArr[i];
            image.y += this.stageScrollSpeed;
            if (image.y >= this.stageH) {   //滚动屏幕时，离开屏幕的那个就是数组最后的那个图片
                image.y = this.scrollImageArr[0].y - this.scrollImageHeight;
                this.scrollImageArr.pop();
                this.scrollImageArr.unshift(image);
            }
        }
    }

    private createGameScene():void{
       
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.scrollImageTexture = RES.getRes('stage01_jpg');
        this.scrollImageWidth = this.scrollImageTexture.textureWidth;
        this.scrollImageHeight = this.scrollImageTexture.textureHeight;
        this.scrollImageCount = Math.ceil(this.stageH/this.scrollImageHeight) + 1;
        this.scrollImageArr = [];
        for(var i:number=0;i<this.scrollImageCount;i++){
            var image:egret.Bitmap = new egret.Bitmap(this.scrollImageTexture);
            image.y = -(this.scrollImageHeight * this.scrollImageCount - this.stageH) + this.scrollImageHeight * i;
            this.scrollImageArr.push(image);
            this.addChild(image);
        }

    }



    



}