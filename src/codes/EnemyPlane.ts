class EnemyPlane extends Plane {

    private enemySpeed: number = 3;
    private maingame: GameContainer;

    public constructor(maingame: GameContainer) {
        super('p1_png');
        this.maingame = maingame;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }

    private addToStage(e: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.remove,this);
    }

    private onFrame(e: egret.Event): void {
        this.y += this.enemySpeed;
        if (this.y > this.stage.stageHeight) {
            var index = this.maingame.enemys.indexOf(this);
            this.maingame.enemys.splice(index,1);
            this.disappear();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);

        }
    }

    private disappear(): void {
        this.parent.removeChild(this);
    }

    private remove(e:egret.Event):void{
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.remove,this);
    }
}