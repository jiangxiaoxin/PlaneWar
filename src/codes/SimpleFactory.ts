

class SimpleFactory{

    public constructor(){
        this.clsDict = new Object();
        
    }

    private static _instance:SimpleFactory;
    public static getInstance():SimpleFactory{
        if (!this._instance) {
            this._instance = new SimpleFactory();
        }
        return this._instance;
    }

    public clsDict:Object;

    public bindClass(cls:any):void{
        if (!this.clsDict[cls]) {
            this.clsDict[cls] = [];
        }
    }

    public getClassInstance(cls:any):any{
        var arr:any[] = this.clsDict[cls];
        if (arr && arr.length) {
            return arr.pop();
        }
        return new cls();
    }

    public saveClassInstance(cls:any,instance:any):void{
        var arr = this.clsDict[cls];
        if (arr) {
            arr.push(instance);
        }else{
            this.clsDict[cls] = [instance];
        }
    }

}