var index = 0;
var order = ["#A", "#B", "#C", "#D", "#E", "#info-bar"];
$(function() {
    $("#button").hover(listenCenterClick, resetTheStatement);
})

function resetTheStatement() {
    index = 0;
}

function listenCenterClick() {
    $(".apb").click(autoClickInOrder);
}


function autoClickInOrder() {
    console.log("enter the robot programes")

    $(order[index]).trigger("click");

}
