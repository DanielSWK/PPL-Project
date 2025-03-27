document.addEventListener("DOMContentLoaded", function () {
    const orgData = [
        { name: "Badan Eksekutif Mahasiswa (BEM)", image: "image/gambar_bem.jpg", description: "BEM adalah organisasi mahasiswa yang berperan dalam advokasi dan kegiatan kampus." },
        { name: "Majelis Perwakilan Mahasiswa (MPM)", image: "image/mpm.png", description: "MPM bertugas sebagai perwakilan mahasiswa dalam kebijakan kampus." },
        { name: "Spiritual Growth", image: "image/spiritual.jpg", description: "Organisasi yang mendukung pertumbuhan spiritual mahasiswa." },
        { name: "Nusantara Dance Company", image: "image/ndc.jpg", description: "Grup tari yang mempromosikan budaya Nusantara." },
        { name: "Lighthouse Singers", image: "image/lhs.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Artband", image: "image/artband.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Billiard", image: "image/billiard.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Nihon Utopia", image: "image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Mentoring", image: "image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "PHPC", image: "image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Hana Union", image: "image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Meng Club", image: "image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "UPH Choir", image: "image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Movie Production Club", image: "image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "E-Sport", image: "image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Pingpong", image: "image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Mahasiswa Pecinta Alam UPH", image: "image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Mana Proxia Theatre", image: "image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Production Troops", image: "image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Service Learning Community (SLC)", image: "image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Ambassadors of UPH", image: "image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." }
    ];

    const orgGrid = document.getElementById("orgGrid");
    const searchInput = document.getElementById("searchInput");
    const orgList = document.getElementById("orgList");
    const orgDetail = document.getElementById("orgDetail");
    const unitPage = document.getElementById("unitPage");
    const detailContent = document.getElementById("detailContent");
    const unitContent = document.getElementById("unitContent");
    const allActivitiesBtn = document.getElementById("allActivitiesBtn");
    const unitButtons = document.querySelectorAll(".btn.red:not(:first-of-type)"); // Tombol unit kegiatan

    function renderOrganizations(filter = "") {
        orgGrid.innerHTML = "";
        const filteredData = orgData.filter(org => org.name.toLowerCase().includes(filter.toLowerCase()));

        filteredData.forEach(org => {
            const card = document.createElement("div");
            card.classList.add("card", "hidden-element"); // Start hidden for animation
            card.style.backgroundImage = `url('${org.image}')`;
            card.innerHTML = `<h4>${org.name}</h4>`;
            card.addEventListener("click", () => showOrgDetail(org));
            orgGrid.appendChild(card);
        });

        // Ensure animation applies after cards are inserted into the DOM
        setTimeout(() => applyScrollAnimation(), 100);
    }

    function showOrgDetail(org) {
        orgList.classList.add("hidden");
        orgDetail.classList.remove("hidden");
        unitPage.classList.add("hidden");

        detailContent.innerHTML = `
            <h2>${org.name}</h2>
            <img src="${org.image}" alt="${org.name}" style="width: 100%; border-radius: 8px; margin-bottom: 10px;">
            <p>${org.description}</p>
        `;
    }

    function showUnitContent(unitName) {
        orgList.classList.add("hidden");
        orgDetail.classList.add("hidden");
        unitPage.classList.remove("hidden");

        // Remove previous unit styles
        unitPage.classList.remove("unit-ukm", "unit-ulm", "unit-ok");
        unitPage.classList.add(`unit-${unitName}`);

        const unitDescriptions = {
            "ukm": ["Artband", "Nusantara Dance Company", "Lighthouse Singers", "Spirit Dance Company", "Mana Proxia Theatre", "Hana Union", "Meng Club", "Billiard", "E-Sports", "Production Troops",
                    "Nihon Utopia", "Mentoring", "Movie Production Club", "Pingpomg", "Mahasiswa Pecinta Alam UPH"],            
            "ulm": ["Majelis Perwakilan Mahasiswa (MPM)", "Badan Eksekutif Mahasiswa (BEM)", "Student Learning Community (SLC)"],
            "ok": ["Spiritual Growth", "Nihon Utopia"]
        };

        unitContent.innerHTML = `
            <h2>${unitName.toUpperCase()}</h2>
            <p>${unitDescriptions[unitName]}</p>
            <div class="grid" id="filteredOrgGrid"></div>
        `;

        // Show only activities related to the selected unit
        renderFilteredOrganizations(unitName);
    }

    function renderFilteredOrganizations(unitType) {
        const filteredOrgGrid = document.getElementById("filteredOrgGrid");
        filteredOrgGrid.innerHTML = "";

        const unitOrganizations = {
            "ukm": ["Artband", "Nusantara Dance Company", "Lighthouse Singers", "Spirit Dance Company"],
            "ulm": ["Majelis Perwakilan Mahasiswa (MPM)", "Badan Eksekutif Mahasiswa (BEM)"],
            "ok": ["Spiritual Growth", "Nihon Utopia"]
        };

        const filteredData = orgData.filter(org => unitOrganizations[unitType].includes(org.name));

        filteredData.forEach(org => {
            const card = document.createElement("div");
            card.classList.add("card", "hidden-element"); // Start hidden for animation
            card.style.backgroundImage = `url('${org.image}')`;
            card.innerHTML = `<h4>${org.name}</h4>`;
            card.addEventListener("click", () => showOrgDetail(org));
            filteredOrgGrid.appendChild(card);
        });

        // Ensure animation applies after cards are inserted into the DOM
        setTimeout(() => applyScrollAnimation(), 100);
    }

    function applyScrollAnimation() {
        const elementsToAnimate = document.querySelectorAll(".content .btn, .content .card");

        // Ensure elements start hidden
        elementsToAnimate.forEach(el => el.classList.add("hidden-element"));

        // Create Intersection Observer
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show"); // Make visible
                    entry.target.classList.remove("hidden-element"); // Ensure visibility
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, { threshold: 0.2 });

        // Observe each element
        elementsToAnimate.forEach(element => observer.observe(element));
    }

    function showOrgList() {
        orgDetail.classList.add("hidden");
        unitPage.classList.add("hidden");
        orgList.classList.remove("hidden");
    }

    searchInput.addEventListener("input", (e) => {
        renderOrganizations(e.target.value);
    });

    // Tombol "Semua Kegiatan Mahasiswa" menampilkan kembali daftar organisasi
    allActivitiesBtn.addEventListener("click", function () {
        showOrgList();
    });

    // Fungsi untuk menampilkan konten unit kegiatan di halaman yang sama
    unitButtons.forEach(button => {
        button.addEventListener("click", function () {
            const unitName = button.innerText.toLowerCase().replace(/\s+/g, "");
            showUnitContent(unitName);
        });
    });

    window.addEventListener("scroll", function () {
        const videoContainer = document.querySelector(".video-container");

        if (window.scrollY > videoContainer.clientHeight) {
            document.body.classList.add("hidden-top-bar");
        } else {
            document.body.classList.remove("hidden-top-bar");
        }
    });
    
    // Run animation on first load
    applyScrollAnimation();

    // Initial render
    renderOrganizations();
});
