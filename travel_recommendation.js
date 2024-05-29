function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    const btnSearch = document.getElementById('btnSearch');
    resultDiv.innerHTML = '';

    function createResultElement(imageUrl, name, description) {
        const container = document.createElement('div');
        container.style.border = '1px solid #e91e63'; // Pink border
        container.style.backgroundColor = '#e3f2fd'; // Light blue background
        container.style.borderRadius = '10px';
        container.style.padding = '15px';
        container.style.margin = '10px 0';
        container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        container.style.position = 'relative';

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = name;
        img.style.width = '100%';
        img.style.borderRadius = '10px';

        const title = document.createElement('h2');
        title.textContent = name;
        title.style.color = '#3f51b5'; // Dark blue text for title

        const desc = document.createElement('p');
        desc.textContent = description;
        desc.style.color = '#757575'; // Grey text for description

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.position = 'absolute';
        removeButton.style.top = '10px';
        removeButton.style.right = '10px';
        removeButton.style.padding = '5px 10px';
        removeButton.style.backgroundColor = '#e91e63'; // Pink background for button
        removeButton.style.color = '#fff';
        removeButton.style.border = 'none';
        removeButton.style.borderRadius = '5px';
        removeButton.style.cursor = 'pointer';
        removeButton.addEventListener('click', () => {
            container.remove();
            
        });

        container.appendChild(img);
        container.appendChild(title);
        container.appendChild(desc);
        container.appendChild(removeButton);

        return container;
    }


    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let found = false;

            
            data.countries.forEach(country => {
                if (country.name.toLowerCase() === input) {
                    found = true;
                    country.cities.forEach(city => {
                        const resultElement = createResultElement(city.imageUrl, city.name, city.description);
                        resultDiv.appendChild(resultElement);
                    });
                } else {
                    country.cities.forEach(city => {
                        if (city.name.toLowerCase().includes(input)) {
                            found = true;
                            const resultElement = createResultElement(city.imageUrl, city.name, city.description);
                            resultDiv.appendChild(resultElement);
                        }
                    });
                }
            });

            // Search through temples
            if (!found) {
                data.temples.forEach(temple => {
                    if (temple.name.toLowerCase().includes(input)) {
                        found = true;
                        const resultElement = createResultElement(temple.imageUrl, temple.name, temple.description);
                        resultDiv.appendChild(resultElement);
                    }
                });
            }

            // Search through beaches
            if (!found) {
                data.beaches.forEach(beach => {
                    if (beach.name.toLowerCase().includes(input)) {
                        found = true;
                        const resultElement = createResultElement(beach.imageUrl, beach.name, beach.description);
                        resultDiv.appendChild(resultElement);
                    }
                });
            }

            if (!found) {
                resultDiv.innerHTML = 'Condition not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

document.getElementById('btnSearch').addEventListener('click', searchCondition);

 
    