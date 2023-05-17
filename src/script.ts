import { Episode } from "./types";
import { Character } from "./types";
import { Location } from "./types";

// url to API
const urlEpisodes = "https://rickandmortyapi.com/api/episode";
const urlCharacter = "https://rickandmortyapi.com/api/character";
const urlLocation = "https://rickandmortyapi.com/api/location";
let urlRequested: string = "";

// DOM selectors
const listEpisodes = document.querySelector("#list-episodes");
const mainRgt = document.querySelector("#main-rgt");
const mainRgtUp = document.querySelector("#main-rgtup");
const mainRgtDw = document.getElementById("main-rgtdw");
const btnEpisode = document.querySelector("#btn-episodes");

// inital conditions
createListEpisodes(1);

// functions
async function fetchEpisodes (page: number){
    try {
        const requestResponse = await fetch (`https://rickandmortyapi.com/api/episode/?page=${page}`);
        if(requestResponse.status===200){
            const dataResponse = await requestResponse.json();
            const arrayEpisodes: Episode[] = dataResponse.results;
            return arrayEpisodes;
        }else if (requestResponse.status===401){
            console.log ("Error durante la carga");
        }else if (requestResponse.status===404){
            console.log ("Referencia no encontrada");
        }else {
            console.log ("Excepción no controlada");
        }
    }
    catch(error) {
        console.log(error);
    }
}
async function fetchOneEpisode (id: number){
    try {
        const requestResponse = await fetch (`https://rickandmortyapi.com/api/episode/${id}`);
        if(requestResponse.status===200){
            const Episode: Episode = await requestResponse.json();
            return Episode;
        }else if (requestResponse.status===401){
            console.log ("Error durante la carga");
        }else if (requestResponse.status===404){
            console.log ("Referencia no encontrada");
        }else {
            console.log ("Excepción no controlada");
        }
    }
    catch(error) {
        console.log(error);
    }
}
async function fetchCharacter (id: number){
    try {
        const requestResponse = await fetch (`https://rickandmortyapi.com/api/character/${id}`);
        if(requestResponse.status===200){
            const Character: Character = await requestResponse.json();
            return Character;
        }else if (requestResponse.status===401){
            console.log ("Error durante la carga");
        }else if (requestResponse.status===404){
            console.log ("Referencia no encontrada");
        }else {
            console.log ("Excepción no controlada");
        }
    }
    catch(error) {
        console.log(error);
    }
}



async function fetchLocation (locationName: string) {
    try{
        const requestResponse = await fetch (`https://rickandmortyapi.com/api/location/?name=${locationName}`);
        if(requestResponse.status===200){
            const dataResponse = await requestResponse.json();
            const arrayLocation = dataResponse.results;
            const location: Location = arrayLocation[0];
            return location;
        }else if (requestResponse.status===401){
            console.log ("Error durante la carga");
        }else if (requestResponse.status===404){
            console.log ("Referencia no encontrada");
        }else {
            console.log ("Excepción no controlada");
        }
    }
    catch(error) {
        console.log(error);
    }
}
async function createListEpisodes (page: number) {
    const arrayEpisodes = await fetchEpisodes(page);
    arrayEpisodes?.forEach(element => {
        const episode = document.createElement("li");
        episode.textContent = `Ep.${element.id} - ${element.name}`;
        episode.classList.add("main__lftEpi");
        episode.setAttribute("data-episodeId",`${element.id}`);
        listEpisodes?.appendChild(episode);
        // listeners
        episode.addEventListener("click", createEpisodeDescription);
    });    
};
async function btnAddEpisodes () {

    if(listEpisodes?.childElementCount===undefined){
        // Posible modal informando del problema
    }else if(listEpisodes?.childElementCount<25){
        await createListEpisodes(2);
    }else if(listEpisodes?.childElementCount>25 && listEpisodes?.childElementCount<45){
        await createListEpisodes(3);
        btnEpisode?.setAttribute("style","display: none");
    }
};

