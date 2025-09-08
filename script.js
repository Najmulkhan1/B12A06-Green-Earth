const categoryContainer = document.getElementById('category')
const cardContainer = document.getElementById('card-container')
const detailsContainer = document.getElementById('details-container')
const detailsBox = document.getElementById("details-popUp")

let modifiedCategories = [] 

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
              class="px-2 hover:bg-green-600 hover:text-white mb-2 rounded-sm cursor-pointer ${isDefault}">
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

const loadTreesCategory = async (categoryId) => {
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
            <button class="btn rounded-3xl bg-green-700 border-none text-white font-normal shadow-none w-full h-8">
                Add to Cart
            </button>
        </div>
        `
        cardContainer.append(card)
    })
}

const loadPlantDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    console.log(url);
    const res =  await fetch(url)
    const details = await res.json()
    showPlantDetails(details.plants);
}

// {
//     "id": 29,
//     "image": "https://i.ibb.co.com/4g4J0Tkj/lotus-min.jpg",
//     "name": "Lotus",
//     "description": "A sacred aquatic plant with beautiful pink or white flowers. Symbolizes purity and grows in still, shallow water.",
//     "category": "Aquatic Plant",
//     "price": 450
// }

const showPlantDetails = (plants) => {
    console.log(plants);
    detailsBox.innerHTML = `
    <h1 class="font-bold text-lg ">${plants.name}</h1>
                                <div class="overflow-hidden h-[280px] rounded-lg my-4 ">
                                   <img class="w-full h-full object-cover" src="${plants.image}" alt=""> 
                                </div>
                                <div class="space-y-2">
                                    <h2> <span class="font-semibold">Category: </span>${plants.category}</h2>
                                <h2> <span class="font-semibold">Price: ৳</span>${plants.price}</h2>
                                <h2> <span class="font-semibold">Description:</span> ${plants.description}</h2>
                                </div>
    `

    document.getElementById("my_modal_5").showModal()
    
}

loadCategory()
