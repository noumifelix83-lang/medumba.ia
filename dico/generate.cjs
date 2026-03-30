/**
 * generate.cjs — v2
 * Reads Dictionnaire Ncobnkùn.xlsx (cols A=Medumba, E=French),
 * builds thematic lesson sets from verified dictionary matches,
 * and writes src/data/medumbaDictionary.js
 */

const XLSX = require('c:/Users/ndjan/Downloads/medumba/node_modules/xlsx');
const fs   = require('fs');
const path = require('path');

// ── 1. Load ────────────────────────────────────────────────────────
const wb   = XLSX.readFile('c:/Users/ndjan/Downloads/medumba/dico/Dictionnaire Ncobnkùn.xlsx');
const ws   = wb.Sheets['Feuil1'];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });

function cleanMedumba(raw) {
    return (raw + '')
        .replace(/\s*\([^)]*\)/g, '')
        .replace(/\s*;[^;]*/g, '')   // strip "Bà; mèba" → "Bà"
        .replace(/\s+/g, ' ')
        .trim();
}

const entries = rows
    .filter(r => r[0] && r[4] && (r[0] + '').trim() !== 'Mot')
    .map(r => ({
        medumba: cleanMedumba(r[0]),
        french:  (r[4] + '').trim().toLowerCase(),
    }))
    .filter(e => e.medumba && e.french);

console.log('Total clean entries:', entries.length);

// ── 2. Lookup helpers ──────────────────────────────────────────────
// exact match → first Medumba word found
function exact(frenchWord) {
    const e = entries.find(e => e.french === frenchWord.toLowerCase());
    return e ? e.medumba : null;
}
// partial match → first Medumba word found
function partial(keyword) {
    const e = entries.find(e => e.french.includes(keyword.toLowerCase()));
    return e ? { medumba: e.medumba, french: e.french } : null;
}

