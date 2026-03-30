const XLSX = require('c:/Users/ndjan/Downloads/medumba/node_modules/xlsx');
const wb = XLSX.readFile('c:/Users/ndjan/Downloads/medumba/dico/Dictionnaire Ncobnkùn.xlsx');
wb.SheetNames.forEach(name => {
    const ws = wb.Sheets[name];
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
    const valid = rows.filter(r => r[0] && r[4] && r[0] !== 'Mot');
    console.log('Sheet:', name, '-> valid rows:', valid.length);
    valid.slice(0, 3).forEach(r => console.log('  A:', r[0], ' | E:', r[4]));
});
