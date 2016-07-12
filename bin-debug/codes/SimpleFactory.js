var SimpleFactory = (function () {
    function SimpleFactory() {
        this.clsDict = new Object();
    }
    var d = __define,c=SimpleFactory,p=c.prototype;
    SimpleFactory.getInstance = function () {
        if (!this._instance) {
            this._instance = new SimpleFactory();
        }
        return this._instance;
    };
    p.bindClass = function (cls) {
        if (!this.clsDict[cls]) {
            this.clsDict[cls] = [];
        }
    };
    p.getClassInstance = function (cls) {
        var arr = this.clsDict[cls];
        if (arr && arr.length) {
            return arr.pop();
        }
        return new cls();
    };
    p.saveClassInstance = function (cls, instance) {
        var arr = this.clsDict[cls];
        if (arr) {
            arr.push(instance);
        }
        else {
            this.clsDict[cls] = [instance];
        }
    };
    return SimpleFactory;
}());
egret.registerClass(SimpleFactory,'SimpleFactory');
//# sourceMappingURL=SimpleFactory.js.map