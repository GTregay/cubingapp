import { newScene } from '../lib/scripts/rubiks-viz';
import algSets from './algSets.json';

export {};

let callback: (state) => void;

export function setCallback(_callback: (state) => void) {
    callback = _callback;
    return state;
}

type Alg = {
    name: string,
    algs: string[],
}

type AlgSet = {
    name: string,
    numAlgs: number,
    puzzle: string,
}

type State = {
    algs: Alg[]
    algSetName: string,
    algSets: AlgSet[],
}

let state: State = {
    algs: [],
    algSets: algSets,
    algSetName: new URL(document.URL).searchParams.get("set"),
};

let shouldRenderCubes = false;

export function getAlgSetUrl(algSet: string): string {
    const url = new URL(document.URL);
    url.searchParams.set("set", algSet);
    return url.toString();
}

export async function selectAlgSet() {
    const algSet = state.algSetName;
    if (!algSet) return;

    const url = "https://raw.githubusercontent.com/spencerchubb/algdb/main/algSets";
    const res = await fetch(`${url}/${algSet}.json`);
    const json = await res.json();

    state.algs = json;
    state.algSetName = algSet;
    shouldRenderCubes = true;
    callback(state);
}

// Do this lazily because it's slow af on mobile
export function renderCubes() {
    if (!shouldRenderCubes || !state.algs || state.algs.length === 0) return;
    shouldRenderCubes = false;
    
    // Wrap in setTimeout so the code doesn't block the UI
    setTimeout(() => {
        const algSet = algSets.find(algSet => algSet.name === state.algSetName);
        const numLayers = algSet.puzzle === "2x2" ? 2 : 3;

        for (let i = 0; i < state.algs.length; i++) {
            const alg = state.algs[i];
            let sceneDiv = document.querySelector(`#scene${i}`) as HTMLElement;
            if (!sceneDiv) {
                console.error(`Could not find scene${i}`);
                continue;
            }
            const scene = newScene(sceneDiv, numLayers);
            scene.enableKey = () => false;
            scene.dragEnabled = false;
            
            const firstAlg = alg.algs[0];
            scene.cube.performAlgReverse(firstAlg);
        }
    }, 0);
}