// ── 3. Theme vocabulary (FR → EN + Medumba lookup) ────────────────
//    Each entry: { fr, en, medumba? (will be resolved) }
const RAW_THEMES = {
    l1: {
        titleFr: 'Salutations', titleEn: 'Greetings',
        words: [
            { fr: 'Salut',         en: 'Hi',        lookup: exact('salut') },
            { fr: 'Salutation',    en: 'Greeting',   lookup: exact('salutation') },
            { fr: 'Oui',           en: 'Yes',        lookup: exact('oui') },
            { fr: 'Non',           en: 'No',         lookup: exact('non') },
            { fr: 'Pardon',        en: 'Pardon',     lookup: exact('pardon') },
            { fr: 'Remercier',     en: 'To thank',   lookup: exact('remercier') },
        ],
    },
    l2: {
        titleFr: 'Corps humain', titleEn: 'Human Body',
        words: [
            { fr: 'Main',      en: 'Hand',    lookup: exact('main') },
            { fr: 'Pied',      en: 'Foot',    lookup: exact('pied') },
            { fr: 'Nez',       en: 'Nose',    lookup: exact('nez') },
            { fr: 'Œil',       en: 'Eye',     lookup: exact('œil') },
            { fr: 'Oreille',   en: 'Ear',     lookup: exact('oreille') },
            { fr: 'Dos',       en: 'Back',    lookup: exact('dos') },
            { fr: 'Cou',       en: 'Neck',    lookup: exact('cou') },
            { fr: 'Dent',      en: 'Tooth',   lookup: exact('dent') },
            { fr: 'Cheveux',   en: 'Hair',    lookup: exact('cheveux') },
            { fr: 'Cœur',      en: 'Heart',   lookup: exact('cœur') },
        ],
    },
    l3: {
        titleFr: 'Nourriture', titleEn: 'Food',
        words: [
            { fr: 'Eau',       en: 'Water',   lookup: exact('eau') },
            { fr: 'Viande',    en: 'Meat',    lookup: exact('viande') },
            { fr: 'Poisson',   en: 'Fish',    lookup: exact('poisson') },
            { fr: 'Sel',       en: 'Salt',    lookup: exact('sel') },
            { fr: 'Sucre',     en: 'Sugar',   lookup: exact('sucre') },
            { fr: 'Riz',       en: 'Rice',    lookup: exact('riz') },
            { fr: 'Banane',    en: 'Banana',  lookup: exact('banane') },
            { fr: 'Maïs',      en: 'Corn',    lookup: exact('maïs') },
        ],
    },
    l4: {
        titleFr: 'Couleurs', titleEn: 'Colors',
        words: [
            { fr: 'Noir',      en: 'Black',   lookup: exact('noir') },
            { fr: 'Rouge',     en: 'Red',     lookup: exact('rouge') },
            { fr: 'Jaune',     en: 'Yellow',  lookup: exact('jaune') },
            { fr: 'Blanc',     en: 'White',   lookup: (partial('tacheté de blanc') || {}).medumba || null },
            { fr: 'Vert',      en: 'Green',   lookup: (partial('vert foncé') || partial('couleur verte') || {}).medumba || null },
        ],
    },
    l5: {
        titleFr: 'Chiffres', titleEn: 'Numbers',
        words: [
            { fr: 'Deux',      en: 'Two',     lookup: exact('deux') },
            { fr: 'Trois',     en: 'Three',   lookup: exact('trois') },
            { fr: 'Quatre',    en: 'Four',    lookup: exact('quatre') },
            { fr: 'Cinq',      en: 'Five',    lookup: exact('cinq') },
            { fr: 'Six',       en: 'Six',     lookup: exact('six') },
            { fr: 'Sept',      en: 'Seven',   lookup: exact('sept') },
            { fr: 'Huit',      en: 'Eight',   lookup: exact('huit') },
            { fr: 'Neuf',      en: 'Nine',    lookup: exact('neuf') },
            { fr: 'Dix',       en: 'Ten',     lookup: exact('dix') },
            { fr: 'Mille',     en: 'Thousand',lookup: exact('mille') },
        ],
    },
    l6: {
        titleFr: 'Animaux', titleEn: 'Animals',
        words: [
            { fr: 'Chien',     en: 'Dog',     lookup: exact('chien') },
            { fr: 'Chat',      en: 'Cat',     lookup: exact('chat') },
            { fr: 'Vache',     en: 'Cow',     lookup: exact('vache') },
            { fr: 'Mouton',    en: 'Sheep',   lookup: exact('mouton') },
            { fr: 'Oiseau',    en: 'Bird',    lookup: exact('oiseau') },
            { fr: 'Serpent',   en: 'Snake',   lookup: exact('serpent') },
            { fr: 'Lion',      en: 'Lion',    lookup: exact('lion') },
        ],
    },
    l7: {
        titleFr: 'Famille', titleEn: 'Family',
        words: [
            { fr: 'Sœur',      en: 'Sister',  lookup: exact('sœur') },
            { fr: 'Mari',      en: 'Husband', lookup: exact('mari') },
            { fr: 'Femme',     en: 'Wife',    lookup: exact('femme') },
            { fr: 'Enfant',    en: 'Child',   lookup: exact('enfant') },
            { fr: 'Fille',     en: 'Girl',    lookup: exact('fille') },
            { fr: 'Fils',      en: 'Son',     lookup: exact('fils') },
            { fr: 'Cousin',    en: 'Cousin',  lookup: exact('cousin') },
            { fr: 'Beau-frère',en: 'Brother-in-law', lookup: exact('beau-frère') },
        ],
    },
    l8: {
        titleFr: 'Nature', titleEn: 'Nature',
        words: [
            { fr: 'Soleil',    en: 'Sun',      lookup: exact('soleil') },
            { fr: 'Lune',      en: 'Moon',     lookup: exact('lune') },
            { fr: 'Feu',       en: 'Fire',     lookup: exact('feu') },
            { fr: 'Eau',       en: 'Water',    lookup: exact('eau') },
            { fr: 'Pluie',     en: 'Rain',     lookup: exact('pluie') },
            { fr: 'Vent',      en: 'Wind',     lookup: exact('vent') },
            { fr: 'Pierre',    en: 'Stone',    lookup: exact('pierre') },
            { fr: 'Montagne',  en: 'Mountain', lookup: exact('montagne') },
        ],
    },
    l9: {
        titleFr: 'Temps', titleEn: 'Time',
        words: [
            { fr: 'Jour',      en: 'Day',       lookup: exact('jour') },
            { fr: 'Nuit',      en: 'Night',     lookup: exact('nuit') },
            { fr: 'Matin',     en: 'Morning',   lookup: exact('matin') },
            { fr: 'Soir',      en: 'Evening',   lookup: exact('soir') },
            { fr: 'Semaine',   en: 'Week',      lookup: exact('semaine') },
            { fr: 'Mois',      en: 'Month',     lookup: exact('mois') },
            { fr: 'Année',     en: 'Year',      lookup: exact('année') },
            { fr: 'Heure',     en: 'Hour',      lookup: exact('heure') },
        ],
    },
};

