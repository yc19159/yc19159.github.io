import axios from 'axios';
import qs from 'qs';
// let protocol=location.protocal;
// let webShopping='http://';

// let baseUrl='https://alpha-push.fpwan.com/';
// let listBaseUrl='https://alpha-waimai.fpwan.com/';
let baseUrl='';
let listBaseUrl='';

if(location.host.indexOf('alpha')>=0){
    baseUrl='https://alpha-push.fpwan.com/';
    listBaseUrl='https://alpha-waimai.fpwan.com/';
}else if(location.host.indexOf('beta')>=0){
    baseUrl='https://beta-push.fpwan.com/';
    listBaseUrl='https://beta-waimai.fpwan.com/';
}else if(location.host.indexOf('localhost')>=0){
        baseUrl='https://alpha-push.fpwan.com/';
        listBaseUrl='https://alpha-waimai.fpwan.com/';
}else{
    baseUrl='https://push.fpwan.com/';
    listBaseUrl='https://waimai.fpwan.com/';
}





//测试token： eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdGF0dXMiOjEsImNoYW5uZWxJZCI6IjEwNDUiLCJ1c2VySWQiOiIzODA3NDgifQ.JfPov2IwYYTXcoDp2VhrVhqEEMh7R871nxoGzfWsqvs
// qs.stringify(param)
export const merchantLogin = (param) =>{
     return axios.get(baseUrl+'api/store/login',{
        params:param
    })
}

export const getPrintOrder = (param) =>{
    return axios.get(baseUrl+'api/store/waiMaiOrder',{
       params:param
   })
}

export const getSn = (param) =>{
    return axios.get(baseUrl+'api/store/yunPrinter',{
       params:param
   })
}

export const getPrinterData = (param) =>{
    return axios.get(baseUrl+'api/store/getPrinterConfigData',{
       params:param
   })
}

export const printConnect = (param) =>{
    return axios({
        method: 'post',
        url: baseUrl+'api/store/yunPrinter',
        data: qs.stringify(param)
    })
}

export const getList = (param) =>{
    return axios({
        method: 'post',
        url: listBaseUrl+'Order/getList',
        data: qs.stringify(param)
    })
}

export const orderTaking = (param) =>{
    return axios({
        method: 'post',
        url: listBaseUrl+'Order/updateOrder',
        data: qs.stringify(param)
    })
}