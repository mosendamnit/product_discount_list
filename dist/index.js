import fs from 'fs';
const data = fs.readFileSync('product_list.json', 'utf-8');
const product = JSON.parse(data);
const customDate = new Date('2025-01-10');
const outdated_discount_produc = product.filter(function (prod) {
    return new Date(prod.discount_date) < customDate;
});
console.log(outdated_discount_produc);
console.log(outdated_discount_produc.length);
