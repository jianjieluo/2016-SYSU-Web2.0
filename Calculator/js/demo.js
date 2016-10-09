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

  if (t_value == "0") {
    if (isCalculate) {
      result.value = t_value + document.getElementById(content).innerText;
      isCalculate = false;
    } else {
      return;
    }
  }
  result.value = t_value + document.getElementById(content).innerText;
  // 为了保持运算一次后再按按键isCalculate都必须又变回false值
  isCalculate = false;
}

function pressFucButton(content) {
  // alert('123');
  var result = document.getElementById("result");
  var str = result.value;

  if (content == "clean") result.value = "0";
  if (content == "back") {
    if (str.length > 1) {
      result.value = str.substring(0, str.length - 1);
    } else if (str.length == 1) {
      result.value = 0;
    }
  }

  try {
    if (content == "=") {
      result.value = eval(str);
      isCalculate = true;
    }
  } catch (err) {
    alert("Invalid formula input!");
    result.value = 0;
  }

}
