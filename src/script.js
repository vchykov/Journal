var md = window.markdownit({
    html: true,
    breaks: true
  }).use(window.markdownitSup).use(window.markdownitSub);

function posts(parentSelector) { 

    class Post {
        constructor(date, type, title, text, textUnderSpoiler, parentSelector, last) {
            this.date = date;
            this.type = type;
            this.title = title;
            this.text = (text) ? md.render(text) : undefined;
            this.textUnderSpoiler = (textUnderSpoiler) ? md.render(textUnderSpoiler) : undefined;
            this.parent = document.querySelector(parentSelector);
            this.last = last;
            if (this.date === (new Intl.DateTimeFormat("uk-UA").format(new Date()))) {
                this.date = "Today";
            }
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
            <div class="pr-7 grid grid-cols-[72px,_minmax(200px,_auto)] grid-rows-[32px,_minmax(100px,_auto)])">
                <div class="px-4 w-16 mx-1 h-8">
                    ${(this.type === 'successful') ? `
                    <svg width="32px" height="32px" viewBox="48 48 418 418" xmlns="http://www.w3.org/2000/svg">
                        <title>ionicons-v5-e</title><path d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" 
                        style="fill:none;stroke:#4caf50;stroke-miterlimit:10;stroke-width:32px"/>
                        <polyline points="352 176 217.6 336 160 272" 
                        style="fill:none;stroke:#4caf50;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                    </svg>
                    ` : ''}
                    ${(this.type === 'problem') ? `
                    <svg width="32px" height="32px" viewBox="48 48 418 418" xmlns="http://www.w3.org/2000/svg">
                        <title>ionicons-v5-a</title>
                        <path d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" 
                        style="fill:none;stroke:#ff9800;stroke-miterlimit:10;stroke-width:32px"/>
                        <path d="M250.26,166.05,256,288l5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,166.05Z" 
                        style="fill:none;stroke:#ff9800;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                        <path d="M256,367.91a20,20,0,1,1,20-20A20,20,0,0,1,256,367.91Z" style="fill:#ff9800"/>
                    </svg>
                    ` : ''}
                    ${(this.type === 'fail') ? `
                    <svg width="32px" height="32px" viewBox="48 48 418 418" 
                        xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-m</title>
                        <path d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" 
                        style="fill:none;stroke:#f44336;stroke-miterlimit:10;stroke-width:32px"/>
                        <line x1="320" y1="320" x2="192" y2="192" 
                        style="fill:none;stroke:#f44336;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                        <line x1="192" y1="320" x2="320" y2="192" 
                        style="fill:none;stroke:#f44336;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                    </svg>
                    ` : ''}  
                </div>
                <div class="h-8 flex lex-col">
                    <span class="self-center max-w-fit px-2 rounded-md bg-[#007bff] text-white text-xs font-bold">
                        ${this.date}
                    </span>
                </div>
                <div class="flex-grow flex flex-row ${(this.last) ? 'invisible' : ''}">
                    <div class="w-px border-gray-300 border-r mx-auto"></div>
                </div>
                <div class="pb-4 pt-1 ">
                    <div class="p-3 mx-auto rounded-md shadow-2 hover:shadow-3">
                        <div class="px-1.5 text-lg font-bold">${this.title}</div>
                        <div class="p-1.5 ">
                            ${this.text}
                        </div>
                        <div class="p-1.5" id="${this.date}" style="display:none" >
                            ${this.textUnderSpoiler}
                        </div>
                        <button class="p-1.5 text-[#007bff]" title="Click to show/hide content" 
                            type="button" ${(this.textUnderSpoiler === undefined || this.textUnderSpoiler === '') ? `style="display:none"` : ''} 
                                onclick="
                                    if(document.getElementById('${this.date}').style.display=='none') {
                                        document.getElementById('${this.date}').style.display='';
                                        document.getElementById('${this.date}').nextElementSibling.innerHTML='Hide';
                                    } else {
                                    document.getElementById('${this.date}').style.display='none';
                                    document.getElementById('${this.date}').nextElementSibling.innerHTML='Show more';
                                }
                            ">Show more
                        </button>
                    </div>
                </div>
            </div>    
        `;
            this.parent.append(element);
        }
    }

    axios.get('https://vchykov.github.io/Journal/db.json')
        .then(data => {
            
            data.data.posts.reverse().forEach(({
                date,
                type,
                title,
                text,
                textUnderSpoiler
            }, index, arr) => {
                let last = false;
                if (index === arr.length - 1) {
                    last = true;
                }
               
                new Post(date, type, title, text, textUnderSpoiler, parentSelector, last).render();
            });
        }).catch(e => {
            console.log(e);
        });
}

window.addEventListener('DOMContentLoaded', () => {
    //to append new posts
    posts(".main-content");
});

