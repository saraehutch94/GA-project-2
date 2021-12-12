const heart = document.getElementById("heart");

heart.addEventListener("click", changeHeart);

function changeHeart() {
    alert("hi")
    if(heart.style.filter === "brightness(0) invert(1)") {
        heart.style.filter = "none";
    } else {
        heart.style.filter = "brightness(0) invert(1)";
    }
}