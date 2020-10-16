const buttonSearch = document.querySelector("#page-home .content main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .content .header a")

buttonSearch.addEventListener("click",function(){
    // vai deixar a mostra o id modal que estava escondido
    modal.classList.remove("hide") 
})

close.addEventListener("click",function(){
    modal.classList.add("hide")
})