import * as scene from "./scene";
import { initCanvas, listenToNavButtons } from "./ui";
import { shuffle } from "./util";
const algData: any[] = require("./alg-data.json");

function newSolvedCube(numOfLayers: string) {
    scene.cube.activateAllStickers();
    scene.cube.setNumOfLayers(numOfLayers);
    scene.cube.new();
    scene.buffers.initBufferData(scene.cube);
    scene.render();
}

export function main() {
    listenToNavButtons();

    scene.cube.setNumOfLayers(3);
    scene.cube.activateAllStickers();
    scene.cube.new();

    initCanvas();

    const layerInput = document.querySelector("#layerInput") as HTMLInputElement;
    layerInput.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        newSolvedCube(target.value);
    });

    document.querySelector("#solve").addEventListener("click", (event) => {
        newSolvedCube(layerInput.value);
    });

    document.querySelector("#scramble").addEventListener("click", (event) => {
        scene.cube.naiveScramble();
        scene.render();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === " ") {
            // Prevent space from scrolling down
            event.preventDefault();

            handleShowSolution();
        } else if (event.key == "Enter") {
            nextAlg();
        } else if (scene.cube.matchKeyToTurn(event.key)) {
            scene.animateTurn(null);
        }
    });

    const algSetSelect = document.querySelector("#alg-set-select");
    algSetSelect.addEventListener("change", (event) => {
        const set = (event.target as HTMLInputElement).value;
        findAlgSet(set);
        renderCategories();
        renderAlgs();
    });
    algData.forEach(algSet => {
        const option = document.createElement("option");
        option.textContent = algSet.set;
        option.value = algSet.set;
        algSetSelect.appendChild(option);
    });

    // The initial 'selectedAlgSet' should just be the first alg set.
    let selectedAlgSet = algData[0];

    // Iterate 'algData' and find the desired set. 
    // Assign this alg set to the global variable 'selectedAlgSet'
    function findAlgSet(set: string) {
        console.log("Displaying alg set:", set);

        for (let i = 0; i < algData.length; i++) {
            const algSet = algData[i];
            if (algSet.set === set) {
                selectedAlgSet = algSet;
                break;
            }
        }
    }

    const aufOptions = ["", "U", "U2", "U'"];
    function generateRandAUF() {
        return aufOptions[Math.floor(Math.random() * 4)];
    }

    let selectedAlgs;

    let currAlg = -1;
    let preAUF;
    let postAUF;
    function loadCurrAlg() {
        handleHideSolution();

        let alg = selectedAlgs[currAlg];
        let algText = alg.alg;

        preAUF = generateRandAUF();
        postAUF = generateRandAUF();
        if (preAUF !== "") {
            algText = preAUF + " " + algText;
        }
        if (postAUF !== "") {
            algText += " " + postAUF;
        }

        scene.cube.new();
        scene.cube.execAlgReverse(algText);
        scene.cube.setStickers();
        scene.render();
    }

    function nextAlg() {
        currAlg += 1;
        if (currAlg >= selectedAlgs.length) {
            currAlg = 0;
            selectedAlgs = shuffle(selectedAlgs);
        }

        loadCurrAlg();
    }

    const solutionText: HTMLElement = document.querySelector("#solution-text");
    const showSolutionButton: HTMLElement = document.querySelector("#show-solution-button");
    showSolutionButton.addEventListener("click", handleShowSolution);
    function handleShowSolution() {
        let alg = selectedAlgs[currAlg];
        let algText = alg.alg;

        if (alg.symmetry == "2") {
            if (preAUF != "" && preAUF != "U2") {
                algText = preAUF + " " + algText;
            }
        } else if (alg.symmetry == "4") {
            // Do nothing
        } else {
            if (preAUF != "") {
                algText = preAUF + " " + algText;
            }
        }

        solutionText.textContent = `Solution: ${algText}`;
        solutionText.style.display = "block";
        showSolutionButton.style.display = "none";
    }
    function handleHideSolution() {
        solutionText.style.display = "none";
        showSolutionButton.style.display = "block";
    }

    const categoriesDiv = document.querySelector("#categories-div");

    function renderCategories() {
        categoriesDiv.innerHTML = "";

        let categories = selectedAlgSet.categories;
        let algs = selectedAlgSet.algs;

        selectedAlgs = shuffle(algs);

        let inputs = [];
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];

            const input = document.createElement("input");
            input.addEventListener("change", () => {
                let categoriesToFilter = categories.filter((_, j) => inputs[j].checked);
                console.log(categoriesToFilter);

                if (categoriesToFilter.length !== 0) {
                    // If there are some, filter down to those categories
                    selectedAlgs = [];
                    algs.forEach((alg, j) => {
                        if (categoriesToFilter.includes(alg.category)) {
                            selectAlg(j);
                            selectedAlgs.push(alg);
                        } else {
                            deselectAlg(j);
                        }
                    });
                } else {
                    // If there are no filters, use all algs
                    algs.forEach((_, j) => {
                        selectAlg(j);
                    });
                    selectedAlgs = algs;
                }
                
                currAlg = -1;
                selectedAlgs = shuffle(selectedAlgs);
            });
            input.id = category;
            input.type = "checkbox";
            inputs.push(input);

            const categoryDiv = document.createElement("div");
            categoryDiv.style.display = "flex";
            categoryDiv.style.flexDirection = "row";
            categoryDiv.style.alignItems = "center";

            const label = document.createElement("label");
            // for attribute of the label should match the id of the input
            label.htmlFor = category;
            label.textContent = category;
            label.style.paddingLeft = "8px";
            label.style.color = "white";

            categoryDiv.appendChild(input);
            categoryDiv.appendChild(label);

            categoriesDiv.appendChild(categoryDiv);
        }
    }

    const algsTableBody = document.querySelector("#algs-table-body");

    // Array of td elements that indicate whether an algorithm is selected
    let selectedTdArray = [];

    // Booleans that indicate which algs are selected
    let isSelected = [];

    function renderAlgs() {
        algsTableBody.innerHTML = "";

        let algs = selectedAlgSet.algs;

        selectedTdArray = [];
        isSelected = [];

        for (let i = 0; i < algs.length; i++) {
            isSelected.push(true);

            const selectedTd = document.createElement("td");
            selectedTd.textContent = "Yes";
            selectedTd.style.color = "#c7ffc7";
            selectedTdArray.push(selectedTd);

            const algTd = document.createElement("td");
            algTd.textContent = algs[i].alg;

            const categoryTd = document.createElement("td");
            categoryTd.textContent = algs[i].category;

            const tr = document.createElement("tr");
            tr.appendChild(selectedTd);
            tr.appendChild(algTd);
            tr.appendChild(categoryTd);

            algsTableBody.appendChild(tr);
        }
    }

    function selectAlg(n: number) {
        isSelected[n] = true;
        const selectedTd = selectedTdArray[n];
        selectedTd.textContent = "Yes";
        selectedTd.style.color = "#c7ffc7";
    }

    function deselectAlg(n: number) {
        isSelected[n] = false;
        const selectedTd = selectedTdArray[n];
        selectedTd.textContent = "No";
        selectedTd.style.color = "white";
    }

    // Initial render
    handleHideSolution();
    renderCategories();
    renderAlgs();
}

main();