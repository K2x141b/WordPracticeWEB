document.getElementById('prac-panel__btn-le').addEventListener('click', () => leLaButton('le'));

document.getElementById('prac-panel__btn-la').addEventListener('click', () => leLaButton('la'));

export function leLaButton(buttonType) {
    let button;
    let otherButton;

    // check witch button was pressed
    if (buttonType == "le") {
        button = "prac-panel__btn-le";
        otherButton = "prac-panel__btn-la";
    } else if (buttonType == "la") {
        button = "prac-panel__btn-la";
        otherButton = "prac-panel__btn-le";
    }

    // set the colors of the two buttons
    document.getElementById(button).classList.add("prac-panel__btn-input--sel-btn");
    document.getElementById(otherButton).classList.remove("prac-panel__btn-input--sel-btn");
}   

export function leLaParsing(words) {
    const articles = [];
    const nouns = [];
    
    for (const word of words) {
        //console.log(word.match(/(?<=[\s])(?:le|la|les|un|une)(?=[\s])|\bl'\b/g))
        // See if there is an article in it
        if (word.match(/(?<!\S)(?:le|la|les|un|une)(?!\S)|\bl'/g) !== null) {
            let article;
            // Checks for the articles le,un,(m),(mpl) and la,une,(f),(fpl)
            if (word.match(/\ble\b|\bun\b|\(m\)|\(mpl\)/g)) {
                article = "le";
            } else if (word.match(/\bla\b|\bune\b|\(f\)|\(fpl\)/g) ) {
                article = "la";
            } else {
                continue;
            }
            

            // Prepare the outputs: the articels (le or la), the nouns (chat, maison)
            articles.push(article);
            nouns.push(word.match(/(?<=l\')[\wäöüœéàè]+|(?<=\b(?:le|la|les|un|une)\s)[\wœéàè]+/g)[0]);
        }
    }
    
    return { articles, nouns };
}