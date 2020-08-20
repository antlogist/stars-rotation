const testimonials = [
    {
        text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ut nulla atque autem explicabo animi cupiditate minus accusantium officia dignissimos, consectetur, numquam error laboriosam est facilis temporibus itaque ad vero.",
        star: 5
    },
    {
        text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ut nulla atque autem explicabo animi cupiditate minus accusantium officia dignissimos, consectetur, numquam error laboriosam est facilis temporibus itaque ad vero.",
        star: 3
    },
    {
        text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ut nulla atque autem explicabo animi cupiditate minus accusantium officia dignissimos, consectetur, numquam error laboriosam est facilis temporibus itaque ad vero.",
        star: 4
    }
];

(function(arr) {
    const target = document.getElementById("testimonials");
    target.classList.add("text-center");

    const fragment = document.createDocumentFragment();
    
    // Get all the templates
    arr.forEach((item, index, arr) => {
        createTestimonialTemplate(item);
    });

    // Templates
    function createTestimonialTemplate({ star, text }) {
        const div = document.createElement("div");
        div.classList.add("testimonial");
        div.classList.add("d-none");
        
        // Stars template
        const starsWrapper = document.createElement("div");
        starsWrapper.classList.add("stars-wrapper", "mt-5");
        while (star--) {
            const starIcon = document.createElement("i");
            starIcon.classList.add("fa", "fa-star", "star");
            starsWrapper.appendChild(starIcon);
            const insideStar = document.createElement("i");
            insideStar.classList.add("fa", "fa-star", "inside-star");
            starIcon.appendChild(insideStar);
        }
        div.appendChild(starsWrapper);
        
        // Text template
        const p = document.createElement("p");
        p.classList.add("mt-4");
        p.textContent = text;
        div.appendChild(p);
        
        // Append template
        fragment.appendChild(div);
    }
    
    target.appendChild(fragment);
    
    // Animation
    function animation(){
        const timeTestimonialAppear = 10000;
        [...target.children].forEach((item, index, arr) => {

            // Appear
            const timerAppearing = setTimeout(function(){
                
                // Appearing
                item.classList.remove("d-none");
                
                // Animation
                const stars = item.querySelectorAll(".star");
                let starsLength = stars.length;
                
                // Star appearing
                setTimeout(function() {
                    for (let i = 0; i < starsLength; i++) {
                        setTimeout(function(){
                            stars[i].classList.add("active");
                        }, 250 * i)
                    }
                }, 250) 
                
                // Star disappearing
                setTimeout(function() {
                    for (let i = 0; i < starsLength; i++) {
                        setTimeout(function(){
                            stars[i].classList.remove("active");
                        }, 250 * i)
                    }     
                }, timeTestimonialAppear - 250 * (starsLength + 1));
                
                // Paragraph
                const par = item.querySelector("p");
                setTimeout(function() {
                    par.classList.add("active");
                }, 250)
                
                setTimeout(function() {
                    par.classList.remove("active");
                }, timeTestimonialAppear - 250 * (starsLength + 1));
                
                // Disappearing testimonial
                // If the first item or not the first item
                if (index === 0) {
                    arr[arr.length - 1].classList.add("d-none");
                } else {
                    arr[index - 1].classList.add("d-none");
                }
                
                // If the last item
                if (index === arr.length - 1) {
                    clearTimeout(timerAppearing);
                    // Infinit loop
                    setTimeout(animation, timeTestimonialAppear);
                }
                
            },timeTestimonialAppear * index);
        })
    }
    
    setTimeout(animation, 2000);
    
})(testimonials);
