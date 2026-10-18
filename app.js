
const imagePaths = {
    baseMaterial: {
        "none": "",
        "18cm Pocket Encasement + Rl": "images/18cm Pocket Encasement + Rl.png",
        "20cm Semi Ortho Foam (D50)": "images/20cm Semi Ortho Foam (D50).png",
        "20cm Ortho Foam (D70)": "images/20cm Ortho Foam (D70).png",
        "20cm Foam (D24)": "images/20cm Foam (D24).png",
        "22cm Pocket Encasement + Rl": "images/22cm Pocket Encasement + Rl.png"
    },
    supportLayer: {
        "none": "",
        "4cm Orthopedic (D120)": "images/4cm Orthopedic (D120).png",
        "10cm Semi Orthopedic D50": "images/10cm Semi Orthopedic D50.png",
        "4cm Semi Orthopedic D50": "images/4cm Semi Orthopedic D50.png",
        "15cm Semi Orthopedic D50": "images/15cm Semi Orthopedic D50.png",
        "5cm Semi Orthopedic D50": "images/5cm Semi Orthopedic D50.png",
        "6cm D24": "images/6cm D24.png"
    },
    comfortLayer: {
        "none": "",
        "2cm D24": "images/2cm D24.png",
        "2cm R50": "images/2cm R50.png",
        "3cm R50": "images/3cm R50.png",
        "Synth Latex D26 1,5cm": "images/Synth Latex D26 1,5cm.png",
        "Synth Latex D26 2cm": "images/Synth Latex D26 2cm.png",
        "Synth Latex D50 2cm": "images/Synth Latex D50 2cm med.png",
        "Synth Latex D50 5cm": "images/Synth Latex D50 5cm med.png",
        "Memory Foam A Grade (Min Qty 1,6m3) 4cm": "images/Memory Foam A Grade (Min qty 1,6m3) 4cm med.png",
        "Latex A Grade 5cm": "images/Latex A Grade 5cm med.png",
        "Latex B Grade 5cm": "images/Latex B Grade 5cm med.png",
        "Memory Foam B Grade (Min Qty 1,6m3) 4cm": "images/Memory Foam B Grade (Min qty 1,6m3) 4cm med.png"
    },
    layerLast: {
        "none": "",
        "2cm D24": "images/2cm D24 ektra.png",
        "2cm R50": "images/2cm R50 ektra.png",
        "3cm R50": "images/3cm R50 ektra.png",
        "Synth Latex D26 1,5cm": "images/Synth Latex D26 1,5cm ektra.png",
        "Synth Latex D26 2cm": "images/Synth Latex D26 2cm ektra.png",
        "Synth Latex D50 2cm": "images/Synth Latex D50 2cm.png",
        "Synth Latex D50 5cm": "images/Synth Latex D50 5cm.png",
        "Memory Foam A Grade (Min Qty 1,6m3) 4cm": "images/Memory Foam A Grade (Min qty 1,6m3) 4cm.png",
        "Latex A Grade 5cm": "images/Latex A Grade 5cm.png",
        "Latex B Grade 5cm": "images/Latex B Grade 5cm.png",
        "Memory Foam B Grade (Min Qty 1,6m3) 4cm": "images/Memory Foam B Grade (Min qty 1,6m3) 4cm.png"
    },
    additionalLayer: {
        "none": "",
        "1 Side 5 Cm Quilting Top": "images/1cm Foam.png",
        "1 Side Non Quilting": "images/2cm Foam.png",
        "2 Side 5 Cm Quilting 2X": "images/3cm Foam.png",
        "2 Side 5 Cm Quilting - Non Quilting": "images/4cm Foam.png",
        "2 Side Non Quilting 2X": "images/5cm Foam.png"
    }
};
const prices = [
    0,          // none (index 0)
    11088000,   // 90x200 (index 1)
    14318000,   // 100x200 (index 2)
    16378000,   // 120x200 (index 3)
    18428000,   // 160x200 (index 4)
    20488000,   // 180x200 (index 5)
    22548000    // 200x200 (index 6)
];
// Contoh: ganti angka 0 dengan harga sesuai kebutuhan


// Contoh pemotongan — kamu bisa lanjutkan bagian `prices` dari file aslinya karena terlalu panjang
// atau saya bisa bantu kirimkan bagian lengkapnya juga kalau kamu butuh.

