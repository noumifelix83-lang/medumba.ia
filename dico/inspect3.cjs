const XLSX = require('c:/Users/ndjan/Downloads/medumba/node_modules/xlsx');
const wb   = XLSX.readFile('c:/Users/ndjan/Downloads/medumba/dico/Dictionnaire Ncobnkùn.xlsx');
const ws   = wb.Sheets['Feuil1'];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });

function cleanMedumba(raw) {
    return (raw + '').replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
}

const entries = rows
    .filter(r => r[0] && r[4] && (r[0] + '').trim() !== 'Mot')
    .map(r => ({ medumba: cleanMedumba(r[0]), french: (r[4] + '').trim().toLowerCase() }));

// Search for greeting-related words
const greetingSearch = ['bonjour','bonsoir','bonne','revoir','merci','bienvenue','salut','félicitation'];
greetingSearch.forEach(kw => {
    const found = entries.filter(e => e.french.includes(kw));
    console.log(`"${kw}": ${found.length} matches`);
    found.slice(0, 3).forEach(e => console.log(`   "${e.french}" → ${e.medumba}`));
});
