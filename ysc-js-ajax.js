//opt为对象类型：
//url必须有,post方法时postData和data至少有一个
//{string}opt.method http连接的方式，包括POST和GET两种方式
//{string}opt.url 发送请求的url
//{string}opt.postData (post方法时postData和data至少有一个）POST方法时发送的参数，jQuery封装没有。
//{string}opt.dataType （可选，'xml'/'json', 默认值'json')
//{boolean}opt.async （可选，ture/false,默认值true)是否为异步请求，true为异步的，false为同步的
//{object}opt.data （post方法时postData和data至少有一个）发送的参数，格式为对象类型
//{function}opt.success ajax 发送并接收成功调用的回调函数
//{function}opt.error (可选）ajax发送并接收成功调用的回调函数

//17.3.9: !注意我这个封装函数中的方法是用opt.method而不是opt.type来表示,区别于jQuery的封装

function ajax(opt) {
    var xhr = null;
    var method = opt.method.toUpperCase() || 'POST';
    var data = opt.data || null;
    var dataType = opt.dataType || 'json';
    var async = opt.async || 'true';
    var url = opt.url || '';

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //得到postData
    if (opt.postData) {
        var postData = opt.postData;
    } else if (opt.data) {
        var params = [];
        for (var k in opt.data) {
            params.push(k + '=' + opt.data[k])
        }
        var postData = params.join('&');
    }

    if (method == 'GET') {
        if (opt.fullUrl) {
            xhr.open('GET', opt.fullUrl + '&_t=' + new Date().getTime(), async);
        } else {
            xhr.open('GET', url + '?' + postData + '&_t=' + new Date().getTime(), async);
        }
        xhr.send(null);
    } else if (method == 'POST') {
        xhr.open('POST', url, async);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xhr.send(postData);
    }

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                if (typeof opt.success == 'function') {
                    var d = opt.dataType == 'xml' ? xhr.responseXML : xhr.responseText;
                    opt.success(d);
                }
            } else {
                if (typeof opt.error == 'function') {
                    opt.error();
                }
            }
        }
    }
}

