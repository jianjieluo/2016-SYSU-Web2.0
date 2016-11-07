window.onload = function() {
    $("th").addClass("unclicked");
    $("#todo th").click(sort);
    $("#staff th").click(sort);
}

var sort = function() {
    var jqhead = $(this);
    changeState(jqhead);
    var table = jqhead.parent().parent().parent();
    var body = table.find("tbody");
    var content = body.find("tr");
    var n = content.index();
    content.sort(function(lhs, rhs) {
        var lhsContent = lhs.children;
        var rhsContent = rhs.children;
        if (jqhead.attr("class") == "up") {
            return $(lhsContent[n]).text() > $(rhsContent[n]).text();
        } else if (jqhead.attr("class") == "down") {
            return $(lhsContent[n]).text() < $(rhsContent[n]).text();
        }
    });
    body.empty();

    for (var i = 0; i < content.length; ++i) {
        if (i % 2) {
            content[i].className = "alternate";
        } else {
            content[i].className = "";
        }
        body.append(content[i]);
    };
}



var changeState = function(th) {
    if (th.attr("class") == "unclicked" || th.attr("class") == "down") {
        $(".down").attr("class", "unclicked");
        $(".up").attr("class", "unclicked");
        th.attr("class", "up");
    } else {
        $(".down").attr("class", "unclicked");
        $(".up").attr("class", "unclicked");
        th.attr("class", "down");
    }
}
