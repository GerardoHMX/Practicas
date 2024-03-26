document.querySelectorAll(".color-option").forEach(function (picker) {
  picker.addEventListener("click", function () {
    var selectedColor = this.getAttribute("data-color");
    document.getElementById("color-indicator").style.backgroundColor =
      selectedColor;
  });
});
