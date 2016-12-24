$(function() {

    $("form").submit(function() {
        var form = $("form>input");
        var invalid = formJudger(form);
        resetJudgers();
        for (var i = 0; i < invalid.length; ++i) {
            setState(form[invalid[i]], 0);
        }
        return invalid.length > 0 ? false : true;
    });

    $("input[type=\'reset\']").click(function() {
        resetJudgers();
    });

    $("form>input").blur(function() {
        var index = judgerId[this.name];
        if (this.value != "") {
            if (judgers[index](this)) {
                setState(this, 1);
            } else {
                setState(this, 0);
            }
        }
    }).bind(this);

});

function resetJudgers() {
    var form = $("form>input");
    for (var i = 0; i < 6; ++i) {
        setState(form[i], 1);
    }
}


var judgerId = {
    "userName": 0,
    "userId": 1,
    "passwd": 2,
    "repasswd": 3,
    "phoneNum": 4,
    "email": 5
};

var judgers = [
    userNameJudger,
    userIdJudger,
    passwdJudger,
    repasswdJudger,
    phoneNumJudger,
    emailJudger
];

function formJudger(form) {
    var invalid = []
    for (var i = 0; i < 6; ++i) {
        var index = judgerId[form[i].name];
        if (!judgers[index](form[i])) {
            invalid.push(i);
        }
    }
    return invalid;
};

function userNameJudger(input) {
    var data = $(input).val();
    if (data.length < 6 || data.length > 18) {
        return false;
    }
    var regex = /^[a-zA-Z]{1}[0-9_a-zA-Z]{2,11}$/
    if (!regex.test(data)) {
        return false;
    }
    return true;
};

function userIdJudger(input) {
    var data = $(input).val();
    var regex = /[1-9]\d{7}/
    if (!regex.test(data)) {
        return false;
    }
    return true;
};

function passwdJudger(input) {
    var data = $(input).val();
    if (data.length > 12) {
        return false;
    }
    var regex = /[0-9_a-zA-Z\-]{6,}/
    if (!regex.test(data)) {
        return false;
    }
    return true;
};

function repasswdJudger(input) {
    var passwd = $("input[name=\'passwd\']").val();
    var data = $(input).val();
    if (passwd === data) {
        return true;
    } else {
        return false;
    }
};

function phoneNumJudger(input) {
    var data = $(input).val();
    var regex = /[1-9]\d{10}/
    if (!regex.test(data)) {
        return false
    }
    return true
};

function emailJudger(input) {
    var data = $(input).val();
    var regex = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/
    if (!regex.test(data)) {
        return false
    }
    return true
};

function setState(input, flag) {
    // flag为0的时候非法
    var jq = $(input);
    if (flag == 0) {
        jq.css("border-bottom-color", "#E62117");
    } else {
        jq.css("border-bottom-color", "#FFFFFF");
    }
};
