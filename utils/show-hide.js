export function show(elementID) {
    document.getElementById(elementID).classList.remove("u-hidden");
}

export function hide(elementID) {
    document.getElementById(elementID).classList.add("u-hidden");
}

export function setText(elementID, text) {
    const el = document.getElementById(elementID);
    if (el.tagName === "TEXTAREA" || (el.tagName === "INPUT" && el.type === "text")) {
        el.value = text;
    } else {
        el.innerText = text;
    }
}

export function setColor(element, color, backgroundColor, borderColor) {
    element = document.getElementById(element);
    element.style.color = color;
    element.style.backgroundColor = backgroundColor;
    element.style.borderColor = borderColor;
}