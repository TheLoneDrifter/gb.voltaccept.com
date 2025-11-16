
var romList = [
    { name: "V01D", path: "rom/V01D.gb", model: "DMG-TRPG-USA" },
];

var cartridgeList = [];
const urlParams = new URLSearchParams(window.location.search);
var currentRom = null;

if (urlParams.has('rom')) {
    currentRom = urlParams.get('rom');
}

if (currentRom !== null) {
    const rom = romList.find(r => r.name === currentRom);
    if (rom) {
        window.ROM_FILENAME = rom.path;
        window.ROM_NAME = rom.name;
    }
}

function loadCartridge(rom) {
    document.location.href = '?rom=' + rom;
}

function ejectCartridge() {
    document.location.href = window.location.pathname;
}

function initCartridgeList() {
    const container = document.querySelector('.cartridge-cont');
    romList.forEach(rom => {
        const cart = document.createElement('div');
        cart.className = 'cartridge';
        cart.onclick = () => loadCartridge(rom.name);
        cart.style.cursor = 'pointer';
        cart.id = `cart_${rom.name}`;
        cart.innerHTML = cartridgeHTML("front", rom);
        container.appendChild(cart);
        cartridgeList.push({ name: rom.name, id: cart.id });
    });
}

function initializeCartridge() {
    initCartridgeList();

    if (currentRom) {
        const selectedCart = document.getElementById(`cart_${currentRom}`);
        if (selectedCart) {
            selectedCart.classList.add('selected-cartridge');
            const insertedContainer = document.querySelector('.inserted-cartridge');
            insertedContainer.innerHTML = `${cartridgeHTML("back", romList.find(r => r.name === currentRom))}`; 
            insertedContainer.style.cursor = 'pointer';
        }
        else {
            console.warn(`Cartridge for ROM "${currentRom}" not found.`);
            selectedCart.classList.remove('selected-cartridge');
        }
    }
}

function cartridgeHTML(side = "front", rom = { name: "V01D", model: "DMG-TRPG-USA" }) {
    if (side === "front") {
        return `
              <div class="cartridge_top">
                <div class="part part_1"></div>
                <div class="part part_2">
                  <div class="part stripe"></div>
                  <div class="part stripe"></div>
                  <div class="part stripe"></div>
                  <div class="part stripe"></div>
                  <div class="part stripe"></div>
                </div>
              </div>
              <div class="part logo">
                <p>Nintendo <span>Gameboy</span></p>
              </div>
              <div class="part large"></div>
              <div class="part dark">
                <div class="part"></div>
              </div>
              <div class="part dark image_bg">
                <div class="part image">
                  <img id="cartridge_image" src="svg/${rom.name}.svg" alt="${rom.name} Cartridge Label" />
                </div>
              </div>
              <div class="part triangle"></div>
              </div>`;
    } else if (side === "back") {
        return `
              <div class="cartridge_top back">
                <div class="part part_1 back"></div>
                <div class="part part_2 back">
                  <div class="part stripe back"></div>
                  <div class="part stripe back"></div>
                  <div class="part stripe back"></div>
                  <div class="part stripe back"></div>
                </div>
              <div class="part logo back">
                <p class="back">MADE IN AMERICA</p>
                <p class="patent">PAT. PEND</p>
              </div>
              </div>`;
    }
    return '';
}

function init() {
    initializeCartridge();
}