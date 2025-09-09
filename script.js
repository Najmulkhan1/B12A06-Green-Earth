const categoryContainer = document.getElementById('category')
const cardContainer = document.getElementById('card-container')
const detailsContainer = document.getElementById('details-container')
const detailsBox = document.getElementById("details-popUp")
const cartContainer = document.getElementById("cart-container")
const totalContainer = document.getElementById("cart-total")   
let modifiedCategories = []
let cartItems = []

const loadCategory = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/categories')
        const data = await res.json()
        const categories = data.categories

        const allPlantF = await fetch(`https://openapi.programming-hero.com/api/plants`)
        const allPlant = await allPlantF.json()


        modifiedCategories = [
            { id: 'all-plant', category_name: "All Plant", data: allPlant.plants },
            ...categories
        ]

        showCategory(modifiedCategories)


        loadTreesCategory('all-plant')

    } catch (error) {
        console.log(error)
    }
}

const showCategory = (categories) => {
    categoryContainer.innerHTML = ''

    categories.forEach(cat => {
        const isDefault = cat.id === 'all-plant' ? 'bg-green-600 text-white' : ''
        const li = document.createElement('li')

        li.innerHTML = `
          <li id="${cat.id}" 
              class="px-2 py-1 hover:bg-green-600 hover:text-white mb-2 rounded-sm cursor-pointer ${isDefault}">
              ${cat.category_name}
          </li>
        `
        categoryContainer.append(li)
    });

    categoryContainer.addEventListener('click', (e) => {
        const allLi = document.querySelectorAll('#category li')
        allLi.forEach(li => {
            li.classList.remove('bg-green-600', 'text-white')
        })

        if (e.target.localName === 'li') {
            e.target.classList.add('bg-green-600', 'text-white')
            loadTreesCategory(e.target.id)
        }
    })
}

const manageSniper = (status) => {
    if (status === true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('card-container').classList.add('hidden')
    } else {
        document.getElementById("card-container").classList.remove('hidden')
        document.getElementById('spinner').classList.add('hidden')
    }
}

const loadTreesCategory = async (categoryId) => {
    manageSniper(true)
    if (categoryId === 'all-plant') {

        const allPlantCat = modifiedCategories.find(c => c.id === 'all-plant')
        showTreeByCategory(allPlantCat.data)
    } else {
        try {

            const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
            const data = await res.json()
            showTreeByCategory(data.plants)
        } catch (error) {
            console.log(error)
        }
    }
}


const showTreeByCategory = (plants) => {
    cardContainer.innerHTML = ''
    plants.forEach((plant) => {
        const card = document.createElement('div')
        card.innerHTML = `
        <div class="bg-white p-4 space-y-3 rounded-sm">
            <div class="bg-gray-400 overflow-hidden h-[286px] rounded-sm">
                <img class="w-full h-full object-cover" src="${plant.image}" alt="">
            </div>
            <button onclick="loadPlantDetails(${plant.id})" class="font-semibold cursor-pointer">${plant.name}</button>
            <p class="text-[13px] text-gray-600 line-clamp-2">${plant.description}</p>
            <div class="flex justify-between">
                <span class="btn rounded-3xl bg-green-100 border-none text-green-800 font-semibold shadow-none h-6 px-2">
                    ${plant.category}
                </span>
                <h2 class="font-semibold"> ৳ <span>${plant.price}</span></h2>
            </div>
            <button onclick="loadCardItems(${plant.id})" class="btn rounded-3xl bg-green-700 border-none text-white font-normal shadow-none w-full h-8 hover:bg-green-900">
                Add to Cart
            </button>
        </div>
        `
        cardContainer.append(card)

        manageSniper(false)
    })
}

const loadPlantDetails = async (id) => {

    try {
        const url = `https://openapi.programming-hero.com/api/plant/${id}`

        const res = await fetch(url)
        const details = await res.json()
        console.log(details.plants);

        showPlantDetails(details.plants);
    } catch (error) {
        console.log(error);

    }



}

const showPlantDetails = (plant) => {
    console.log(plant);
    detailsBox.innerHTML = `
    <h1 class="font-bold text-lg ">${plant.name}</h1>
                                <div class="overflow-hidden h-[280px] rounded-lg my-4 ">
                                   <img class="w-full h-full object-cover" src="${plant.image}" alt=""> 
                                </div>
                                <div class="space-y-2">
                                    <h2> <span class="font-semibold">Category: </span>${plant.category}</h2>
                                <h2> <span class="font-semibold">Price: ৳</span>${plant.price}</h2>
                                <h2> <span class="font-semibold">Description:</span> ${plant.description}</h2>
                                </div>
    `

    document.getElementById("my_modal_5").showModal()
    

}

const loadCardItems = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`

    const res = await fetch(url)
    const details = await res.json()
    showCartItems(details.plants)
}


const showCartItems = (cartD) => {
    cartItems.push(cartD);

    const div = document.createElement('div')
    div.innerHTML = ` 
        <div class="bg-green-200 min-h-[20px] p-2 flex justify-between items-center rounded-lg px-3 mb-2">
            <div>
                <h2 class="text-[16px]">${cartD.name}</h2>
                <p class="text-[16px] font-semibold">৳${cartD.price}</p>
            </div>
            <button onclick='removeCard(this, ${cartItems.length-1}), alart()'  class='cursor-pointer text-red-600'>
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>`;

    cartContainer.appendChild(div);
    alert(cartD.name + 'has been added to the cart')

    updateTotalPrice();

    
}

const removeCard = (btn, index) => {
    const card = btn.parentElement; 
    card.remove();

    cartItems.splice(index, 1);

    updateTotalPrice();
}


const updateTotalPrice = () => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    console.log("Total Price:", totalPrice);

  
    const totalElement = document.getElementById('cart-total');
    if(totalElement){
        totalElement.innerHTML = `
         <h2>Total:</h2>
                       <p> ৳<span>${totalPrice}</span></p>
        `;
    }

    
}


loadCategory()
