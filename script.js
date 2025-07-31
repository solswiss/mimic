let json_data;

fetch('data.json')
    .then(response => response.json()) // parse json
    .then(obj => press(obj)) // work w json data
    .catch(error => console.log(error))


function press(data) {
    json_data = data;
}

document.getElementById('title-color').onchange = function(){
    $('.preface h1').css('color',this.value);
    console.log('you changed the title color to '+this.value);
}

document.addEventListener('DOMContentLoaded', e => {
    $('.items .images div').each(function(){
        let ind = document.createElement('div');
        ind.classList = 'indc';
        this.appendChild(ind);
    });

    $('.vendor button.vendor-rand').bind('click', e => {
        const id = e.target.id;
        const logue = id.substring(0,id.indexOf('-'));
        const item = json_data[logue][Math.floor(Math.random()*json_data[logue].length)];
        const name = item.name;
        const det = item.det;
        const origin = item.origin ? item.origin : 'Origin lost to time.';
        const link = item.link;
        let container = document.createElement('div');
        container.id = logue+"-item";
        let title;
        if (link) {
            title = document.createElement('a');
            title.href = link;
        } else title = document.createElement('span');
        title.classList.add('boldt');
        title.textContent = name + " ";
        let p = document.createElement('p');
        p.textContent = det + " " + origin;
        container.appendChild(title);
        container.appendChild(p);

        const mech = document.getElementById(logue+"-mech");
        const old_item = document.getElementById(logue+"-item");
        if (old_item) old_item.remove();

        mech.appendChild(container);
        mech.open = true;
        
        console.log(`you got the random ${logue} item ${name}`);
    });
})