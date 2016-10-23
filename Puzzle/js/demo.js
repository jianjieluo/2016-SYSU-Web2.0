window.onload = function() {
    // create the child images
    var map = document.getElementById('map');
    for (var i = 0; i < 15; ++i) {
        var node = document.createElement("li");
        map.appendChild(node);
    }

    resetMap();

    document.getElementById('replay').addEventListener('click', resetMap);
    document.getElementsByTagName('li').addEventListener('click', move);

}
