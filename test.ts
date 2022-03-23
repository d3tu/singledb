import Database from './index';

console.time('start');
const db = new Database('package.json');
console.timeEnd('start');

console.time('set');
db.key = 'value';
console.timeEnd('set');

console.time('get');
db.key;
console.timeEnd('get');

console.time('delete');
delete db.key;
console.timeEnd('delete');