async function createEpisodeDescription(this: HTMLElement){
    if (mainRgtUp){
        mainRgtUp.innerHTML="";
    }
    if (mainRgtDw){
        mainRgtDw.innerHTML="";
    }
    mainRgtUp?.setAttribute("style","height : 15%");
    mainRgtDw?.setAttribute("style","height : 85%");
    let refId = Number(this.getAttribute("data-episodeId"));
    let fetchepisodeInfo = await fetchOneEpisode(refId);
    const EpisodeDesc = document.createElement("div");
    EpisodeDesc.innerHTML=  `
                            <h3>${fetchepisodeInfo?.name}</h3>
                            <h4>${fetchepisodeInfo?.episode} | ${fetchepisodeInfo?.air_date}</h4>
                            `
    EpisodeDesc.classList.add("border-dark-subtle","border-bottom");
    mainRgtUp?.appendChild(EpisodeDesc);
    if (fetchepisodeInfo){
        console.log(fetchepisodeInfo?.characters);
        for (let urlChar of fetchepisodeInfo?.characters){
            let charDescription = await fetchCharacter(Number(urlChar.slice(42,48)));
            let charCard = document.createElement("div");
            let charImg = document.createElement("img");
            let charName = document.createElement("h5");
            let charSpcSt = document.createElement("h6");
            if(charDescription){
                charImg.src = charDescription?.image;
                charImg.classList.add("p-2");
                charName.textContent = charDescription?.name;
                charName.classList.add("m-0", "ps-2");
                charSpcSt.textContent = `${charDescription?.species} | ${charDescription?.status}`;
                charSpcSt.classList.add("m-0", "ps-2", "pb-1");
                charCard.setAttribute("data-characterId",`${charDescription.id}`)
            }//ALERT
            charCard.appendChild(charImg);
            charCard.appendChild(charName);
            charCard.appendChild(charSpcSt);
            charCard.classList.add("card","m-0", "p-0");
            charCard.style.width = "15vw";
            charCard.style.minWidth = "115px";
            mainRgtDw?.appendChild(charCard);
            // listeners
            charCard.addEventListener("click", createCharacterDescription);
        }
    }//ALERT
}
async function createCharacterDescription (this: HTMLElement) {
    let refId = Number(this.getAttribute("data-characterId"));
    let charDescription = await fetchCharacter(refId);
    if(charDescription){
        if (mainRgtUp){
            mainRgtUp.innerHTML="";
        }
        if (mainRgtDw){
            mainRgtDw.innerHTML="";
        }
        mainRgtUp?.setAttribute("style","height : 30%");
        mainRgtDw?.setAttribute("style","height : 70%");
        const charDesc = document.createElement("div");
        const charImg = document.createElement("img");
        charImg.src = charDescription.image;
        charImg.style.maxHeight = "23vh";
        charImg.style.opacity = "0.95";
        charImg.classList.add("float-end","ml-5", "my-auto", "rounded", "border","border-light");
        const charName = document.createElement("h3");
        charName.textContent = charDescription.name;
        const charDetailsA = document.createElement ("h4");
        charDetailsA.textContent = `${charDescription.species} | ${charDescription.gender} | ${charDescription.status}`;
        const charDetailsB = document.createElement ("h4");
        const charOrigin = document.createElement ("span");
        const charLocation = document.createElement ("span");

        charOrigin.textContent = `Origin: ${charDescription.origin.name} |`;
        charLocation.textContent = ` Location: ${charDescription.location.name}`;
        charLocation.classList.add("locations");
        charLocation.setAttribute ("data-locationName",`${charDescription.location.name}`);

        charDetailsB.appendChild(charOrigin);
        charOrigin.insertAdjacentElement("afterend",charLocation);                
        charDesc.appendChild(charImg);
        charDesc.appendChild(charName);
        charDesc.appendChild(charDetailsA);
        charDesc.appendChild(charDetailsB);
        charDesc.classList.add("text-center", "align-items-stretch", "justify-content-stretch");
        mainRgtUp?.appendChild(charDesc);

        charDescription.episode.forEach(async element => {
            let episodeId = Number(element.slice(40, 48));
            let fetchEpisodeInfo = await fetchOneEpisode(episodeId);
            const episodeDesc = document.createElement("div");
            episodeDesc.classList.add("card","p-2");
            episodeDesc.setAttribute("data-episodeId",`${fetchEpisodeInfo?.id}`);
            const episodeName = document.createElement("h6");
            episodeName.textContent = `${fetchEpisodeInfo?.episode}`;
            const episodeSeason = document.createElement("h6");
            episodeSeason.textContent = `Episode ${fetchEpisodeInfo?.id}`;
            episodeDesc.appendChild(episodeName);
            episodeDesc.appendChild(episodeSeason);
            mainRgtDw?.appendChild(episodeDesc);
            // listeners
            episodeDesc.addEventListener("click",createEpisodeDescription);
        });
        // listeners
        charLocation.addEventListener("click",createLocationDescription);
    }//ALERT

}
async function createLocationDescription (this: HTMLElement) {
    let refName = this.getAttribute("data-locationName");
    if(refName){
        let fetchLocationDescription = await fetchLocation (refName);
        console.log("lee");
        console.log(fetchLocationDescription);
        if (mainRgtUp){
            mainRgtUp.innerHTML="";
        }
        if (mainRgtDw){
            mainRgtDw.innerHTML="";
        }

        mainRgtUp?.setAttribute("style","height : 15%");
        mainRgtDw?.setAttribute("style","height : 85%");

        const LocationDesc = document.createElement("div");
        LocationDesc.innerHTML=  `
                                <h3>${fetchLocationDescription?.name}</h3>
                                <h4>${fetchLocationDescription?.type} | ${fetchLocationDescription?.dimension}</h4>
                                `
        LocationDesc.classList.add("border-dark-subtle","border-bottom");
        mainRgtUp?.appendChild(LocationDesc);
        if(fetchLocationDescription?.residents){
            console.log("residents")
            console.log(fetchLocationDescription?.residents)
            for (let urlChar of fetchLocationDescription?.residents){
                let charDescription = await fetchCharacter(Number(urlChar.slice(42,48)));
                let charCard = document.createElement("div");
                let charImg = document.createElement("img");
                let charName = document.createElement("h5");
                let charSpcSt = document.createElement("h6");
                if(charDescription){
                    charImg.src = charDescription?.image;
                    charImg.classList.add("p-2");
                    charName.textContent = charDescription?.name;
                    charName.classList.add("m-0", "ps-2");
                    charSpcSt.textContent = `${charDescription?.species} | ${charDescription?.status}`;
                    charSpcSt.classList.add("m-0", "ps-2", "pb-1");
                    charCard.setAttribute("data-characterId",`${charDescription.id}`)
                }//ALERT
                charCard.appendChild(charImg);
                charCard.appendChild(charName);
                charCard.appendChild(charSpcSt);
                charCard.classList.add("card","m-0", "p-0");
                charCard.style.width = "15vw";
                charCard.style.minWidth = "115px";
                mainRgtDw?.appendChild(charCard);
                // listeners
                charCard.addEventListener("click", createCharacterDescription);
            }
        }












    }

}


// listeners
btnEpisode?.addEventListener("click",btnAddEpisodes);