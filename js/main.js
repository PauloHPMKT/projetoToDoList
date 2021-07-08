// main.js - arquivo que gerencia um projeto
// const Main = {objeto principal que controla toda a aplicação} - para variáveis imutáveis
// para aplicações com muitos componentes utiliza-se mais variáveis de controle

/*const Main = {
    prop: 'valor' == function (){}
}
console.log(Main.prop) // return o valor 
*/

/*
    1 - fazer cache dos seletores - usando this
    this == informa que a propriedade está dentro do obj Main
    function cacheSelectors está dentro do Main (pai)
    this.cacheSelectors return Main.init()

    Obs: this traz contextos diferentes em JS

    2 - this.checkButton cria uma variavel de acesso no Main para todas as function
    declarar let, const a tornaria disponível apenas no cacheSelectors

    3 - forEach - varrer array utilizado para muitas classes 

    4 - utiliza-se console.log(this) - para descobrir quem é o this e diagnosticar seu comportamento
*/

const Main = { // const = {objeto} codigo escalável
    init: function() { //init: iniciar eventos
        this.cacheSelectors()
        this.bindEvents()
    },

    cacheSelectors: function() { //Selecionar elementos HTML e armazenas em variaveis
        // toda variavel que for armazenar algum elemento HTML terá um sifrão na frente ($) - boa pratica
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
    },

    bindEvents: function() { //bindEvents: adicionar eventos = conectar eventos ('click', 'press'...)
        const self = this // armazena this em uma const para acessar Events.checkB...
        this.$checkButtons.forEach(function(button) {
            button.onclick = self.Events.checkButton_click
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)
        this.$removeButtons.forEach(function(button){
            button.onclick = self.Events.removeButtons_click
        })
    },

    
    Events: { // receberá cada funcao de evento a ser executada
        //usa-se "_" para chamar a function a ser usada
        checkButton_click: function(e) { //(e) inserir evento descobrindo parametros
            const li = e.target.parentElement // target da li
            const isDone = li.classList.contains('done')

            if(!isDone) {  // verificar primeiro a negaçao da variavel
                return li.classList.add('done')
                // retorna ja a adição da classe Done
                // nao deixando a execução passar para baixo
            } 
                li.classList.remove('done')
        },

        inputTask_keypress: function (e) {
            const key = e.key
            const value = e.target.value
            

            if(key === 'Enter') {
                this.$list.innerHTML += `
                <li>
                    <div class="check"></div>
                    <label class="task">
                        ${value}
                    </label>
                    <button class="remove"></button>			
                </li>
                `
                e.target.value = '' // para limpar o input

                //sempre que modificar a arvore DOM é necessário chamar 
                // novamente a function para que os parametros carreguem
                this.cacheSelectors()
                this.bindEvents()
            }
        },

        removeButtons_click: function (e) { // e dar acesso ao elemento
            let li = e.target.parentElement

            li.classList.add('removed')
            setTimeout(function (){
                li.classList.add('hidden')
            }, 300)
        }

    }
    
}

Main.init()