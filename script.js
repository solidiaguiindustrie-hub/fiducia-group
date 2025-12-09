// --- Helpers ---
const YEAR_EL = document.getElementById('year');
if (YEAR_EL) YEAR_EL.textContent = new Date().getFullYear();

// --- Configuration des heures d'ouverture ---
const OPENING_HOURS = {
  1: { start: '08:00', end: '19:00' }, // Lundi
  2: { start: '08:00', end: '19:00' }, // Mardi
  3: { start: '08:00', end: '19:00' }, // Mercredi
  4: { start: '08:00', end: '19:00' }, // Jeudi
  5: { start: '08:00', end: '19:00' }, // Vendredi
  6: { start: '09:00', end: '17:00' }, // Samedi
  0: null                                 // Dimanche
};

function isOpen(now = new Date()){
  const d = now.getDay();
  const conf = OPENING_HOURS[d];
  if (!conf) return false;
  const [sh, sm] = conf.start.split(':').map(Number);
  const [eh, em] = conf.end.split(':').map(Number);
  const start = new Date(now); start.setHours(sh, sm, 0, 0);
  const end   = new Date(now); end.setHours(eh, em, 0, 0);
  return now >= start && now <= end;
}

function updateStatus(){
  const el = document.getElementById('status');
  if (!el) return;
  if (isOpen()){
    el.textContent = '✅ Ouvert';
    el.style.background = 'rgba(31,191,91,.09)';
    el.style.color = '#66d28f';
    el.style.borderColor = 'rgba(31,191,91,.35)';
  } else {
    el.textContent = '❌ Fermé';
    el.style.background = 'rgba(255,86,86,.10)';
    el.style.color = '#ffb3b3';
    el.style.borderColor = 'rgba(255,86,86,.28)';
  }
}
updateStatus();

// --- vCard (VCF) ---
const VCF = `BEGIN:VCARD
VERSION:3.0
N:Prenom;Nom;;;
FN:Nom Prénom
ORG:FIDUCIA GROUP
TITLE:Fonction / Métier
TEL;TYPE=CELL:+224629143737
EMAIL:abmansare@fiducia-group.fr
ADR;TYPE=WORK:FIDUCIA GROUP 
END:VCARD`;

function downloadVCF(){
  const blob = new Blob([VCF], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'contact.vcf'; a.click();
  URL.revokeObjectURL(url);
}

function shareCard(){
  if (navigator.share){
    navigator.share({ title:'FIDUCIA GROUP', text:'Carte de visite numérique', url:window.location.href })
      .catch(()=>{});
  } else {
    alert("Votre navigateur ne prend pas en charge la fonction de partage.");
  }
}

function generateQR(){
  const holder = document.getElementById('qrcode');
  const section = document.getElementById('qrSection');
  if (!holder || !section) return;
  holder.innerHTML = '';
  new QRCode(holder, { text: VCF, width: 180, height: 180, correctLevel: QRCode.CorrectLevel.H });
  section.classList.remove('hidden');
}

function hideQR(){
  const section = document.getElementById('qrSection');
  if (section) section.classList.add('hidden');
}


// --- CODE AJUSTÉ POUR L'ANIMATION DU CARROUSEL ---
const slider = document.getElementById('imageSlider');
if (slider) {
    const images = slider.querySelectorAll('.cover-img');
    const totalImages = images.length;
    let currentIndex = 0;
    const slideDuration = 5000; // 5 secondes
    
    // Fonction pour faire défiler les images
    function slideImages() {
        currentIndex = (currentIndex + 1) % totalImages;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    // Démarrer le carrousel
    setInterval(slideImages, slideDuration);
}


// --- GESTION DU GÉNÉRIQUE DE LOGO AU CHARGEMENT ---
window.addEventListener('load', () => {
  const splashScreen = document.getElementById('splashScreen');
  if (splashScreen) {
    // Laisse le spinner tourner pendant 3 secondes (3000ms) avant de commencer la disparition
    setTimeout(() => {
      splashScreen.classList.add('fade-out');
      splashScreen.addEventListener('transitionend', () => {
        splashScreen.remove();
      });
    }, 200); // Durée pendant laquelle le spinner est visible avant la disparition
  }
});

// --- Code de Parallaxe ---
// Le code est ajouté dans la partie DOMContentLoaded de votre script.js
document.addEventListener('DOMContentLoaded', () => {
    // ... votre code existant ici ...

    // Effet Parallax pour l'arrière-plan du body
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        // La vitesse de défilement de l'arrière-plan (0.5 signifie moitié moins vite que le contenu)
        const parallaxSpeed = 0.5; 
        document.body.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
    });
});