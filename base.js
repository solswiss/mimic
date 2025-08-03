if (window.location.href.endsWith('/footer.html')) {
    const str = window.location.href;
    const prefix = str.substring(0,str.lastIndexOf('/'));
    window.location.href = prefix + "/index.html";
}

if (localStorage.getItem('newGuest') === null && !window.location.href.endsWith('/butler.html')) {
    sessionStorage.setItem('goTo',window.location.href);
    const str = window.location.href;
    const prefix = str.substring(0,str.lastIndexOf('/'));
    window.location.href = prefix + "/butler.html";
}

document.addEventListener('DOMContentLoaded', e => {
    $('#footer').load('footer.html');
});