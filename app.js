const data = {
    elementId: 'testimonialsEl',
    content: [
        {
            text:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ut nulla atque autem explicabo animi cupiditate minus accusantium officia dignissimos, consectetur, numquam error laboriosam est facilis temporibus itaque ad vero.",
            stars: 5
        },
        {
            text:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ut nulla atque autem explicabo animi cupiditate minus accusantium officia dignissimos, consectetur, numquam error laboriosam est facilis temporibus itaque ad vero.",
            stars: 3
        },
        {
            text:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ut nulla atque autem explicabo animi cupiditate minus accusantium officia dignissimos, consectetur, numquam error laboriosam est facilis temporibus itaque ad vero.",
            stars: 4
        }
    ]
};

function isElementExists(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.error(`The element with id="${id}" not found.`);
    }
    return !!element;
}

function isValidContent(array) {
    let errorMessage = '';

    // Check that the array is not empty and consists of objects.
    if (!Array.isArray(array)) {
        errorMessage += 'The passed value is not an array.\n';
    } else if (array.length === 0) {
        errorMessage += 'Empty array.\n';
    } else {
        for (let i = 0; i < array.length; i++) {
            const item = array[i];

            // Check that the item is an object
            if (typeof item !== 'object' || item === null) {
                errorMessage += `The element under the index ${i} is not an object.\n`;
                continue;
            }

            // Check the presence and types of the stars and text properties
            if (!('stars' in item)) {
                errorMessage += `The element under the index ${i} is missing the 'stars' property.\n`;
            } else if (!Number.isInteger(item.stars)) {
                errorMessage += `The value of the 'stars' property in the element under the ${i} index is not an integer.\n`;
            }

            if (!('text' in item)) {
                errorMessage += `The element under the ${i} index is missing the 'text' property.\n`;
            } else if (typeof item.text !== 'string') {
                errorMessage += `The value of the 'text' property in the element under the ${i} index is not a string.\n`;
            }
        }
    }

    if (errorMessage) {
        console.error(errorMessage);
        return false;
    }

    return true;
}

function createTemplate({ stars, text }) {
    if (stars < 0 || !text.trim()) {
        throw new Error("Invalid input: stars must be non-negative, text cannot be empty.");
    }

    const div = document.createElement("div");
    div.classList.add("testimonial", "d-none");

    // Stars template
    const starsWrapper = document.createElement("div");
    starsWrapper.classList.add("stars-wrapper", "mt-5");

    // Stars template
    while (--stars >= 0) {
        const starWrapper = document.createElement("div");
        starWrapper.classList.add("star-wrapper");

        const starIcon = document.createElement("i");
        starIcon.className = "fa fa-star star";
        starWrapper.appendChild(starIcon);

        const insideStar = document.createElement("i");
        insideStar.className = "fa fa-star inside-star";
        starWrapper.appendChild(insideStar);

        starsWrapper.appendChild(starWrapper);
    }
    div.appendChild(starsWrapper);

    // Text template
    const p = document.createElement("p");
    p.classList.add("mt-4");
    p.textContent = text;
    div.appendChild(p);

    // Append template
    const fragment = document.createDocumentFragment();
    fragment.appendChild(div);

    return fragment;
}

// Animation
function animation() {
    const { elementId } = data;
    const target = document.getElementById(elementId);

    const timeTestimonialAppear = 10_000; // 10 seconds

    function showStars(stars, delay) {
        stars.forEach((star, i) => {
            setTimeout(() => star.classList.add('active'), delay + 250 * i);
        });
    }

    function hideStars(stars, delay) {
        stars.forEach((star, i) => {
            setTimeout(() => star.classList.remove('active'), delay + 250 * i);
        });
    }

    function showParagraph(par, delay) {
        setTimeout(() => par.classList.add('active'), delay);
    }

    function hideParagraph(par, delay) {
        setTimeout(() => par.classList.remove('active'), delay);
    }

    function appearItem(item, index, arr) {
        const stars = item.querySelectorAll('.star-wrapper');
        const par = item.querySelector('p');

        item.classList.remove('d-none'); // Show element

        showStars(stars, 250); // Appearance of stars

        showParagraph(par, 500); // Appearance of paragraph

        const totalDelay = timeTestimonialAppear - 250 * (stars.length + 1);

        hideStars(stars, totalDelay); // Disappearance of stars
        hideParagraph(par, totalDelay); // Disappearance of paragraph

        // If it's the first element, we hide the last one, otherwise the previous one.
        if (index === 0) {
            arr[arr.length - 1].classList.add('d-none');
        } else {
            arr[index - 1].classList.add('d-none');
        }

        // If there is the last element, we start the cycle again.
        if (index === arr.length - 1) {
            setTimeout(animation, timeTestimonialAppear);
        }
    }

    [...target.children].forEach((item, index) => {
        setTimeout(() => appearItem(item, index, target.children), timeTestimonialAppear * index);
    });
}

function displayContent() {
    const { elementId, content } = data;

    if (!isElementExists(elementId)) {
        return;
    }

    if (!isValidContent(content)) {
        return;
    }

    const element = document.getElementById(elementId);
    element.classList.add("text-center");

    content.map((item) => {
        element.appendChild(createTemplate(item));
    });

    setTimeout(animation, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    displayContent();
});