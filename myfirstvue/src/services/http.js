import axios from 'axios';
import store from './store';
/*
* 
options : {
    url:"/api/actions",
    data:{}
}
*
*****/
export default {
	get(options) {
        if(options){
            options.method="get";
        }
        this.preAuthorization(options);
        options.params={...options.data};
		return axios({
			...options
		}).then((response)=>{
            return Promise.resolve(response.data);
        });
	},
	post(options) {
        if(options){
            options.method="post";
        }
        this.preAuthorization(options);
        if(options&&options.form){
            options.headers=options.headers||{};
            options.headers["Content-Type"] = "application/x-www-form-urlencoded";
            options.transformRequest=function(data){
                const params= Object.keys(data).map((key)=>{
                    return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
                });
                return params.join("&");
            }
        }
		return axios({
			...options
		}).then((response)=>{
            return Promise.resolve(response.data);
        });
    },

    refreshToken(token){
        
    },
    /*
    * 批量并发执行
    */
    patch(...requests){
        const promises = requests.map((options)=>{
            return this.get(options);
        });
        return Promise.all(promises);      
    },
    /*
    * 批量串行执行
    */
    patchSerial(...requests){
        const promises = requests.map((options)=>{
            return this.get(options);
        });
        if(promises.length==0) return Promise.resolve();
        return promises.reduce((all,p)=>all.then(()=>p.then(d=>console.log(d))),Promise.resolve());      
    },

    preAuthorization(options){
        //let token=null;
        //get token
        const token = store.get("token");
        //set header
        if(options && token){
            options.headers =  options.headers||{};
            options.headers["Authorization"] =`Bearer ${token.access_token}`;
        }
    }

};
