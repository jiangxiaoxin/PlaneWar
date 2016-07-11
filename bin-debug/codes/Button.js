var Button = (function (_super) {
    __extends(Button, _super);
    function Button(resName) {
        _super.call(this);
        this.resName = resName;
        var bitmap = new egret.Bitmap();
        var texture = RES.getRes(resName);
        bitmap.texture = texture;
        this.addChild(bitmap);
    }
    var d = __define,c=Button,p=c.prototype;
    return Button;
}(egret.Sprite));
egret.registerClass(Button,'Button');
//# sourceMappingURL=Button.js.map