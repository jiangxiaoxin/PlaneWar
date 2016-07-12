class EnemyPlane extends Plane {

    private enemySpeed: number = 3;


    public constructor() {
        super('p1_png');
    }

   
    public updatePositin():void{
        this.y += this.enemySpeed;
    }
   

   
}