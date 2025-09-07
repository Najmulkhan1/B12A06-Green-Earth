

const categoryContainer = document.getElementById('category')
const cardContainer = document.getElementById('card-container')

const loadCategory = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/categories')
        const data = await res.json()
        const categories = data.categories
        showCategory(categories);

    } catch (error) {
        console.log(error);

    }
}

const showCategory = (categories) => {

    categories.forEach(cat => {

        // categoryContainer.innerHTML += `<li class="px-2 hover:bg-green-600 hover:text-white mb-2 rounded-sm list-none">${cat.category_name}</li>

        // `

        const li = document.createElement('li')

        li.innerHTML = `<li id="${cat.id}" class="px-2 hover:bg-green-600 hover:text-white mb-2 rounded-sm cursor-pointer">${cat.category_name}</li>`



        categoryContainer.append(li)
    });

    categoryContainer.addEventListener('click', (e) => {
        const allLi = document.querySelectorAll('li')

        allLi.forEach(li => {
            li.classList.remove('bg-green-600', 'text-white')
        })

        if (e.target.localName === 'li') {
            console.log(e.target.id);
            e.target.classList.add('bg-green-600', 'text-white')
            loadTreesCategory(e.target.id)
        }
    })

}

const loadTreesCategory = async (categoryId) => {
    console.log(categoryId);

    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
        const data = await res.json()
        showTreeByCategory(data.plants);

    } catch (error) {
        console.log(error);

    }
}

const showTreeByCategory = (plant) => {
    console.log(plant);

    cardContainer.innerHTML = ''

    plant.forEach((plants) => {

        console.log(plants.category);
        
        const card = document.createElement('div')


        // "Evergreen Tree"

        card.innerHTML = `
        <div class="bg-white p-4 space-y-3 rounded-sm">
                        <div class="bg-gray-400 overflow-hidden h-[286px] rounded-sm">
                            <img class=" w-full h-full object-cover" src="${plants.image}" alt="">
                        </div>
                        <h2 class="font-semibold">${plants.name}</h2>
                        <p class="text-[13px] text-gray-600">${plants.description}</p>

                        <div class="flex justify-between">
                            <span
                                class="btn rounded-3xl bg-green-100 border-none text-green-800 font-semibold shadow-none h-6 px-2">
                                ${plants.category}
                            </span>
                            <h2 class="font-semibold">$ <span>${plants.price}</span></h2>
                        </div>
                        <button
                            class="btn rounded-3xl bg-green-700 border-none text-white font-normal shadow-none w-full h-8">
                            Add to Cart
                        </button>
        </div>
    `

    cardContainer.append(card)
    })
    

}


loadCategory()