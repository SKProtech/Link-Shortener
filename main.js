function $(el) {
  return document.querySelector(el);
}
let link = $("#link"),
  btn = $("#btn"),
  loading = $(".loading"),
  result = $(".col-result"),
  copybtn = $("#copy"),
  toastBg = $(".toast-bg"),
  toastmsg = $("#toast-msg"),
  shorted = $("#shorted");

btn.onclick = (function() {

  if (link.value == "") {

    toastShow("please enter url", "rgba(250,0,0,0.9)");


  } else {

    shortURL(link.value);

    loading.style.display = "block";

    result.style.display = "none";

  }

})


function shortURL(url) {
  fetch("https://api.shrtco.de/v2/shorten?url=" + url, {
    method: "POST"
  }).then((response) => {
    return response.json();

  }).then((data) => {

    result.style.display = "flex";

    shorted.innerText = data.result.full_short_link2;

    loading.style.display = "none";

    link.value = "";

  }).catch((error) => {

    loading.style.display = "none";
    link.value = "";
    console.log(error);

  })

}

function copy(text) {
  var input = document.createElement('textarea');
  input.innerHTML = text;
  document.body.appendChild(input);
  input.select();
  var resultCopy = document.execCommand("copy");
  document.body.removeChild(input);
  return resultCopy;
}

function toastShow(msg, color) {
  var num = 0;
  var time = setInterval(() => {

    if (num == 3) {

      clearInterval(time);
      toastBg.style.display = "none";

    } else {
      toastBg.style.background = color;
      toastBg.style.display = "flex";
      toastmsg.innerText = msg;
      num++;

    }
  }, 1000);
}

copybtn.onclick = () => {

  copy(shorted.innerText);
  toastShow("Link Copied", "rgba(0,150,0,0.5)");

}