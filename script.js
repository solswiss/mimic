let json_data;

fetch('data.json')
    .then(response => response.json()) // parse json
    .then(obj => press(obj)) // work w json data
    .catch(error => console.log(error))


function press(data) {
    json_data = data;
}


// vending machine button press
const vpress = new Audio('resources/Universified_notification14.mp3');
let play_audio = JSON.parse(localStorage.getItem('play_audio'));


// make it rain
function mir(logue) {
    // animation: post-rain 640ms ease forwards;
    const vglass = document.getElementById(logue + "-glass");
    vglass.classList.add('foggy');
    const children = vglass.children;
    for (let i = 0; i < children.length; i++) {
        const an = children[i].animate(
            [{
                transform: 'translate(0,-100%)'
            },
            {
                transform: 'translate(0,120%)'
            }],
            {
                duration: 1000,
                iterations: 1,
                easing: 'ease',
                fill: 'forwards',
                delay: i*100,
            }
        )
        if (i == children.length-1) 
            an.onfinish = e => {vglass.classList.remove('foggy')};
    }
}


document.getElementById('title-color').onchange = function(){
    $('.preface h1').css('animation','none');
    $('.preface h1').css('color',this.value);
    console.log('you changed the title color to '+this.value);
}

document.addEventListener('DOMContentLoaded', e => {
    $('.items .images div').each(function(){
        let ind = document.createElement('div');
        ind.classList = 'indc';
        this.appendChild(ind);
    });

    $('.vglass').each(function(){
        const div1 = document.createElement('div');
        div1.classList.add('post-rain');
        const div2 = document.createElement('div');
        div2.classList.add('post-rain');
        const div3 = document.createElement('div');
        div3.classList.add('post-rain');
        const div4 = document.createElement('div');
        div4.classList.add('post-rain');
        const div5 = document.createElement('div');
        div5.classList.add('post-rain');
        this.appendChild(div1);
        this.appendChild(div2);
        this.appendChild(div3);
        this.appendChild(div4);
        this.appendChild(div5);
    })

    $('.vendor button.vendor-rand').bind('click', e => {
        play_audio = JSON.parse(localStorage.getItem('play_audio'));
        if (play_audio) vpress.play();

        const id = e.target.id;
        const logue = id.substring(0,id.indexOf('-'));
        const item = json_data[logue][Math.floor(Math.random()*json_data[logue].length)];
        const name = item.name;
        const det = item.det;
        const origin = item.origin ? item.origin : 'Origin lost to time.';
        const img = item.img;
        const link = item.link;
        const dlink = item.dlink;
        let container = document.createElement('div');
        container.id = logue+"-item";
        let title;
        if (link) {
            title = document.createElement('a');
            title.href = link;
        } else title = document.createElement('span');
        title.classList.add('boldt');
        title.textContent = name;
        let p = document.createElement('p');
        p.innerHTML = " ✦ " + det;
        if (logue == stationery) {
            p.innerHTML += " " + origin;
        } // make an array of sections that use optional attributes & contains to browse
        const vendor = document.getElementById(logue+"-vendor");
        if (img) {
            $(vendor).css('background-image',`url(${img})`);
        } else {
            $(vendor).css('background-image','unset');
        }
        if (dlink) {
            const dlico = document.createElement('a');
            dlico.innerHTML += ('<i class="fa-solid fa-file-arrow-down"></i>');
            dlico.href = dlink;
            dlico.setAttribute('download','');
            container.append(dlico);
        }
        
        container.appendChild(title);
        container.appendChild(p);

        const mech = document.getElementById(logue+"-mech");
        const old_item = document.getElementById(logue+"-item");
        if (old_item) old_item.remove();

        mir(logue);
        setTimeout(e => {
            container.classList.add('vended-item');
            mech.appendChild(container);
            mech.open = true;
        }, 400);

        console.log(`you got the random ${logue} item ${name}`);
    });
})