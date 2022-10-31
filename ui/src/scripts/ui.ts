export function addListenersForLeftModal() {
    const drawer = document.querySelector(".slideRight");
    let isOpen = false;

    function updateDrawer(open: boolean) {
        isOpen = open;
        if (isOpen) {
            drawer.classList.add("slideRightOpen");
            return;
        }
        drawer.classList.remove("slideRightOpen");
    }

    document.addEventListener("click", event => {
        const ele = event.target as HTMLElement;

        if (ele === document.querySelector("#menu")) {
            updateDrawer(true);
            return;
        }

        // Close if click outside of the drawer.
        if (isOpen && !ele.closest(".slideRight")) {
            updateDrawer(false);
        }
    });

    document.querySelector("#closeMenu").addEventListener("click", () => {
        updateDrawer(false);
    });

    document.querySelector("#learnButton").addEventListener("click", () => {
        document.location.href = "learn.html";
    });
    document.querySelector("#playButton").addEventListener("click", () => {
        document.location.href = "play.html";
    });
    document.querySelector("#trainButton").addEventListener("click", () => {
        document.location.href = "train.html";
    });
    document.querySelector("#cubleButton").addEventListener("click", () => {
        document.location.href = "cuble.html";
    });
}