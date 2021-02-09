const petsModule = (function(){
    const _data = [
        {
            image: "https://pet-uploads.adoptapet.com/1/6/b/406528149.jpg",
            name: "Sam",
            type: "Golden Retriever/St. Bernard Mix",
            sound: "bark",
            soundText: "Bark - type b"
        },
        {
            image: "https://pet-uploads.adoptapet.com/0/f/3/462356648.jpg",
            name: "Mellie",
            type: "Domestic Shorthair",
            sound: "meow",
            soundText: "Meow - type m"
        }
    ];
    const $tbodyEl = document.querySelector("tbody");
    const $buttons= document.querySelectorAll("button");

    const getButtons = function(){
        return document.querySelectorAll("button");
    }

    const getRows = function(){
        return document.querySelectorAll("tr");
    }

    const createPetElement = function(pet){
        return "<tr><td><img class='pet-image' src='"+pet.image+"' /></td><td>"+pet.name+"</td><td>"+pet.type+"</td><td><button data-sound='"+pet.sound+"'>"+pet.soundText+"</button></td></tr>"
    };

    const addToTable = function(content){
        $tbodyEl.innerHTML += content;
    }

    const putPetsInHtml = function(){
        for(let i=0; i< _data.length; i++){
            addToTable(createPetElement(_data[i]));
        }
    }

    const changeRowStyle = function(selectedRow){
        const $rows = getRows();
        for(let i =0; i<$rows.length; i++){
            $rows[i].classList.remove("clicked-row");
        }
        selectedRow.classList.add("clicked-row");
    }

    const clickToSound = function(){
        const buttons = getButtons();
        for(let i= 0; i< buttons.length; i++){
            buttons[i].addEventListener("click", function(event){
                event.stopPropagation();
                const soundId = this.dataset.sound;
                const soundElement = document.getElementById(soundId);
                if(soundElement){
                    soundElement.play();
                }
            });
        }
    }

    const keyPressToSound = function(){
        window.addEventListener("keypress", function(event){
            if(event.key === "b"){
                document.getElementById("bark").play();
            }
            if(event.key === "m"){
                document.getElementById("meow").play();
            }
        })
    }

    const clickToChangeRow = function(){
        const $rows = getRows();
        for(let i = 0; i < $rows.length; i++){
            $rows[i].addEventListener("click", function(event){
                const $trEl = event.target.parentElement;
                document.querySelector(".main-image").src = $trEl.children[0].children[0].src;
                changeRowStyle($trEl);
            })
        }
    }

    const init = function(){
        putPetsInHtml();
        clickToSound();
        keyPressToSound();
        clickToChangeRow();
    }

    return {
        init: init
    }
})();