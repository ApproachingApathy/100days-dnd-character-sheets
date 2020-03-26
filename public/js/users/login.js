$(document).ready(() => {
	document
		.getElementById("signup-password")
		.setCustomValidity(
			"Include 1 lowercase, 1 uppercase, and 1 number.\n Minimum 8 characters, maximum 40 characters."
		);

	$("form").on("submit", e => {
		e.preventDefault();
		const $form = $(e.target);
		fetch($form.prop("action"), {
			method: "POST",
			credentials: "same-origin",
			redirect: "follow",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: $form.serialize()
		})
			.then(response => {
				if (response.redirected) {
					window.location.href = response.url;
				} else {
					return response.json();
				}
			})
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				console.log(err);
			});
	});
});
