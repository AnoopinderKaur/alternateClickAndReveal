var learnerView =
	window.parent.document.querySelector("#d2l-popup-body-content") != null &&
	window.parent.document.querySelector("#d2l_le_content_printcontainer") != null &&
	window.parent.document.querySelector("div.d2l-fileviewer") != null &&
	window.parent.document.querySelector("div.d2l-fileviewer-text") != null &&
	window.parent.document.querySelector("iframe") != null;

// You can add/remove scripts/codes here according to what you need in your course.

// The code that will apply to every pages

if (Exists(".tab-pane .question-set") || Exists(".tab-pane .card-reveal")) {
	const buttonsNotActive = $(".tab-pane").find("button");
	$.each($(buttonsNotActive), function () {
		$(this).attr("tabindex", "0");
	});
}

// The scripts to add to every pages
// Where possible, you should always add a condition for the addition to the page
// As long as the function "AddScript()" is used the scripts will always run in the order they are added.

if (Exists('div[data-type="svg-interactive"]')) {
	AddScript("js/BS_svg-interactive.js");
	if (Exists(".svg-question-set")) AddScript("js/BS_svg-question-set.js");
	if (Exists(".animate-svg")) AddScript("js/BS_svg-click-and-reveal.js");
}

if (Exists("[data-count]")) {
	AddScript("js/BS_interaction-counter.js");
}

if (Exists("#glossary")) {
	AddScript("js/jquery-listnav.min.js");
	AddScript("js/BS_glossary-navigation.js");
}

if (Exists('div[data-type="chat-bot"]')) {
	AddScript("js/BS_chat-bot.js");
}

if (Exists(".carousel")) {
	AddScript("js/BS_carousel.js");
}

if (Exists(".before-and-after")) {
	AddScript("js/BS_before-after.js");
}

if (Exists(".question-set")) {
	AddScript("js/BS_question-set.js");
}

if (Exists(".checklist-container")) {
	AddScript("js/BS_checklist.js");
}

if (Exists(".word-scramble-container")) {
	AddScript("js/words_and_hints.js");
	AddScript("js/BS_word-scramble.js");
}

if (Exists("#questionTool") || Exists("#questionReport")) {
	AddScript("/shared/custom_widgets/d2l/assets/third_party/valence/libVal.min.js", true);
	AddScript("js/BS_socratic-tool.js");
}

if (Exists(".snap-drag-area")) {
	AddScript("js/DragonDrop/DragAreaObj.js");
	AddScript("js/DragonDrop/dragObj.js");
	AddScript("js/DragonDrop/dropObj.js");
	AddScript("js/DragonDrop/labelObj.js");
	AddScript("js/DragonDrop/drag-manager.js");
	AddScript("js/DragonDrop/main.js");
}

if (Exists(".thisOrThat")) {
	AddScript("js/BS_this-that.js");
}

if (Exists(".click-and-reveal-icon")) {
	AddScript("js/BS_alternate-click-and-reveal.js");
}

AddScript("js/BS_ponctuation.js");

AddScript("/shared/custom_widgets/d2l/assets/third_party/valence/libVal.min.js", true);
AddScript("js/BS_completion-detection.js");

/* ------------------------------- To add the feedback button, uncomment the following line -------------------------------*/
/* ----- In order to get the page title from the API, we also need BS_completion-detection.js to be added on the page -----*/
/*!!------------------- MAKE SURE TO ALSO CHANGE THE PRODUCT CODE ON LINE 2 of BS_feedback-button.js --------------------!!*/

//AddScript("js/BS_feedback-button.js");

if (Exists(".modal")) {
	AddScript("js/BS_modal-scroll-fix.js");
	$(".modal").off("hide.bs.modal");

	$(".modal").on("hide.bs.modal", function () {
		$(".feedback").hide();
	});
}

if (Exists(".hotbox")) {
	function ResizeBox() {
		var maxHeight = 0;
		$(".hotbox>div").removeAttr("style");

		$(".hotbox>div").each(function () {
			if ($(this).height() > maxHeight) {
				maxHeight = $(this).height();
			}
		});

		$(".hotbox>div").height(maxHeight);
	}

	$(document).ready(ResizeBox);
	$(window).on("resize", ResizeBox);
}

//Fix for tooltips not aligned with element
if (Exists(".modal") || !learnerView) {
	setTimeout(() => {
		document.querySelectorAll("[data-toggle='tooltip'], [data-tooltip='tooltip']").forEach((element) => {
			element.addEventListener("focus", () => {
				adjustTooltips(element);
			});
			element.addEventListener("mouseover", () => {
				adjustTooltips(element);
			});
		});
	}, 500);
}

function adjustTooltips(element) {
	var tooltip = document.querySelector("#" + element.getAttribute("aria-describedby"));

	tooltip.style.top = -1 * document.querySelector("html").scrollTop + "px";
}

if (Exists(".tabs-wrapper")) {
	$(document).ready(function () {
		$(".tabs-wrapper .list-group-item:not(.active)").attr("aria-selected", false);
		$(".tabs-wrapper .list-group-item.active").attr("aria-selected", true);
	});
}