// ── 4. Build exercises ─────────────────────────────────────────────
// distractor pool: random Medumba words of similar length
const allMedumba = [...new Set(entries.map(e => e.medumba).filter(m => m.length > 1))];

function pickDistractors(correct, count = 5) {
    return allMedumba
        .filter(m => m !== correct)
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
}

const QUESTIONS = {};
const THEMES_META = {};

Object.entries(RAW_THEMES).forEach(([id, theme]) => {
    const valid = theme.words.filter(w => w.lookup);
    if (valid.length === 0) {
        console.log(`${id} (${theme.titleEn}): NO MATCHES — skipping`);
        return;
    }

    THEMES_META[id] = { titleFr: theme.titleFr, titleEn: theme.titleEn };

    QUESTIONS[id] = valid.map(w => {
        const distractors = pickDistractors(w.lookup, 5);
        const bank = [w.lookup, ...distractors].sort(() => Math.random() - 0.5);
        return {
            sourceFr: w.fr,
            sourceEn: w.en,
            answer:   [w.lookup],
            bank,
            audio:    w.lookup,
        };
    });

    console.log(`${id} (${theme.titleEn}): ${valid.length} exercises`);
    valid.forEach(w => console.log(`   ${w.fr} → ${w.lookup}`));
});

// ── 5. Full dictionary export ──────────────────────────────────────
const DICTIONARY = entries.map(e => ({
    medumba: e.medumba,
    french:  e.french.charAt(0).toUpperCase() + e.french.slice(1),
}));

// ── 6. Write file ──────────────────────────────────────────────────
const outPath = path.resolve('c:/Users/ndjan/Downloads/medumba/src/data/medumbaDictionary.js');
fs.mkdirSync(path.dirname(outPath), { recursive: true });

const output = `/* ════════════════════════════════════════════════════════════════
   medumbaDictionary.js
   Auto-generated from Dictionnaire Ncobnkùn.xlsx
   ${entries.length} total entries — columns A (Medumba) & E (French)
════════════════════════════════════════════════════════════════ */

/* Lesson theme metadata */
export const THEMES_META = ${JSON.stringify(THEMES_META, null, 2)};

/* Thematic lesson questions — imported by LessonPage */
export const MEDUMBA_QUESTIONS = ${JSON.stringify(QUESTIONS, null, 2)};

/* Full vocabulary list (4000+ entries) for dictionary/search views */
export const DICTIONARY = ${JSON.stringify(DICTIONARY, null, 2)};
`;

fs.writeFileSync(outPath, output, 'utf8');
console.log('\nWrote:', outPath);
console.log('Total lesson sets:', Object.keys(QUESTIONS).length);
console.log('Total dictionary entries:', DICTIONARY.length);
