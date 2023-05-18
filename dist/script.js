var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlEpisodes = "https://rickandmortyapi.com/api/episode";
const urlCharacter = "https://rickandmortyapi.com/api/character";
const urlLocation = "https://rickandmortyapi.com/api/location";
let urlRequested = "";
const listEpisodes = document.querySelector("#list-episodes");
const mainRgt = document.querySelector("#main-rgt");
const mainRgtUp = document.querySelector("#main-rgtup");
const mainRgtDw = document.getElementById("main-rgtdw");
const btnEpisode = document.querySelector("#btn-episodes");
createListEpisodes(1);
function fetchEpisodes(page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requestResponse = yield fetch(`https://rickandmortyapi.com/api/episode/?page=${page}`);
            if (requestResponse.status === 200) {
                const dataResponse = yield requestResponse.json();
                const arrayEpisodes = dataResponse.results;
                return arrayEpisodes;
            }
            else if (requestResponse.status === 400) {
                console.log("400 Bad Request");
            }
            else if (requestResponse.status === 404) {
                console.log("404 Not found");
            }
            else {
                console.log("Other errors");
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
function fetchOneEpisode(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requestResponse = yield fetch(`https://rickandmortyapi.com/api/episode/${id}`);
            if (requestResponse.status === 200) {
                const Episode = yield requestResponse.json();
                return Episode;
            }
            else if (requestResponse.status === 400) {
                console.log("400 Bad Request");
            }
            else if (requestResponse.status === 404) {
                console.log("404 Not found");
            }
            else {
                console.log("Other errors");
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
function fetchCharacter(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requestResponse = yield fetch(`https://rickandmortyapi.com/api/character/${id}`);
            if (requestResponse.status === 200) {
                const Character = yield requestResponse.json();
                return Character;
            }
            else if (requestResponse.status === 400) {
                console.log("400 Bad Request");
            }
            else if (requestResponse.status === 404) {
                console.log("404 Not found");
            }
            else {
                console.log("Other errors");
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
function fetchLocation(locationName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requestResponse = yield fetch(`https://rickandmortyapi.com/api/location/?name=${locationName}`);
            if (requestResponse.status === 200) {
                const dataResponse = yield requestResponse.json();
                const arrayLocation = dataResponse.results;
                const location = arrayLocation[0];
                return location;
            }
            else if (requestResponse.status === 400) {
                console.log("400 Bad Request");
            }
            else if (requestResponse.status === 404) {
                console.log("404 Not found");
            }
            else {
                console.log("Other errors");
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
function createListEpisodes(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const arrayEpisodes = yield fetchEpisodes(page);
        arrayEpisodes === null || arrayEpisodes === void 0 ? void 0 : arrayEpisodes.forEach(element => {
            const episode = document.createElement("li");
            episode.textContent = `Ep.${element.id} - ${element.name}`;
            episode.classList.add("main__lftEpi");
            episode.setAttribute("data-episodeId", `${element.id}`);
            listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.appendChild(episode);
            episode.addEventListener("click", createEpisodeDescription);
        });
    });
}
;
function btnAddEpisodes() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.childElementCount) === undefined) {
            console.log("Internal error (ref:createListEpisodes)");
        }
        else if ((listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.childElementCount) < 25) {
            yield createListEpisodes(2);
        }
        else if ((listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.childElementCount) > 25 && (listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.childElementCount) < 45) {
            yield createListEpisodes(3);
            btnEpisode === null || btnEpisode === void 0 ? void 0 : btnEpisode.setAttribute("style", "display: none");
        }
    });
}
;
function createEpisodeDescription() {
    return __awaiter(this, void 0, void 0, function* () {
        if (mainRgtUp) {
            mainRgtUp.innerHTML = "";
        }
        if (mainRgtDw) {
            mainRgtDw.innerHTML = "";
        }
        mainRgtUp === null || mainRgtUp === void 0 ? void 0 : mainRgtUp.setAttribute("style", "height : 15%");
        mainRgtDw === null || mainRgtDw === void 0 ? void 0 : mainRgtDw.setAttribute("style", "height : 85%");
        let refId = Number(this.getAttribute("data-episodeId"));
        let fetchepisodeInfo = yield fetchOneEpisode(refId);
        const EpisodeDesc = document.createElement("div");
        EpisodeDesc.innerHTML = `
                            <h3>${fetchepisodeInfo === null || fetchepisodeInfo === void 0 ? void 0 : fetchepisodeInfo.name}</h3>
                            <h4>${fetchepisodeInfo === null || fetchepisodeInfo === void 0 ? void 0 : fetchepisodeInfo.episode} | ${fetchepisodeInfo === null || fetchepisodeInfo === void 0 ? void 0 : fetchepisodeInfo.air_date}</h4>
                            `;
        EpisodeDesc.classList.add("border-dark-subtle", "border-bottom");
        mainRgtUp === null || mainRgtUp === void 0 ? void 0 : mainRgtUp.appendChild(EpisodeDesc);
        if (fetchepisodeInfo) {
            console.log(fetchepisodeInfo === null || fetchepisodeInfo === void 0 ? void 0 : fetchepisodeInfo.characters);
            for (let urlChar of fetchepisodeInfo === null || fetchepisodeInfo === void 0 ? void 0 : fetchepisodeInfo.characters) {
                let charDescription = yield fetchCharacter(Number(urlChar.slice(42, 48)));
                let charCard = document.createElement("div");
                let charImg = document.createElement("img");
                let charName = document.createElement("h5");
                let charSpcSt = document.createElement("h6");
                if (charDescription) {
                    charImg.src = charDescription === null || charDescription === void 0 ? void 0 : charDescription.image;
                    charImg.classList.add("p-2");
                    charName.textContent = charDescription === null || charDescription === void 0 ? void 0 : charDescription.name;
                    charName.classList.add("m-0", "ps-2");
                    charSpcSt.textContent = `${charDescription === null || charDescription === void 0 ? void 0 : charDescription.species} | ${charDescription === null || charDescription === void 0 ? void 0 : charDescription.status}`;
                    charSpcSt.classList.add("m-0", "ps-2", "pb-1");
                    charCard.setAttribute("data-characterId", `${charDescription.id}`);
                }
                charCard.appendChild(charImg);
                charCard.appendChild(charName);
                charCard.appendChild(charSpcSt);
                charCard.classList.add("card", "m-0", "p-0");
                charCard.style.width = "15vw";
                charCard.style.minWidth = "115px";
                mainRgtDw === null || mainRgtDw === void 0 ? void 0 : mainRgtDw.appendChild(charCard);
                charCard.addEventListener("click", createCharacterDescription);
            }
        }
    });
}
function createCharacterDescription() {
    return __awaiter(this, void 0, void 0, function* () {
        let refId = Number(this.getAttribute("data-characterId"));
        let charDescription = yield fetchCharacter(refId);
        if (charDescription) {
            if (mainRgtUp) {
                mainRgtUp.innerHTML = "";
            }
            if (mainRgtDw) {
                mainRgtDw.innerHTML = "";
            }
            mainRgtUp === null || mainRgtUp === void 0 ? void 0 : mainRgtUp.setAttribute("style", "height : 30%");
            mainRgtDw === null || mainRgtDw === void 0 ? void 0 : mainRgtDw.setAttribute("style", "height : 70%");
            const charDesc = document.createElement("div");
            const charImg = document.createElement("img");
            charImg.src = charDescription.image;
            charImg.style.maxHeight = "23vh";
            charImg.style.opacity = "0.95";
            charImg.classList.add("float-end", "ml-5", "my-auto", "rounded", "border", "border-light");
            const charName = document.createElement("h3");
            charName.textContent = charDescription.name;
            const charDetailsA = document.createElement("h4");
            charDetailsA.textContent = `${charDescription.species} | ${charDescription.gender} | ${charDescription.status}`;
            const charDetailsB = document.createElement("h4");
            const charOrigin = document.createElement("span");
            const charLocation = document.createElement("span");
            charOrigin.textContent = `Origin: ${charDescription.origin.name} |`;
            charLocation.textContent = ` Location: ${charDescription.location.name}`;
            charLocation.classList.add("locations");
            charLocation.setAttribute("data-locationName", `${charDescription.location.name}`);
            charDetailsB.appendChild(charOrigin);
            charOrigin.insertAdjacentElement("afterend", charLocation);
            charDesc.appendChild(charImg);
            charDesc.appendChild(charName);
            charDesc.appendChild(charDetailsA);
            charDesc.appendChild(charDetailsB);
            charDesc.classList.add("text-center", "align-items-stretch", "justify-content-stretch");
            mainRgtUp === null || mainRgtUp === void 0 ? void 0 : mainRgtUp.appendChild(charDesc);
            charDescription.episode.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                let episodeId = Number(element.slice(40, 48));
                let fetchEpisodeInfo = yield fetchOneEpisode(episodeId);
                const episodeDesc = document.createElement("div");
                episodeDesc.classList.add("card", "p-2");
                episodeDesc.setAttribute("data-episodeId", `${fetchEpisodeInfo === null || fetchEpisodeInfo === void 0 ? void 0 : fetchEpisodeInfo.id}`);
                const episodeName = document.createElement("h6");
                episodeName.textContent = `${fetchEpisodeInfo === null || fetchEpisodeInfo === void 0 ? void 0 : fetchEpisodeInfo.episode}`;
                const episodeSeason = document.createElement("h6");
                episodeSeason.textContent = `Episode ${fetchEpisodeInfo === null || fetchEpisodeInfo === void 0 ? void 0 : fetchEpisodeInfo.id}`;
                episodeDesc.appendChild(episodeName);
                episodeDesc.appendChild(episodeSeason);
                mainRgtDw === null || mainRgtDw === void 0 ? void 0 : mainRgtDw.appendChild(episodeDesc);
                episodeDesc.addEventListener("click", createEpisodeDescription);
            }));
            charLocation.addEventListener("click", createLocationDescription);
        }
    });
}
function createLocationDescription() {
    return __awaiter(this, void 0, void 0, function* () {
        let refName = this.getAttribute("data-locationName");
        if (refName) {
            let fetchLocationDescription = yield fetchLocation(refName);
            console.log("lee");
            console.log(fetchLocationDescription);
            if (mainRgtUp) {
                mainRgtUp.innerHTML = "";
            }
            if (mainRgtDw) {
                mainRgtDw.innerHTML = "";
            }
            mainRgtUp === null || mainRgtUp === void 0 ? void 0 : mainRgtUp.setAttribute("style", "height : 15%");
            mainRgtDw === null || mainRgtDw === void 0 ? void 0 : mainRgtDw.setAttribute("style", "height : 85%");
            const LocationDesc = document.createElement("div");
            LocationDesc.innerHTML = `
                                <h3>${fetchLocationDescription === null || fetchLocationDescription === void 0 ? void 0 : fetchLocationDescription.name}</h3>
                                <h4>${fetchLocationDescription === null || fetchLocationDescription === void 0 ? void 0 : fetchLocationDescription.type} | ${fetchLocationDescription === null || fetchLocationDescription === void 0 ? void 0 : fetchLocationDescription.dimension}</h4>
                                `;
            LocationDesc.classList.add("border-dark-subtle", "border-bottom");
            mainRgtUp === null || mainRgtUp === void 0 ? void 0 : mainRgtUp.appendChild(LocationDesc);
            if (fetchLocationDescription === null || fetchLocationDescription === void 0 ? void 0 : fetchLocationDescription.residents) {
                console.log("residents");
                console.log(fetchLocationDescription === null || fetchLocationDescription === void 0 ? void 0 : fetchLocationDescription.residents);
                for (let urlChar of fetchLocationDescription === null || fetchLocationDescription === void 0 ? void 0 : fetchLocationDescription.residents) {
                    let charDescription = yield fetchCharacter(Number(urlChar.slice(42, 48)));
                    let charCard = document.createElement("div");
                    let charImg = document.createElement("img");
                    let charName = document.createElement("h5");
                    let charSpcSt = document.createElement("h6");
                    if (charDescription) {
                        charImg.src = charDescription === null || charDescription === void 0 ? void 0 : charDescription.image;
                        charImg.classList.add("p-2");
                        charName.textContent = charDescription === null || charDescription === void 0 ? void 0 : charDescription.name;
                        charName.classList.add("m-0", "ps-2");
                        charSpcSt.textContent = `${charDescription === null || charDescription === void 0 ? void 0 : charDescription.species} | ${charDescription === null || charDescription === void 0 ? void 0 : charDescription.status}`;
                        charSpcSt.classList.add("m-0", "ps-2", "pb-1");
                        charCard.setAttribute("data-characterId", `${charDescription.id}`);
                    }
                    charCard.appendChild(charImg);
                    charCard.appendChild(charName);
                    charCard.appendChild(charSpcSt);
                    charCard.classList.add("card", "m-0", "p-0");
                    charCard.style.width = "15vw";
                    charCard.style.minWidth = "115px";
                    mainRgtDw === null || mainRgtDw === void 0 ? void 0 : mainRgtDw.appendChild(charCard);
                    charCard.addEventListener("click", createCharacterDescription);
                }
            }
        }
    });
}
btnEpisode === null || btnEpisode === void 0 ? void 0 : btnEpisode.addEventListener("click", btnAddEpisodes);
export {};
//# sourceMappingURL=script.js.map