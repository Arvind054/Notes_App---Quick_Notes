const checkboxes = document.querySelectorAll(".formCheckbox");
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        const form = checkbox.closest(".myForm");
        form.submit();
    })
})

document.addEventListener("DOMContentLoaded", function () {
    const logoName = document.querySelector(".logo_name");
   
    function logoVisibility() {
        if (window.innerWidth < 415) {
            logoName.style.display = "none";
        }
        else {
            logoName.style.display = "inline";
        }
    }
    window.addEventListener("resize", logoVisibility)
    if (window.innerWidth<415){
        logoVisibility();
    }
});

