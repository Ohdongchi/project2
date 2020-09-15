function menu_toggleBtn() {
  let bar1 = document.querySelector(".bar1");
  let bar2 = document.querySelector(".bar2");
  let bar3 = document.querySelector(".bar3");

  let left = document.querySelector(".menu");
  let modal = document.querySelector("#modal_background");

  if (parseInt(left.style.left) == 0) {
    bar1.classList.toggle("bar1-move");
    bar2.classList.toggle("bar2-move");
    bar3.classList.toggle("bar3-move");
    left.style.left = "-15em";
    modal.style.display = "none";
  } else {
    bar1.classList.toggle("bar1-move");
    bar2.classList.toggle("bar2-move");
    bar3.classList.toggle("bar3-move");
    left.style.left = "0";
    modal.style.display = "block";
  }

  modal.addEventListener("click", () => {
    bar1.classList.remove("bar1-move");
    bar2.classList.remove("bar2-move");
    bar3.classList.remove("bar3-move");
    left.style.left = "-15em";
    modal.style.display = "none";
  });
}

function register_login_modal_toggle(e) {
  let register_division = document.querySelector("#register");
  let login_division = document.querySelector("#login");
  if (e.getAttribute("name") == "register") {
    register_division.style.display = "block";
  } else {
    login_division.style.display = "block";
  }
}
