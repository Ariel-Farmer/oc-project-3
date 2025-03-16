console.log("Hello World");
async function fetchData() {
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
	const data = await fetchData();
	const gallery = document.getElementById("gallery");
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

async function displayCategories() {
	const categories = await getCategories();
	if (!categories) return;

	const filterContainer = document.querySelector(".filter-container");
	if (!filterContainer) {
		console.error("Filter container not found in the DOM!");
		return;
	}
	categories.forEach(function (category) {
		const button = document.createElement("button");
		button.textContent = category.name;
		button.classList.add("category-button");
		button.dataset.id = category.id;
		filterContainer.appendChild(button);
	});
}

displayCategories();

// run display Data
displayData();
