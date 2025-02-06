var icons = document.querySelectorAll(".click-and-reveal-icon");

for (var i = 0; i < icons.length; i++) {
    var content = icons[i].querySelector(".click-and-reveal-icon-content");
    var type = icons[i].getAttribute("data-type");

    icons[i].innerHTML = "<span class=\"sr-only\">" + type + " " + icons[i].getAttribute("data-content") + ((!content.classList.contains("show")) ? ((document.documentElement.lang === "fr") ? " (sélectionner pour afficher le contenu)" : " (select to show content)") : ((document.documentElement.lang === "fr") ? " (sélectionner pour cacher le contenu)&nbsp;: " : " (select to hide content): ")) + "</span>" + icons[i].innerHTML;
    content = icons[i].querySelector(".click-and-reveal-icon-content");

    icons[i].setAttribute("tabindex", 0);
    icons[i].setAttribute("aria-live", "polite");

    if (!content.classList.contains("show")) {
        content.setAttribute("aria-hidden", true);
    }

    icons[i].onclick = function (e) {
        var target = e.target.closest(".click-and-reveal-icon");
        var content = target.querySelector(".click-and-reveal-icon-content");
        var type = target.getAttribute("data-type");

        if (!content.classList.contains("show")) {
            content.classList.add("show");
            content.setAttribute("aria-hidden", false);
        }
        else {
            content.classList.remove("show");
            content.setAttribute("aria-hidden", true);
        }

        target.querySelector(".sr-only").innerHTML = type + " " + target.getAttribute("data-content") + ((!content.classList.contains("show")) ? ((document.documentElement.lang === "fr") ? " (sélectionner pour afficher le contenu)" : " (select to show content)") : ((document.documentElement.lang === "fr") ? " (sélectionner pour cacher le contenu)&nbsp;: " : " (select to hide content): "));
    }

    icons[i].onkeypress = function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            this.click();
        }
    }
}
