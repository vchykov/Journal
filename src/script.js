var md = window.markdownit({
    html: true,
    breaks: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs">' +
                 hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                 '</pre>';
        } catch (__) {}
      }
  
      return '<pre"hljs">' + md.utils.escapeHtml(str) + '</pre>';
    }
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
                <div class="pr-7 sm:pr-5 flex flex-row">
                    <div class="px-4 sm:px-1.5 w-16 sm:w-9 mx-1 sm:mx-0.5 flex-none border-red-600 flex flex-col">
                        <div class="flex-none h-8 sm:h-6 ">
                            <div class="h-8 w-8 sm:h-6 sm:w-6">
                            ${(this.type === 'successful') ? `
                            <img src="./img/successful.svg" alt="Successful" class="mx-auto w-8 h-8 sm:h-6 sm:w-6" />
                            ` : ''}
                            ${(this.type === 'problem') ? `  
                            <img src="./img/problem.svg" alt="Problem" class="mx-auto w-8 h-8 sm:h-6 sm:w-6" />
                            ` : ''}
                            ${(this.type === 'fail') ? `
                            <img src="./img/fail.svg" alt="Fail" class="mx-auto w-8 h-8 sm:h-6 sm:w-6" />
                            ` : ''}  
                            </div>
                        </div>
                        <div class="flex-grow flex flex-row ${(this.last) ? 'invisible' : ''}">
                            <div class="w-px border-gray-300 border-r mx-auto"></div>
                        </div>
                    </div>
                    <div class="flex-grow border-red-600">
                        <div class="h-8 sm:h-6  flex items-center">
                            <span class="max-w-fit px-2 rounded-md bg-tl-blue text-white text-xs font-bold">
                                ${this.date}
                            </span>
                        </div>
                        <div class=" pb-4 pt-1">
                            <div class="p-3 sm:p-1 mx-auto bg-white rounded-md shadow-2 hover:shadow-3">
                                <div class="px-1.5 text-lg font-bold">${this.title}</div>
                                <div class="p-1.5">
                                    ${this.text}
                                </div>
                                <div class="p-1.5" id="${this.date}" style="display:none" >
                                    ${this.textUnderSpoiler}
                                </div>
                                <button class="p-1.5 text-tl-blue" title="Click to show/hide content" 
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
                </div>
            `;
            this.parent.append(element);
        }
    }

    axios.get('./db.json')
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

