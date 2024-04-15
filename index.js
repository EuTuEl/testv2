const postList = document.querySelector("#post-list");


getCars()

async function getCars() {
    try {
        let response = await $.ajax("http://localhost/test-api/api/get.php", {data: "", method: "GET"});
        response = response.data;
        displayTable(response);
    } catch (e) {
        console.log(e);
    }
}

function displayTable(cars) {
    if (!cars) {
        postList.style = "display: none";
        postList.firstElementChild.innerText = "No cars available";
        return;
    }

    for (const car of cars) {
        const postItem = document.createElement("div");
        postItem.className = "post-item";
        postItem.id = car.id

        car.image = (car.image) ? car.image : "assets/images/default.png";

        postItem.innerHTML = `    
            <img src="${car.image}" alt="Car image"/>
            <h2>${car.brand} ${car.model} </h2>
            <p>${car.year} * ${car.power}hp * ${car.engine}<sup>3</sup> * ${car.fuel}</p>
            <h2 class="price-h2">${car.price} &#8364</h2>
        `;
        postList.appendChild(postItem);
    }
}

// <div className="post-item">
//     <img src="assets/images/g30.jpg" alt="assets/images/g30.jpg"/>
//     <h2>BMW G30 </h2>
//     <p>2019 * 190hp * 2000cm<sup>3</sup> * diesel</p>
//     <h2 className="price-h2">30000 &#8364</h2>
// </div>

function postClickHandler(event) {
    if (event.target.id === "post-list") return;
    console.log(event.target.closest(".post-item"));
    window.location.href += `/?id=${event.target.closest(".post-item").id}`;
}

postList.addEventListener("click", postClickHandler)