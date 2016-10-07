var isCalculate = false;

function pressBasicButton(content) {
  // alert('123');
  var result = document.getElementById("result");
  if (isCalculate) {
    result.value = 0;
    isCalculate = false;
  }
  var t_value = result.value;

  if (t_value == "0") {
    if (content == ".") {
      t_value += ".";
    } else {
      t_value = document.getElementById(content).innerText;
    }
  } else {
    t_value += document.getElementById(content).innerText;
  }
  result.value = t_value;
}

function pressOperatorButton(content) {
  // alert('123');
  var result = document.getElementById("result");
  var t_value = result.value;

  if (isCalculate) {
    if(t_value == "0") {
      result.value = t_value + document.getElementById(content).innerText;
    }
    isCalculate = false;
  } else {
    if (t_value == "0") return;
    result.value = t_value + document.getElementById(content).innerText;
  }
}

function pressFucButton(content) {
  // alert('123');
  var result = document.getElementById("result");
  var str = result.value;

  if (content == "clean") result.value = "0";
  if (content == "back") result.value = str.Substring(0, str.Length-1);

  try {
    if (content == "=") result.value = eval(str);
    isCalculate = true;
  } catch(err) {
    alert("invalid formula input!")
  }

}
