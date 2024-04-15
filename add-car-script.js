const form = document.getElementById("add-car-form");

async function submitForm(event) {
    event.preventDefault();
    const items = document.querySelectorAll(".form-input")
    const payload = {}
    for (const item of items) {
        if (item.value.trim() === "") {
            return;
        }
        payload[item.id] = item.value;
    }

    const response = await $.ajax("http://localhost/test-api/api/insert.php", {data: payload, method: "POST"});

    alert(response.response_desc);
    window.location.href = "http://localhost/test-front/index.html";
}


form.addEventListener("submit", submitForm);