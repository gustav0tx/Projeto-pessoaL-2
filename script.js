alert('Bem-Vindo ao BANCO CODE')
let users = []
function randomNum (n) {
    let numReal = n + 1
    return Math.floor(Math.random() * numReal)
}
function createUser (name,email,password,age) {
    let id = String(users.length)
    let id2 = String(randomNum(10000))
    let user = {}
    user.name = name
    user.email = email
    user.password = password
    user.age = age
    user.id = id + id2
    user.money = 100
    users.push(user)
}
function loginUser (email,password) {
    for(let i = 0; i <= users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            return [true,users[i].id]
        }
    }
}
function checkpassword (pass1,pass2) {
    while (pass1 != pass2) {
        pass1 = parseInt(prompt('Digite a senha do usuário'))
        pass2 = parseInt(prompt('Digite a senha do usuário novamente'))
    }
    return pass1
}
function catchUser (id) {
    let onlyId = ''
    if (users.length < 10) {
        onlyId = id.charAt(0)
        return parseInt(onlyId)
    } else if (users.length > 10) {
        onlyId = id.charAt(0) + id.charAt(1)
        return parseInt(onlyId)
    }
}
function moneyTransfer (ownId) {
    let names = [] 
    for (let i = 0; i <= users.length - 1; i++) {
        let name = (i)+ 'º' + ' ' + users[i].name + '\n'
        names.push(name)
    }
    let target = prompt(`Digite o id do usuário que receberá a transferência\n${names}`)
    let muchMoney = parseInt(prompt('Quanto você deseja transferir'))
    users[ownId].money -= muchMoney
    users[target].money += muchMoney
    return alert('Transferencia realizada com sucesso!!!')
}
function betNum (idParam) {
    let i = 0
    if (i == 0) {
        alert('Bem-vindo às apostas com números')
        alert('Funciona da seguinte forma, você poderá escolher um número de 0 á 4\nE a quantidade de vezes que seu número tem que aparecer para ganhar\nEX:\n2\b\b2\b\b2\nse você que o numero 2 iria aparecer 3 vezes ganhou!!!')
        alert('Lembrando que quanto mais números mais seu dinheiro sera multiplicado\nOBS: cada número aumenta sua aposta em 1x')
    }
    let nums = []
    let num = parseInt(prompt('Escolha um número de 0 à 4'))
    let manyNum = parseInt(prompt('Quantas vezes seu número ira aparecer'))
    let result = ''
    let moneyPay = ''
    let bet = parseInt(prompt('Quanto você quer apostar?'))
    for(let i = 1; i <= manyNum; i++) {
        let aleatoryNum = randomNum(4)
        if (i == 0 && i != manyNum) {
            nums.push('\n' + aleatoryNum + '\b\b')
        } else if (i != manyNum) {
            nums.push(aleatoryNum + '\b\b')
        } else if (i == manyNum) {
            nums.push(aleatoryNum + '\n')
        }
    }
    for (let i = 0; i <= nums.length; i++) {
        if (num == nums[i]) {
            result = true
        }
    }
    if (result) {
        moneyPay = bet * manyNum
        users[idParam].money += moneyPay
        alert(`Números Sorteados:${nums}Este foi seu número ${num}, parábens você ganhou ${moneyPay} reais`)
    } else {
        alert(`Números Sorteados:${nums}Este foi seu número ${num}, infelizmente você perdeu`)
        users[idParam].money -= bet
    }
    i++                     
}
function betGame (idParam) {
    let hubBet = ''
    do {
        hubBet = prompt('OPÇÕES:\n1-Apostar nos números\n2-Sair')
        switch(hubBet) {
            case '1':
                betNum(idParam)
                break
            case '2':
                alert('Saindo do menu de aposta...')    
        }
    } while (hubBet != '2')
}
function hubBank (idParam,name) {
    let id = parseInt(idParam)
    let hubBank = ''
    alert(`O usuário ${name} foi logado!!!`)
    do {
        hubBank = prompt(`SALDO:${users[id].money}\nOPÇÕES:\n1-Fazer transferência\n2-Jogo de aposta\n3-Sair da conta`)
        switch(hubBank) {
            case '1':
                moneyTransfer(id)
                break
            case '2':
                betGame(id)
                break
            case '3':
                alert('Saindo da conta...')    
        }
    } while (hubBank != '3')
}
let hubUsers = ''
do {
    if (users.length == 0) {
        alert('Nem um usuário foi detectado, iniciando processo de criação')
        let name = prompt('Digite o nome do usuário')
        let age = parseInt(prompt('Digite a idade do usuário'))
        let email = prompt('Digite o email do usuário')
        let pass1 = parseInt(prompt('Digite a senha do usuário'))
        let pass2 = parseInt(prompt('Digite a senha do usuário novamente'))
        let pass = checkpassword(pass1,pass2)
        createUser(name,email,pass,age)
    } else if (users.length > 0) {
        hubUsers = ''
        do {
            hubUsers = prompt('Usuário detectado , o que deseja fazer?\nOPÇÕES:\n1-Logar em usuário\n2-Criar novo usuário\n3-Sair do APP')
            switch(hubUsers) {
                case '1':
                    let email = prompt('Digite o email do usuário')
                    let pass1 = parseInt(prompt('Digite a senha do usuário'))
                    let confLogin = loginUser(email,pass1)
                    if (confLogin[0]) {
                        let id = catchUser(confLogin[1])
                        hubBank(id,users[id].name)
                    }
                    break
                case '2':
                    let name = prompt('Digite o nome do usuário')
                    let age = parseInt(prompt('Digite a idade do usuário'))
                    let email2 = prompt('Digite o email do usuário')
                    let pass2 = parseInt(prompt('Digite a senha do usuário'))
                    let pass3 = parseInt(prompt('Digite a senha do usuário novamente'))
                    let pass = checkpassword(pass2,pass3)
                    createUser(name,email2,pass,age)
                    break
                case '3':
                    alert('saindo...')
                    break    
            }
        } while (hubUsers != '3')
    }
} while (hubUsers != '3')