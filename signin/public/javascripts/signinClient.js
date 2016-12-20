$(function() {
    $("form").submit(function() {
        resetJudgers();
        var form = $("form>input").slice(0, 2);
        for (var i = 0; i < form.length; ++i) {
            if (!form[i].value) {
                setState(form[i], 0);
                return false;
            }
        }
        return true;
    });
});

function resetJudgers() {
    var form = $("form>input");
    for (var i = 0; i < 6; ++i) {
        setState(form[i], 1);
    }
}

function setState(input, flag) {
    // flag为0的时候非法
    var jq = $(input);
    if (flag == 0) {
        jq.css("border-bottom-color", "#E62117");
    } else {
        jq.css("border-bottom-color", "#FFFFFF");
    }
};