function updateSelection() {
    const ids = ["baseMaterial", "supportLayer", "comfortLayer", "layerLast", "additionalLayer"];
    const selected = ids.map(id => document.getElementById(id));
    const imgIds = ["baseMaterialImage", "supportLayerImage", "comfortLayerImage", "layerLastImage", "additionalLayerImage"];
    let visibleLayers = 0;

    selected.forEach((select, index) => {
        const image = document.getElementById(imgIds[index]);
        const path = (imagePaths[select.id] || {})[select.value] || "";
        image.src = path;
        image.classList.toggle("is-visible", Boolean(path));
        image.alt = select.value === "none" ? "" : select.options[select.selectedIndex].text;
        if (path) visibleLayers++;
    });

    const sizeSelect = document.getElementById("size");
    const sizeIndex = Number(sizeSelect.value);
    const total = Number(prices[sizeIndex] || 0);
    document.getElementById("totalPrice").innerText = `Rp ${total.toLocaleString("id-ID")}`;

    const empty = document.getElementById("previewEmpty");
    if (empty) empty.style.display = visibleLayers ? "none" : "flex";
    const summarySize = document.getElementById("summarySize");
    if (summarySize) summarySize.textContent = sizeIndex ? sizeSelect.options[sizeSelect.selectedIndex].text : "Belum dipilih";
    const summaryLayers = document.getElementById("summaryLayers");
    if (summaryLayers) {
        const selectedHeights = selected
            .filter(select => select.value && select.value !== "none")
            .map(select => {
                const text = select.options[select.selectedIndex].text;
                const match = text.match(/(\d+(?:[.,]\d+)?)\s*cm/i);
                return match ? Number(match[1].replace(",", ".")) : 0;
            });
        const totalHeight = selectedHeights.reduce((sum, height) => sum + height, 0);
        summaryLayers.textContent = totalHeight > 0 ? `${Number(totalHeight.toFixed(1))} cm` : "Belum dihitung";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ["baseMaterial", "supportLayer", "comfortLayer", "layerLast", "additionalLayer", "size"].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.addEventListener("change", updateSelection);
    });
    updateSelection();
});

function printSelection() {
    const name = prompt("Enter your name:");
    const address = prompt("Enter your address:");
    const phone = prompt("Enter your phone number:");

    const selections = {
        base: document.getElementById('baseMaterial').options[document.getElementById('baseMaterial').selectedIndex].text,
        support: document.getElementById('supportLayer').options[document.getElementById('supportLayer').selectedIndex].text,
        comfort: document.getElementById('comfortLayer').options[document.getElementById('comfortLayer').selectedIndex].text,
        layer: document.getElementById('layerLast').options[document.getElementById('layerLast').selectedIndex].text,
        extra: document.getElementById('additionalLayer').options[document.getElementById('additionalLayer').selectedIndex].text,
        size: document.getElementById('size').options[document.getElementById('size').selectedIndex].text,
        price: document.getElementById('totalPrice').innerText
    };

    const content = `
        <html><head><title>Invoice</title></head><body>
        <h2>Customer: ${name}</h2>
        <p>Address: ${address}</p><p>Phone: ${phone}</p>
        <table border="1">
        <tr><td>Base</td><td>${selections.base}</td></tr>
        <tr><td>Support</td><td>${selections.support}</td></tr>
        <tr><td>Comfort</td><td>${selections.comfort}</td></tr>
        <tr><td>Extra</td><td>${selections.layer}</td></tr>
        <tr><td>Finishing</td><td>${selections.extra}</td></tr>
        <tr><td>Size</td><td>${selections.size}</td></tr>
        <tr><td>Total</td><td>${selections.price}</td></tr>
        </table></body></html>
    `;

    const newWin = window.open('', '', 'width=600,height=400');
    newWin.document.write(content);
    newWin.document.close();
    newWin.print();
}
function simpanPilihanKeLocalStorage() {
    const pilihan = {
        baseMaterial: document.getElementById("baseMaterial").value,
        supportLayer: document.getElementById("supportLayer").value,
        comfortLayer: document.getElementById("comfortLayer").value,
        layerLast: document.getElementById("layerLast").value,
        additionalLayer: document.getElementById("additionalLayer").value,
        size: document.getElementById("size").value
    };
    const totalPrice = document.getElementById("totalPrice").innerText;
    try {
        localStorage.setItem("pilihanKasur", JSON.stringify(pilihan));
        localStorage.setItem("totalPrice", totalPrice);
        const button = document.getElementById("nextButton");
        if (button) {
            const label = button.querySelector("span");
            if (label) {
                const original = label.textContent;
                label.textContent = "Pilihan berhasil disimpan";
                window.setTimeout(() => { label.textContent = original; }, 1800);
            }
        }
    } catch (error) {
        alert("Pilihan belum dapat disimpan di browser ini. Silakan coba lagi.");
    }
}
