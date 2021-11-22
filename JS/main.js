"use strict";

window.addEventListener("load", () => {
    loader.classList.add("loader_active");
    loaderItem.classList.add("anim_disable");
});

const loader = document.querySelector(".loader");
const loaderItem = document.querySelector(".loader-item");
const colorItem = document.querySelector(".color-item");
colorItem.remove();
const defaultText = document.querySelector(".default-text");
const colorsWrapper = document.querySelector(".colors-wrapper");
const message = document.querySelector(".message");
const randomColorBtn = document.querySelector(".random-color-btn");

let symbolHEX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
let HEXCode = [];
let allHEXCodes = [];

function randomizeColor() {

    let elems = document.querySelectorAll(".color-item")

    for (let elem of elems) {
        elem.remove();
    }

    HEXCode = [];
    allHEXCodes = [];

    for (let i = 0; i < 20; i++) {

        iter();

        let code = "#" + HEXCode.join("");

        if (allHEXCodes.includes(code)) {
            HEXCode = [];
            code = null;
            iter();
            let code = "#" + HEXCode.join("");
        }

        allHEXCodes.push(code);
        HEXCode = [];
        code = "";

    }

}

function iter() {

    for (let i = 0; i < 6; i++) {
        let symbol = symbolHEX[Math.floor(Math.random() * symbolHEX.length)];
        HEXCode.push(symbol);
    }

}

randomColorBtn.addEventListener("click", randomColor);

function generateElems() {

    for (let i = 0; i < allHEXCodes.length; i++) {
        let item = colorItem.cloneNode(true);
        let color = item.querySelector(".color-item-show");
        let title = item.querySelector(".index-color");
        color.style.backgroundColor = allHEXCodes[i];
        title.textContent = allHEXCodes[i];
        colorsWrapper.append(item);
    }

}

function randomColor() {
    defaultText.remove();
    colorsWrapper.classList.remove("color-wrapper_default");
    randomizeColor();
    generateElems();
}

colorsWrapper.addEventListener("click", changeColor);

let show = false;

function changeColor(event) {
    let target = event.target;

    if (target.matches(".color-item-show")) {
        let index = target.nextElementSibling;

        navigator.clipboard.writeText(index.textContent);

        if (!show) {

            message.classList.add("message_active");
            show = true;

            setTimeout(() => {
                message.classList.remove("message_active");
                show = false;
            }, 2000);

        }

    }

}



















