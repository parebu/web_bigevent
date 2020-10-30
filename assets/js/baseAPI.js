//注意每次调用$.get()$.post()$.ajax()的时候
//会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前 统一萍姐请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // console.log(options.url);


    //统一为有权限 的接口 设置headers 请求头

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //全局同意挂载 complete 回调函数
    //不论成功还是失败 最终都会调用complete 回调函数
    options.complete = function (res) {
        // console.log('执行了complete回调')
        // console.log(res);
        // 在 complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据


        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空token
            localStorage.removeItem('token')
            //2.强制跳转到登陆页面
            location.href = '/login.html'
        }
    }
})