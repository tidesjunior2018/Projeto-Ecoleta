/* querySelector() => procura o elemento 
    addEventListener() => ouve o evento

() => {} outro jeito de criar uma função

innerHTML => obtém a sintaxe do html*/



function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( (res) => {
            return res.json()
        })
        .then( states => {
            // outra maneira de escrever o for
            for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event){
    const citySelect= document.querySelector("select[name=city]")
    const stateInput= document.querySelector("input[name=state]")

    const indexofSelectedState=event.target.selectedIndex
    stateInput.value=event.target.options[indexofSelectedState].text
    
    // event.target => uma referência ao objeto que enviou o evento
    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML="<option value >Selecione a cidade</option>"
    citySelect.disabled=true
    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for(city of cities){
            citySelect.innerHTML+=`<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled =false
    })
}

document
        .querySelector("select[name=uf]")
        .addEventListener("change", getCities)


// Itens de coleta
// pegar todos os li's
const itemsToCollect= document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener( "click", handleSelectedItem)
}


// declarar variavel com campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

// let => é usado para quando tem um array e dá para sobrescrever
// const => é usado a maioria das vezes e não da para sobrescrever

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    
    // adicionar ou retirar uma classe com javascript
    // event.target.classList.add(nomeDaClasse) => adicionar uma classe
    // event.target.classList.remove(nomeDaClasse) => remove uma classe
    // event.target.classList.toggle(nomeDaClasse) => adicionar ou remove uma classe

    // .filter() => Será um novo array onde os elementos passaram na validação realizada
    // .push() => Adiciona um elemento no array
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // console.log('Item ID: ',itemId)

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound = item
        
        if(item == itemId){ //isso será true ou false
            return itemFound
        }
    })

    // se já estiver selecionado 

    if(alreadySelected >= 0){
        // tirar da seleção
        const filteredItems = selectedItems.filter(function(item){
            const itemIsDifferent = item

            if(item != itemId){ // retorna falso
                return itemIsDifferent
            }
        })

        selectedItems = filteredItems
    }else{
        // se não estiver selecionado adicionar a seleção
        selectedItems.push(itemId)
    }
    
    // console.log('Selected Items: ',selectedItems)
    
    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}