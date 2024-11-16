// Initialize AOS
AOS.init({
  duration: 1200,
});

// Toggle for expandable terms
function toggleTerm(element) {
  const content = element.nextElementSibling;
  content.style.display = content.style.display === "none" ? "block" : "none";
}

// Toggle the visibility of the details in each portfolio item
function toggleDetails(card) {
  const details = card.querySelector(".details");
  details.style.display = details.style.display === "none" ? "block" : "none";
}

// JavaScript function to scroll back to the clicked button
function focusAccordion(button) {
  setTimeout(() => {
    button.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 200); // Delay allows the accordion collapse/expand animation to complete
}

// Helper function to create a card
function createParasiteCard(parasite) {
  const card = document.createElement("div");
  card.classList.add("col");
  card.innerHTML = `
      <div class="card" onclick="toggleDetails(this)">
        <div class="card-image-container">
            <img src="${parasite.thumbnail}" class="card-img-top" alt="${
    parasite.name
  } ova" />
        </div>
        <div class="card-body">
          <h5 class="card-title">${parasite.name}</h5>
        </div>
        <div class="details m-2" style="display: none">
          <small>${parasite.thumbnailText}</small>
          ${parasite.images
            .map(
              (image) =>
                `<img src="${image}" class="card-img-top mt-3" alt="${parasite.imagesDescription}" />`
            )
            .join("")}
          <small>${parasite.imagesDescription}</small>
          <div class="pt-3">
            <b>Name:</b> ${parasite.name} <br />
            <b>Common name:</b> ${parasite.commonName} <br />
            <b>Definitive host:</b> ${parasite.definitiveHost} <br />
            ${parasite.PPP ? `<b>PPP:</b> ${parasite.PPP} <br />` : ""}
            ${
              parasite.location
                ? `<b>Location:</b> ${parasite.location} <br />`
                : ""
            }
            ${
              parasite.zoonotic
                ? `<b>Zoonotic:</b> ${parasite.zoonotic} <br />`
                : ""
            }
            ${
              parasite.lifeCycle
                ? `<b>Life Cycle:</b> ${parasite.lifeCycle} <br />`
                : ""
            }
            ${
              parasite.modeOfInfection
                ? `<b>Mode of infection:</b> 
                <ol>${parasite.modeOfInfection
                  .map((mode) => `<li>${mode}</li>`)
                  .join("")}</ol>`
                : ""
            }
            ${
              parasite.clinicalSigns
                ? `<b>Clinical:</b> ${parasite.clinicalSigns} <br />`
                : ""
            }
              ${
                parasite.diagnosis
                  ? `<b>Diagnosis:</b> ${parasite.diagnosis} <br />`
                  : ""
              }
              ${
                parasite.control
                  ? `<b>Control:</b> ${parasite.control} <br />`
                  : ""
              }
              ${
                parasite.additional
                  ? `<b>Additional:</b> ${parasite.additional} <br />`
                  : ""
              }
          </div>
          ${
            parasite.lifeCycleImage
              ? ` <img src="${parasite.lifeCycleImage}" class="img-fluid" alt="${parasite.name} Life Cycle" />`
              : ""
          }
        </div>
      </div>
    `;

  const container = card.querySelector(".card-image-container");
  const imgSrc = container.querySelector("img").src;
  container.style.setProperty("--blurred-background", `url(${imgSrc})`);
  return card;
}

// Render all parasites or filtered parasites
function endorenderParasites(parasites) {
  const endoparasiteContainer = document.getElementById(
    "endoparasiteContainer"
  );
  endoparasiteContainer.innerHTML = ""; // Clear previous content
  parasites.forEach((parasite) =>
    endoparasiteContainer.appendChild(createParasiteCard(parasite))
  );
}

// Apply Filters function
function applyEndoparasiteFilters() {
  const endoSpeciesFilter = document.getElementById("endoSpeciesFilter").value;
  const zoonoticFilter = document.getElementById("zoonoticFilter").value;

  const filteredParasites = endoparasitesData.filter((parasite) => {
    const matchesSpecies =
      endoSpeciesFilter === "all" ||
      parasite.species.includes(endoSpeciesFilter);
    const matchesZoonotic =
      zoonoticFilter === "all" || parasite.zoonotic === zoonoticFilter;
    return matchesSpecies && matchesZoonotic;
  });

  endorenderParasites(filteredParasites);
}

// Initial render of all parasites
endorenderParasites(endoparasitesData);

function resetEndoparasitesFilters() {
  // Reset the dropdown filters to 'all'
  document.getElementById("endoSpeciesFilter").value = "all";
  document.getElementById("zoonoticFilter").value = "all";

  // Re-apply the filters to show all items
  applyEndoparasiteFilters();
}

// Render all parasites or filtered parasites
function ectorenderParasites(parasites) {
  const ectoparasiteContainer = document.getElementById(
    "ectoparasitesContainer"
  );
  ectoparasiteContainer.innerHTML = ""; // Clear previous content
  parasites.forEach((parasite) =>
    ectoparasiteContainer.appendChild(createParasiteCard(parasite))
  );
}

// Apply Filters function
function applyEctoparasiteFilters() {
  const ectoSpeciesFilter = document.getElementById("ectoSpeciesFilter").value;

  const filteredParasites = ectoparasitesData.filter((parasite) => {
    console.log(parasite);
    const matchesSpecies =
      ectoSpeciesFilter === "all" ||
      parasite.species.includes(ectoSpeciesFilter);
    return matchesSpecies;
  });

  ectorenderParasites(filteredParasites);
}

// Initial render of all parasites
ectorenderParasites(ectoparasitesData);

function resetEctoparasitesFilters() {
  // Reset the dropdown filters to 'all'
  document.getElementById("ectoSpeciesFilter").value = "all";

  // Re-apply the filters to show all items
  applyEctoparasiteFilters();
}

// Scroll to Top functionality (debounced)
let scrollTimeout;
window.onscroll = function () {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const btn = document.getElementById("scrollToTopBtn");
    btn.style.display = window.scrollY > 20 ? "block" : "none";
  }, 100); // Debounce timeout
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Toggle details visibility using CSS class
function toggleDetails(card) {
  card.querySelector(".details").classList.toggle("d-block");
}
