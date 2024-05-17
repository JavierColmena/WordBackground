const lista = document.getElementById('lista');
const addItem = document.getElementById('addItem')
const inputWord = document.getElementById('inputWord')


let words = localStorage.getItem('randomParticles') ? localStorage.getItem('randomParticles').split(',') : [];

function delWord(word) {
    localStorage.setItem('randomParticles', words.filter(wordFil => {
        return wordFil != word
    }));

    words = words.filter(w => w !== word);
    renderWordList();
}

addItem.onclick = () => {
    let word = inputWord.value
    // words.push(word)
    localStorage.setItem('randomParticles', [...words, word]);
    renderWordList();

}

function renderWordList() {
    lista.innerHTML = '';

    words.forEach(word => {
        const li = document.createElement('li');
        li.classList.add('flex', 'gap-3', 'items-center', 'justify-between');

        const h1 = document.createElement('h1');
        h1.textContent = word;

        const button = document.createElement('button');
        button.classList.add('bg-red-500', 'max-w-6', 'p-1', 'rounded-md');
        button.innerHTML = '<img src="trash.png" class="invert" alt="trash">';
        button.onclick = () => delWord(word);

        li.appendChild(h1);
        li.appendChild(button);
        lista.appendChild(li);
    });
}

renderWordList();
