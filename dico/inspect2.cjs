const XLSX = require('c:/Users/ndjan/Downloads/medumba/node_modules/xlsx');
const wb = XLSX.readFile('c:/Users/ndjan/Downloads/medumba/dico/Dictionnaire Ncobnkùn.xlsx');
const ws = wb.Sheets['Feuil1'];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
const valid = rows.filter(r => r[0] && r[4] && r[0] !== 'Mot');

// Show first letter distribution of French translations
const letterCount = {};
valid.forEach(r => {
    const letter = (r[4] + '').trim()[0]?.toUpperCase();
    letterCount[letter] = (letterCount[letter] || 0) + 1;
});
console.log('French word first-letter distribution:');
Object.entries(letterCount).sort().forEach(([l, c]) => console.log(' ', l, ':', c));

// Show 5 sample entries spread across the dictionary
console.log('\nSample entries (every 500 rows):');
[0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000].forEach(i => {
    if (valid[i]) console.log(i, '| Medumba:', valid[i][0], '| FR:', valid[i][4]);
});
