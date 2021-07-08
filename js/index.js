const Main = {
    init: function() {
        this.cachaSelectors()
        this.bindEvents()
    },

    cachaSelectors: function() {
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
        this.$toaster = document.querySelector('.toast')
    },

    bindEvents: function() {
        const self = this

        this.$checkButtons.forEach(function(button) {
            button.onclick = self.Events.checkButton_click
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

        this.$removeButtons.forEach(function(button) {
            button.onclick = self.Events.removeButton_click
        })
    },

    Events: {
        checkButton_click: function(e) {
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')

            if (!isDone) {
                return li.classList.add('done')
            }
            li.classList.remove('done')
        },

        inputTask_keypress: function(e) {
            const key = e.key
            const value = e.target.value
            if (key === 'Enter') {
                if (e.target.value === '') {
                    this.$toaster.classList.add('visible')
                    this.$toaster.innerHTML = `<div>CADASTRE UMA TAREFA!</div>`

                    setTimeout(() => {
                        this.$toaster.classList.remove('visible')
                    }, 4000)
                } else {
                    this.$list.innerHTML += `
                        <li>
                            <div class="check"></div>
                            <label class="task">
                                ${value}
                            </label>
                            <button class="remove"></button>			
                        </li>
                    `

                    e.target.value = ''

                    this.cachaSelectors()
                    this.bindEvents()
                }




            }
            /*if (key === 'Enter') {
                this.$list.innerHTML += `
                <li>
                    <div class="check"></div>
                    <label class="task">
                        ${value}
                    </label>
                    <button class="remove"></button>			
                </li>
                `

                if (e.target.value === '') {
                    this.$toaster.classList.add('visible')
                    this.$toaster.innerHTML = `<div>CADASTRE UMA TAREFA!</div>`
                    this.$list.innerHTML = ''
                }

                setTimeout(() => {
                    this.$toaster.classList.remove('visible')
                }, 4000)

                e.target.value = ''

                this.cachaSelectors()
                this.bindEvents()
            }*/
        },

        removeButton_click: function(e) {
            let li = e.target.parentElement
            li.classList.add('removed')

            setTimeout(function() {
                li.classList.add('hidden')
            }, 300)
        }


    }

}

Main.init()