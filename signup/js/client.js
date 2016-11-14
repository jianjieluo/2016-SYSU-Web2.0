$(function() {
    $("form").submit(function() {
        var t_data = $(".userInfo > div > input").slice(0, 4)
        $("p").html('');
        if (!userNameJudger(t_data[0])) {
            return false;
        }
        if (!userIdJudger(t_data[1])) {
            return false;
        }
        if (!PhoneNumJudger(t_data[2])) {
            return false;
        }
        if (!emailJudger(t_data[3])) {
            return false;
        }
    })
})

var form = $("form")

function userNameJudger(data) {
    var error = form.find(".userName > p")
    if (data.length < 6 || data.length > 18) {
        // userNameDiv.prepend('<p class=\"invalid\">用户名需要6~18位</p>')
        error.html('用户名需要6~18位')
        return false;
    }
    if (!((data[0] < 'z' && data[0] > 'a') || (data[0] < 'Z' && data[0] > 'A'))) {
        // userNameDiv.prepend('<p class=\"invalid\">用户名开头需要是英文字母</p>')
        error.html('用户名开头需要是英文字母')
        return false;
    }
    return true;
}

function userIdJudger(data) {
    var error = form.find('.userId > p')
    var regex = /[1-9]\d{7}/
    if (!regex.test(data)) {
        error.html("学号8位数字，不能以0开头")
        return false;
    }
    return true;
}

function phoneNumJudger(data) {
    var error = form.find('.phoneNum > p')
    var regex = /[1-9]\d{10}/
    if (!regex.test(data)) {
        error.html("电话11位数字，不能以0开头")
        return false
    }
    return true
}

function emailJudger(data) {
    var error = form.find('.email > p')
    var regex = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/
    if (!regex.test(data)) {
        error.html("邮箱格式不合法")
        return false
    }
    return true
}
