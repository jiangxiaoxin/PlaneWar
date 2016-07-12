var EnemyPlane = (function (_super) {
    __extends(EnemyPlane, _super);
    function EnemyPlane() {
        _super.call(this, 'p1_png');
        this.enemySpeed = 3;
    }
    var d = __define,c=EnemyPlane,p=c.prototype;
    p.updatePositin = function () {
        this.y += this.enemySpeed;
    };
    return EnemyPlane;
}(Plane));
egret.registerClass(EnemyPlane,'EnemyPlane');
//# sourceMappingURL=EnemyPlane.js.map