const XLSX = require('c:/Users/ndjan/Downloads/medumba/node_modules/xlsx');
const wb   = XLSX.readFile('c:/Users/ndjan/Downloads/medumba/dico/Dictionnaire Ncobnkùn.xlsx');
const ws   = wb.Sheets['Feuil1'];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
function clean(raw) { return (raw+'').replace(/\s*\([^)]*\)/g,'').replace(/\s+/g,' ').trim(); }
const entries = rows.filter(r=>r[0]&&r[4]&&(r[0]+'').trim()!=='Mot')
    .map(r=>({ medumba: clean(r[0]), french: (r[4]+'').trim().toLowerCase() }));

const checks = ['blanc','bleu','vert','rouge','noir','jaune','orange','gris','rose','brun','violet',
                 'père','mère','frère','sœur','arbre','eau','feu','soleil','lune',
                 'chien','chat','poulet','singe','éléphant',
                 'tête','dos','cœur','ventre','dent','cheveux','cou',
                 'un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix'];
checks.forEach(kw => {
    const found = entries.filter(e => e.french === kw);
    if (found.length) {
        console.log(`"${kw}": ${found.length} → ${found.map(f=>f.medumba).join(' | ')}`);
    } else {
        const partial = entries.filter(e => e.french.includes(kw)).slice(0,2);
        console.log(`"${kw}": NOT FOUND | partial: ${partial.map(p=>'"'+p.french+'"').join(', ')}`);
    }
});
