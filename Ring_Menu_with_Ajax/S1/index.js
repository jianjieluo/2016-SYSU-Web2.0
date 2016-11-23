var clickedButtons = [];

$(function() {
    $('.button').click(function() {
        listenButtonClick(this);
    })
    $('#info-bar').click(function() {
        listenInfoClick(this);
    })
})

function listenButtonClick(that) {
    var id = $(that).attr('id')
    console.log("hello " + id);
    if (isRequested(id)) {
        return;
    } else {
        clickedButtons.push(id);
        sendAjaxRequestNum(that);
    }
}

function isRequested(id) {
    return (clickedButtons.indexOf(id) != -1);
}

function sendAjaxRequestNum(that) {
    var jq = $(that).find("span");
    jq.load("/", function(responseTxt, statusTxt, xhr) {
        console.log("responseTxt")
        jq.find(".requested").text(responseTxt);
    });
    jq.attr("class", "requested");
    jq.text("...");
}

function listenInfoClick(that) {
    if (isAllRequested()) {
        calculateResult(that);
    } else {
        return;
    }
}

function isAllRequested() {
    if (clickedButtons.length != 5) {
        return false;
    } else {
        $(".button").each(function() {
            var jq = $(this).find("span");
            if (jq.html() == '') {
                return false;
            }
        });
    }
    return true;
}

function calculateResult(that) {
    var sum = 0;
    $(".requested").each(function() {
        sum += parseInt($(this).html());
    })
    $("#result").html(sum);
}
