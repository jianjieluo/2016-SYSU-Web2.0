var clickedButtons = [];
var islock = false;
var index = 0;
var order = [];
var isApbClicked = false;

$(function() {
    $("#button").hover(initMenu, clearMenu);
})

function initMenu() {
    // reset the button statement from the previous calculate;
    randomClickOrder();
    activeButtons($(".button"));
    // add listener
    $('.button').click(function() {
        listenButtonClick(this);
    });
    $('#info-bar').click(function() {
        listenInfoClick(this);
    });
    $(".apb").click(function() {
        listenApbClick();
    });
}

function randomClickOrder() {
    order = ["#A", "#B", "#C", "#D", "#E"];
    order = _.shuffle(order);
    order.push("#info-bar");
    console.log("the click order is " + order);
}

function listenApbClick() {
    isApbClicked = true;
    $(order[index]).trigger("click");
}

function clearMenu() {
    resetButtons();
    resetInfoBar();
}

function resetButtons() {
    $(".button").find("span").removeClass("requested");
    $(".button").find("span").text("");
    $(".button").off("click");
    $("#info-bar").off("click");
    clickedButtons = [];
    islock = false;
    index = 0;
    isApbClicked = false;
}

function resetInfoBar() {
    $("#info-bar").css("background-color", "#7E7E7E")
    $("#result").text('');
}

function listenButtonClick(that) {
    var id = $(that).attr('id')
    console.log("hello " + id);
    if (isApbClicked) {
        if (islock) {
            return;
        } else {
            if (!isAllRequested()) {
                if (isRequested(id)) {
                    return;
                } else {
                    clickedButtons.push(id);
                    unactiveOtherButtons(id);
                    sendAjaxRequestNum(that);
                }
            }
        }
    } else {
        alert("Please click the apb first!")
    }
}

function isRequested(id) {
    return (clickedButtons.indexOf(id) != -1);
}

function sendAjaxRequestNum(that) {
    var id = that.id;
    var jq = $(that).find("span");
    jq.load("/", function(responseTxt, statusTxt, xhr) {
        if (!(clickedButtons.length == 0)) {
            jq.text(responseTxt);
            activeOtherButtons(id);
            unactiveButtons(jq.parent());

            // judge if need to active the info bar
            if (isAllRequested()) {
                activeButtons($("#info-bar"));
            }
            if (index < 6) {
                $(order[++index]).trigger("click");
            }
        } else {
            console.log("clear the dispate num")
            jq.text('');
        }
    });
    jq.attr("class", "requested");
    jq.text("...");
}

function unactiveOtherButtons(id) {
    islock = true;
    $(".button").each(function() {
        if (this.id != id) {
            unactiveButtons($(this));
        }
    });
}

function activeOtherButtons(id) {
    islock = false;
    // changeOtherButtonState(id, "rgba(48, 63, 159, 1)", "#56B99D");
    $(".button").each(function() {
        if (!isRequested(this.id)) {
            activeButtons($(this));
        }
    })
}

function activeButtons(jq) {
    jq.css("background-color", "rgba(48, 63, 159, 1)");
    jq.css("color", "#56B99D");
}

function unactiveButtons(jq) {
    jq.css("background-color", "#676767");
    jq.css("color", "white");
}

function listenInfoClick(that) {
    if (isAllRequested()) {
        calculateResult(that);
        $("#info-bar").css("background-color", "#7E7E7E");
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
