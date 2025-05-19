import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import url from 'url'


const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



interface Product {
    id: number;
    name: string;
    price: number;
    discount_date : string ;
}

const data = fs.readFileSync(path.join(__dirname , 'products_list.json') , 'utf-8')
const product: Product[] = JSON.parse(data)

console.log("Welcome to the Store!! ")

let keepsearching = true;

while (keepsearching ){
    const answer = await  inquirer.prompt([
    {
        type: "input",
        name: "productName",
        message: "Enter the name of Product, you want search for ! "
    }
])
    const searchItem = product.filter(product => 
    product.name.toLowerCase().includes(answer.productName.toLowerCase())
    )   
    if (searchItem.length > 0) {
        console.log( "Hello , here are matching Products:")
        searchItem.forEach(product => {
            console.log( `"id:" , ${product.id}, \n"name:" , ${product.name}, \n"price:" , ${product.price}, \n"discounted_date:" , ${product.discount_date}`)
        });
    keepsearching = false;
    }else {
        console.log("No product found")
    } 
}
