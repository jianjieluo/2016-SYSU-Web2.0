$(function() {
    $("form").submit(function() {
        var t_data = $(".userInfo > div > input").slice(0, 4)
        $("p").html('');
        if (!userNameJudger($(t_data[0]).val())) {
            return false;
        }
        if (!userIdJudger($(t_data[1]).val())) {
            return false;
        }
        if (!phoneNumJudger($(t_data[2]).val())) {
            return false;
        }
        if (!emailJudger($(t_data[3]).val())) {
            return false;
        }
        return true
    })
})

function userNameJudger(data) {
    var error = $(".userName").find(".invalid")
    if (data.length < 6 || data.length > 18) {
        error.html('用户名需要6~18位')
        return false;
    }
    var regex = /^[a-z]{1}[0-9_a-z]{2,11}$/
    if (!regex.test(data)) {
        error.html('用户名6~18位英文字母、数字或下划线，必须以英文字母开头')
        return false;
    }
    return true;
}

function userIdJudger(data) {
    var error = $(".userId").find(".invalid")
    var regex = /[1-9]\d{7}/
    if (!regex.test(data)) {
        error.html("学号8位数字，不能以0开头")
        return false;
    }
    return true;
}

function phoneNumJudger(data) {
    var error = $(".phoneNum").find(".invalid")
    var regex = /[1-9]\d{10}/
    if (!regex.test(data)) {
        error.html("电话11位数字，不能以0开头")
        return false
    }
    return true
}

function emailJudger(data) {
    var error = $(".email").find(".invalid")
    var regex = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
    if (!regex.test(data)) {
        error.html("邮箱格式不合法")
        return false
    }
    return true
}
