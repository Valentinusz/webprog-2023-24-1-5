// IDE NEM KELL SEMMIT ÍRNI, EZT NEM KELL ELOLVASNI, EZZEL NEM KELL FOGLALKOZNI.
// YOU DON'T HAVE TO WRITE ANYTHING HERE, YOU DON'T HAVE TO READ THIS, YOU DON'T HAVE TO CARE ABOUT THIS.






































function delegate(parent, child, when, what){
    function eventHandlerFunction(event){
        let eventTarget  = event.target
        let eventHandler = this
        let closestChild = eventTarget.closest(child)

        if(eventHandler.contains(closestChild)){
            what(event, closestChild)
        }
    }

    parent.addEventListener(when, eventHandlerFunction)
}

const list = document.querySelector("ul")
const map = document.querySelector("#map")
function selectById(id){
    const lis = list.querySelectorAll("li")
    lis.forEach(li => {
        const circle = map.querySelector(`circle[data-id="${li.dataset.id}"]`)
        const text = map.querySelector(`text[data-id="${li.dataset.id}"]`)
        if(li.dataset.id == id){
            [li, circle, text].forEach(elem => {
                elem.classList.add("selected")
                elem.classList.remove("not-selected")
            })
        }else{
            [li, circle, text].forEach(elem => {
                elem.classList.remove("selected")
                elem.classList.add("not-selected")
            })
        }
    })
}
function deselectAll(){
    const lis = list.querySelectorAll("li")
    lis.forEach(li => {
        const circle = map.querySelector(`circle[data-id="${li.dataset.id}"]`)
        const text = map.querySelector(`text[data-id="${li.dataset.id}"]`); // <-- Kis érdekesség: nem működik, ha kihagyjuk a pontosvesszőt. 
        [li, circle, text].forEach(elem => {
            elem.classList.remove("selected")
            elem.classList.remove("not-selected")
        })
    })
}

function handleClick(event, elem){
    const id = elem.dataset.id
    if(elem.classList.contains("selected")){
        deselectAll()
    }else{
        selectById(id)
    }
}

delegate(list, "li", "click", handleClick)
delegate(map, "circle", "click", handleClick)
delegate(map, "text", "click", handleClick)
