var MyBullet = (function (_super) {
    __extends(MyBullet, _super);
    function MyBullet() {
        _super.call(this);
        this.speed = 6;
        this.damage = 1; //打一次扣一点血
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes('b1_png');
        this.addChild(bitmap);
    }
    var d = __define,c=MyBullet,p=c.prototype;
    p.updatePosition = function () {
        this.y -= this.speed;
    };
    return MyBullet;
}(egret.Sprite));
egret.registerClass(MyBullet,'MyBullet');
//# sourceMappingURL=MyBullet.js.map