
if (document.location.href.includes("rom=")) {
    const urlParams = new URLSearchParams(document.location.search);
    const romParam = urlParams.get("rom").toUpperCase();
    const roms = ["V01D"];
    if (!roms.includes(romParam)) {
        throw new Error("Invalid ROM specified in URL parameter. Allowed values are: " + roms.join(", "));
    }
    if (romParam && romParam.length > 0) {
        window.ROM_FILENAME = "rom/" + romParam + ".gb";
        window.ROM_NAME = romParam;
        document.head.querySelector("title").innerText = window.ROM_NAME;
    }
}