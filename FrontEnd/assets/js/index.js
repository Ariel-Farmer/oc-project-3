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

// run display Data
displayData();
