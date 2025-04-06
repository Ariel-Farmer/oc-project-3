document.addEventListener("DOMContentLoaded", function () {
	const form = document.querySelector("form");
	form.addEventListener("submit", loginUser);
});

async function loginUser(event) {
	//
	event.preventDefault();
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const loginData = {
		"email": email.value,
		"password": password.value,
	};

	try {
		// use fetch API to send Post request to log user in
		const response = await fetch("http://localhost:5678/api/users/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginData),
		});

		if (!response.ok) {
			alert("!Incorrect Login Credentials!");
		} else {
			const data = await response.json();
			console.log("Response Data:", data);
			const token = data.token;

			localStorage.setItem("token", token);
			// const userId = data.userId;
			// localStorage.setItem("userId", userId);
			window.location.href = "index.html";

			console.log("Login successful!", data);
		}
	} catch (error) {
		console.error("Login error:", error.message);
		// const errorMessageElement = document.getElementById("error-message");
	}
}
