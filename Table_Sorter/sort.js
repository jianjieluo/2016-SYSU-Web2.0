var jquery = document.createElement("script");
jquery.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";
document.getElementsByTagName("head")[0].appendChild(jquery);
var mysort = function() {
        var a = $(this);
        changeState(a);
        var d = a.parent().parent().parent().find("tbody"),
            b = d.find("tr"),
            e = b.index();
        b.sort(function(b, c) {
            var d = b.children,
                f = c.children;
            if ("up" == a.attr("class")) return $(d[e]).text() > $(f[e]).text();
            if ("down" == a.attr("class")) return $(d[e]).text() < $(f[e]).text()
        });
        d.empty();
        for (var c = 0; c < b.length; ++c) b[c].className = c % 2 ? "alternate" : "", d.append(b[c])
    },
    changeState = function(a) {
        "unclicked" == a.attr("class") || "down" == a.attr("class") ? ($(".down").attr("class", "unclicked"),
            $(".up").attr("class", "unclicked"), a.attr("class", "up")) : ($(".down").attr("class", "unclicked"), $(".up").attr("class", "unclicked"), a.attr("class", "down"))
    };
$("th").addClass("unclicked");
$("table th").click(mysort);
