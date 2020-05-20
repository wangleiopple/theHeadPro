export default{
    get(key){
        const str=localStorage.getItem(key);
        if(str){
            return JSON.parse(str);
        }
        return null;
    },
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    val(key,value){
        if(value){
            this.set(key,value);
            return this;
        }else{
            return this.get(key);
        }
    }


}