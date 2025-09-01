document.getElementById('menu__theme-btn').addEventListener('click', () => changeTheme());

function changeTheme() {
    if (document.body.classList.contains('u-dark-theme')) {
        document.body.classList.remove('u-dark-theme');
        document.body.classList.add('u-light-theme');
        document.getElementById("menu__theme-btn").innerHTML = "hell";
    } else {
        document.body.classList.remove('u-light-theme');
        document.body.classList.add('u-dark-theme')
        document.getElementById("menu__theme-btn").innerHTML = "dunkel";
    }
}