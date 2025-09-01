export function show(elementID) {
    document.getElementById(elementID).classList.remove("u-hidden");
}

export function hide(elementID) {
    document.getElementById(elementID).classList.add("u-hidden");
}

export function setText(elementID, text) {
    document.getElementById(elementID).innerText = text;
}

export function setColor(element, color, backgroundColor, borderColor) {
    element.style.color = color;
    element.style.backgroundColor = backgroundColor;
    element.style.borderColor = borderColor;
}