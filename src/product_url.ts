import inquirer from 'inquirer';
console.log("Welcome To ClI")


interface Product {
    id: number;
    title: string;
    description : string;
    price: number;
    rating : number ;
}
const res = await fetch('https://dummyjson.com/products')
const { products }: { products: Product[] } = await res.json();


let keepsearching = true;

while (keepsearching) {
    
    const answer = await  inquirer.prompt([
        {
            type: "list",
            name: "product_property",
            choices: ["Id", "Title" , "Description" , "Price", "Rating"],
            message: "Select the Product property to explore more ! "
        },
        {
            type: "input",
            name: "productID",
            message: "Enter the ID of Product, you want search for ! ",
            when: (answer) => answer.product_property === "Id"
        },
        {
            type: "input",
            name: "productTitle",
            message: "Enter the Title of Product, you want search for ! ",
            when: (answer) => answer.product_property === "Title"
        },
        {
            type: "input",
            name: "productDescription",
            message: "Enter the Description of Product, you want search for ! ",
            when: (answer) => answer.product_property === "Description"
        },
        {
            type: "input",
            name: "productPrice",
            message: "Enter the Price of Product, you want search for ! ",
            when: (answer) => answer.product_property === "Price"
        },
        {
            type: "input",
            name: "productRating",
            message: "Enter the Rating of Product, you want search for ! ",
            when: (answer) => answer.product_property === "Rating"
        }
    ])

    if (answer.product_property === "Id" && answer.productID){
        const searchId = products.find(products => products.id === Number(answer.productID));
        if (searchId) {
            console.log(`"Id: " ${searchId.id} , \n"Title: " ${searchId.title} , \n"Description: " ${searchId.description} , \n"Price: " ${searchId.price} , \n"Rating: " ${searchId.rating}`)
        }else {
            console.log("No product found with this ID")
        }
    }
    
    if (answer.product_property === "Title" && answer.productTitle)
        {const searchTitle = products.filter(products =>
        products.title.toLowerCase().includes(answer.productTitle.toLowerCase()))
        if (searchTitle.length > 0) {
            searchTitle.forEach(product => {
                console.log( `"Id: " ${product.id} , \n"Title: " ${product.title} , \n"Description: " ${product.description} , \n"Price: " ${product.price} , \n"Rating: " ${product.rating}`)
        })}
    }
    if (answer.product_property ===  "Description" && answer.productDescription){
        const searchDescription = products.filter(products =>
        products.description.toLowerCase().includes(answer.productDescription.toLowerCase()))
        if(searchDescription.length > 0){
            searchDescription.forEach(products =>{
                console.log( `"Id: " ${products.id} , \n"Title: " ${products.title} , \n"Description: " ${products.description} , \n"Price: " ${products.price} , \n"Rating: " ${products.rating}`)
            })
        }else{
            console.log("No product found with this Description")
        }
    }
    
    if (answer.product_property === "Price" && answer.productPrice){
        const searchPrice = products.filter(products =>
        products.price === Number(answer.productPrice))
        if(searchPrice.length > 0 ){
            searchPrice.forEach(products => {
                console.log(`"Id: " ${products.id} , \n"Title: " ${products.title} , \n"Description: " ${products.description} , \n"Price: " ${products.price} , \n"Rating: " ${products.rating}`)
            })
        }else{
            console.log("No product found with this Price")
        }
    }
    if (answer.product_property === "Rating" && answer.productRating){
        const searchRating = products.filter(products =>
        products.rating >= 4)
        if(searchRating.length > 0){
            searchRating.forEach(products =>{
                console.log(` "Id: " ${products.id} , \n"Title: " ${products.title} , \n"Description: " ${products.description} , \n"Price: " ${products.price} , \n"Rating: " ${products.rating} `)
            })
        }else{
            console.log("No product found with this Rating")
        }
    }
    const nextAction = await  inquirer.prompt([
        {
            type: "list",
            name : "continueOption",
            choices: ["Search Again" ,"Exit"],
            message: "Do you want to search again or exit?"
        }
    ])
    keepsearching = nextAction.continueOption ==="Search Again";
}

