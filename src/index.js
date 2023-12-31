const axios = require('axios');
const { markdownParser } = require('./markdownParser');
function posts(parentSelector) { 

    class Post {
        constructor(date, status, title, text, parentSelector) {
            this.date = date.split('-').reverse().join('.');
            this.status = status;
            this.title = title;
            [this.text, this.cutText] = markdownParser(text).split('#cut'); 
            this.parent = document.querySelector(parentSelector);

            if (this.date === (new Intl.DateTimeFormat("uk-UA").format(new Date()))) {
                this.date = "Today";
            }
        }

        render() {
            const element = document.createElement('section');
            element.innerHTML = `
                <div class="border-blue-600 pr-7 sm:pr-5 grid grid-cols-[72px,_minmax(200px,_auto)] 
                    sm:grid-cols-[42px,_minmax(200px,_auto)] grid-rows-[_minmax(24px,_auto)],_minmax(100px,_auto)])">
                    <div class="flex flex-row h-8 sm:h-6">
                        ${(this.status === 'successful') ? `
                        <img src="./img/successful.svg" alt="Successful" class="mx-auto w-8 h-8 sm:h-6 sm:w-6" />
                        ` : ''}
                        ${(this.status === 'problem') ? `  
                        <img src="./img/problem.svg" alt="Problem" class="mx-auto w-8 h-8 sm:h-6 sm:w-6" />
                        ` : ''}
                        ${(this.status === 'fail') ? `
                        <img src="./img/fail.svg" alt="Fail" class="mx-auto w-8 h-8 sm:h-6 sm:w-6" />
                        ` : ''}  
                    </div>
                    <div class="h-8 sm:h-6 flex lex-col">
                        <span class="self-center max-w-fit px-2 rounded-md bg-[#007bff] text-white text-xs font-bold">
                            ${this.date}
                        </span>
                    </div>
                    <div class="flex-grow flex flex-row }">
                        <div class="time-line  w-px border-gray-300 border-r mx-auto"></div>
                    </div>
                    <div class="pb-4 pt-1 ">
                        <div class="p-3 sm:p-1 mx-auto rounded-md shadow-2 hover:shadow-3">
                            <div class="px-1.5 text-lg font-bold">${this.title}</div>
                            <div class="p-1.5 ">
                                ${this.text}
                            </div>
                            <button class="p-1.5 text-[#007bff]" title="Click to show/hide content" 
                                type="button" ${(this.cutText === undefined || this.cutText === '') ? `style="display:none"` : ''} 
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
                            <div class="p-1.5" id="${this.date}" style="display:none" >
                                ${this.cutText}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    axios.get('./db.json')
        .then(data => {
            
            data.data.posts.reverse().forEach(({
                date,
                status,
                title,
                text
            }) => {

                new Post(date, status, title, text, parentSelector).render();
            });
        }).catch(e => {
            console.log(e);            
        });
}

window.addEventListener('DOMContentLoaded', () => {
    //to append new posts
    posts(".main-content");
});

