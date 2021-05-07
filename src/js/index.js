console.log('init JS');

const html = document.querySelector('html');
const themeInit = html.attributes.getNamedItem('theme');
const localTheme = window.localStorage.getItem('theme');

html.style.opacity = 0;

if (!localTheme) {
    window.localStorage.setItem('light');
}

if (localTheme) {
    html.setAttribute('theme', localTheme)
}

document.querySelector('body > div > div.main-layout--content > div.main-layout--outer > div').addEventListener('click', (e) => {
    console.log('ht');
    const local = window.localStorage.getItem('theme');
    const toggleTheme = local && local === 'light' ? 'dark' : 'light';

    window.localStorage.setItem('theme', toggleTheme);
    html.setAttribute('theme', toggleTheme);
    // const layout = document.querySelector('div.main-layout--content');

    // if(!local) {
    //     window.localStorage.setItem('theme', 'light');
    // }

    // layout.classList.add(local);
    
});

window.addEventListener('load', () => {
    html.style.opacity = 1;
});