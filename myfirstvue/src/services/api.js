import http from './http';
import store from "./store";
const api = {
    LOGIN: '/oauth/token',
	GET_AUTH_KEY:"/api/Authorization/setOpKey",
	GET_USERINFO: '/api/Account/UserInfo'
};


export default {
	setApp(app){
		http.setApp(app);
	},
	login(username, password) {
		return http.post({
				url: api.LOGIN,
				form: true,
				data: {
					grant_type: 'password',
					client_id: 'app_123456',
					client_secret: '123456',
					username,
					password
				}
			})
			.then((response) => {
				store.set('token', response);
				return this.getUserInfo();
			})
			.then((response) => {
				store.set('user', response);
				return Promise.resolve(response);
			});
	},
	getUserInfo() {
		return http.post({
			url: api.GET_USERINFO
		});
	},
	getCurrentToken(){
		var token = store.get("token") || {};
		return token.access_token;
	},
	getAuthKey(data) {
		return http.get({
			url: api.GET_AUTH_KEY,
			form:true,
			data: {
				...data
			}
		});
	},
};