if (Exists(".flip-card")) {
	$(document).ready(function () {
		$(".flip-card .flip-card-front[aria-hidden='true'], .flip-card .flip-card-back[aria-hidden='true']").find("a, button, [tabindex='0']").attr("tabindex", -1);

		$(".flip-card .flip-card-front").each(function () {
			$(this).html($(this).html() + "<span class='sr-only'>" + ($("html").attr("lang") == "fr" ? "Sélectionner la carte pour accéder à l'arrière" : "Select card to flip to back") + "</span>");
		});
		$(".flip-card .flip-card-back").each(function () {
			$(this).html($(this).html() + "<span class='sr-only'>" + ($("html").attr("lang") == "fr" ? "Sélectionner la carte pour accéder à l'avant" : "Select card to flip to front") + "</span>");
		});
	});

	$(".flip-card").click(function () {
		$(".flip-card .flip-card-front:not([aria-hidden='true']), .flip-card .flip-card-back:not([aria-hidden='true'])").find("a, button, [tabindex='0']").attr("tabindex", 0);
		$(".flip-card .flip-card-front[aria-hidden='true'], .flip-card .flip-card-back[aria-hidden='true']").find("a, button, [tabindex='0']").attr("tabindex", -1);
	});

	/*---------- Fix to avoid flip cards flipping back when clicking something on the back (link ot button) ----------*/
	/*------------------------- (Created originally for carousel on the back of a flip card) -------------------------*/

	//Deactivate the default click event on the flip-card
	$(".flip-card-content").off("click");

	//Replace it with our own
	$(".flip-card-content").on("click", function (event) {
		//If the clicked element is NOT in a carousel control or a link or button
		if (
			$(event.target).closest(".carousel-control").length == 0 &&
			!$(event.target).hasClass("btn-slide") &&
			!$(event.target).hasClass("list-group-item") &&
			$(event.target).prop("tagName") != "A" &&
			$(event.target).prop("tagName") != "button" &&
			($(event.target).attr("role") != "button" || $(event.target).hasClass("flip-card-content"))
		) {
			// ↓↓ Original JS from templates
			$(this).toggleClass("apply-flip");
			$(this).children(".flip-card-back").attr("aria-hidden") ? $(this).children(".flip-card-back").removeAttr("aria-hidden") : $(this).children(".flip-card-back").attr("aria-hidden", "true");
			$(this).children(".flip-card-front").attr("aria-hidden") ? $(this).children(".flip-card-front").removeAttr("aria-hidden") : $(this).children(".flip-card-front").attr("aria-hidden", "true");
			// ↑↑

			$(this).find(".btn-slide").attr("tabindex") == 0 ? $(this).find(".btn-slide").attr("tabindex", -1) : $(this).find(".btn-slide").attr("tabindex", 0);
			$(this).find("[tabindex]").attr("tabindex") == 0 ? $(this).find("[tabindex]").attr("tabindex", -1) : $(this).find("[tabindex]").attr("tabindex", 0);
		}
	});
}

//Fix for a bug when there are tabs and a carousel on the same page (tabindex="-1" is added on carousel navigation after each slide change or tabs change)
if (Exists(".carousel") && Exists(".tabs-wrapper")) {
	$(".carousel").on("slide.bs.carousel", function () {
		$(".carousel .carousel-indicators li").attr("tabindex", 0);
	});

	$(".tabs-wrapper .list-group .list-group-item").click(function () {
		$(".carousel .carousel-indicators li").attr("tabindex", 0);
	});
}

// This function will add the script at the specified url to the page in a synchronous manner
function AddScript(scriptPath, skipAddedPath) {
	let addedPath = document.querySelector("script[data-add-js-path]")?.getAttribute("data-add-js-path") || "";

	let script = document.createElement("script");
	if (skipAddedPath) script.src = scriptPath; else script.src = addedPath + scriptPath;
	script.async = false;
	document.currentScript.parentElement.append(script);
}

// This function returns a value if the CSS selector input exists in the current page null otherwise
function Exists(selector) {
	return document.querySelector(selector);
}

/* JS for Dragon Drop Custom five elements */
if (Exists(".dragon-drop-five-elements")) {
	setInterval(function () {
		setCircle();
		setItems();
		setArrows();
	}, 100);

	function setCircle() {
		$(".five-elements").css({ height: $(".five-elements").outerWidth() });
	}

	function setItems() {
		var radius;

		if ($(".snap-drag-area[data-validate='true']").length) {
			radius = $(".five-elements .bg").outerWidth() / 2 + 60;
		} else {
			radius = $(".five-elements .bg").outerWidth() / 2;
		}

		var fields = $(".five-elements .element");
		var container = $(".five-elements .bg");

		var width = container.width();
		var height = container.height();

		var steps = fields.length;

		fields.each(function (i) {
			i = i - steps / 4;
			var x = Math.round(width / 2 + radius * Math.cos((2 * i * Math.PI) / steps) - ($(this).outerWidth() + 15) / 2);
			var y = Math.round(height / 2 + radius * Math.sin((2 * i * Math.PI) / steps) - ($(this).outerHeight() + 15) / 2);

			$(this).css({
				left: x + "px",
				top: y + "px",
			});
		});
	}

	function setArrows() {
		var radius = $(".five-elements .bg").outerWidth() / 2;

		var fields = $(".five-elements .arrow");
		var container = $(".five-elements .bg");

		var width = container.width();
		var height = container.height();

		var steps = fields.length * 2;

		fields.each(function (i) {
			i = i * 2 - steps / 4 + 1;
			var x = Math.round(width / 2 + radius * Math.cos((2 * i * Math.PI) / steps) - $(this).outerWidth() / 2);
			var y = Math.round(height / 2 + radius * Math.sin((2 * i * Math.PI) / steps) - $(this).outerHeight() / 2);

			$(this).css({
				left: x + "px",
				top: y + "px",
			});
		});
	}
}
