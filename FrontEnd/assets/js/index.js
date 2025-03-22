console.log("Hello World");
async function fetchData() {
	//fetch works data from api and return it for use elsewhere
	try {
		const response = await fetch("http://localhost:5678/api/works");

		const data = await response.json();
		console.log(data);

		return data;
	} catch (error) {
		console.log("ERROR!");
	}
}

async function displayData() {
	//retrieving data from API and waiting until retrieved to run function (array of objects)
	const data = await fetchData();
	const gallery = document.getElementById("gallery");
	//creating elements for each work and putting them on the page
	data.forEach(function (work) {
		const figure = document.createElement("figure");
		const figcaption = document.createElement("figcaption");
		figcaption.textContent = work.title;
		const img = document.createElement("img");
		img.src = work.imageUrl;
		img.alt = work.title;
		figure.appendChild(img);
		figure.appendChild(figcaption);
		gallery.appendChild(figure);
	});
}

async function getCategories() {
	//fetch categories data from api and return it for use elsewhere
	try {
		const response = await fetch("http://localhost:5678/api/categories");
		if (!response.ok) {
			throw new Error("Network response error!");
		}
		const categories = await response.json();
		return categories;
	} catch (error) {
		console.error("Error fetching categories:", error);
	}
}
//fetch works from api and return for use
async function getItems() {
	try {
		const response = await fetch("http://localhost:5678/api/works");
		if (!response.ok) {
			throw new Error("Network response error!");
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching items:", error);
	}
}
async function displayCategoriesAndItems() {
	//get categories from API before running the rest of function (it'll be an array of objects)
	const [categories, items] = await Promise.all([
		getCategories(),
		getItems(),
	]);
	if (!categories || !items) return;

	//creating a variable to house the buttons
	const filterContainer = document.querySelector(".filter-container");
	if (!filterContainer) {
		console.error("Filter container not found in the DOM!");
		return;
	}

	//create the "All" button
	const allButton = document.createElement("button");
	allButton.textContent = "All";
	allButton.classList.add("category-button");
	allButton.dataset.id = "all";
	filterContainer.appendChild(allButton);

	//looping through categories and creating a button for each category in API data
	categories.forEach(function (category) {
		const button = document.createElement("button");
		button.textContent = category.name;
		button.classList.add("category-button");
		button.dataset.id = category.id;
		filterContainer.appendChild(button);
	});

	//apply click feature to all the buttons individually and log clicks //select category buttons after created and attach event-listeners
	const buttons = document.querySelectorAll(".category-button");

	//adds a click event to buttons, triggering the filterItems function with the button's ID.
	buttons.forEach(function (button) {
		button.addEventListener("click", function () {
			const categoryId = button.dataset.id;
			filterItems(categoryId, items);
		});
	});

	// filters items based on a category ID and displays the filtered results
	function filterItems(categoryId, items) {
		const filteredItems =
			categoryId === "all"
				? items
				: items.filter(
						(item) => item.categoryId === parseInt(categoryId)
				  );
		displayItems(filteredItems);
	}

	// creates and displays HTML elements for each item in the provided array within a gallery container
	function displayItems(itemsToDisplay) {
		const itemsContainer = document.querySelector(".gallery");
		itemsContainer.innerHTML = "";
		itemsToDisplay.forEach((item) => {
			const figure = document.createElement("figure");
			const img = document.createElement("img");
			img.src = item.imageUrl;
			img.alt = item.title;
			const figcaption = document.createElement("figcaption");
			figcaption.textContent = item.title;
			figure.appendChild(img);
			figure.appendChild(figcaption);
			itemsContainer.appendChild(figure);
		});
	}
	displayItems(items);
}
displayCategoriesAndItems();
