import fs from 'fs';

interface Product {
    id: number;
    name: string;
    price: number;
    discount_date : string ;
}

const data = fs.readFileSync('product_list.json' , 'utf-8')
const product: Product[] = JSON.parse(data)
const customDate = new Date('2025-01-10')


const outdated_discount_produc = product.filter( function (prod : Product ): 
    boolean {
        return new Date(prod.discount_date) < customDate});

console.log(outdated_discount_produc)


console.log(outdated_discount_produc.length)