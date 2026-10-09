
/* =========================================================
   LOAD SAVED THEME
========================================================= */

const savedTheme = localStorage.getItem("wirelabTheme");

if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
}




/* =========================================================
   WIRELAB NAVBAR
   LOAD SAVED PROFILE ICON
   HANDLE NAVIGATION PATHS
========================================================= */





document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       DETERMINE PAGE DEPTH
    ===================================================== */

    const path = window.location.pathname;

    let prefix = "";

    /*
       ROOT
       /wire-lab/index.html
    */
    if (
        path.endsWith("/") ||
        path.endsWith("/index.html")
    ) {
        prefix = "";
    }

    /*
       TWO LEVELS DEEP
       /wire-lab/study/units/
       /wire-lab/tools/color-wheel/
       /wire-lab/labs/gfci-test-lab/
    */
    else if (
        path.includes("/study/units/") ||
        path.includes("/tools/color-wheel/") ||
        path.includes("/labs/gfci-test-lab/")
    ) {
        prefix = "../../";
    }

    /*
       ONE LEVEL DEEP
       /wire-lab/profile/
       /wire-lab/labs/
       /wire-lab/solar/
       /wire-lab/study/
       /wire-lab/testing/
       /wire-lab/tools/
    */
    else {
        prefix = "../";
    }


    /* =====================================================
       NAVIGATION LINKS
    ===================================================== */
    const navPages = {
        home: "index.html",
        study: "study/study.html",
        labs: "labs/labs.html",
        test: "test/test.html",
        debug: "debug/debug.html",
        tools: "tools/tools.html"
    };

    document.querySelectorAll(".nav-button[data-page]").forEach(function (link) {
        const page = link.dataset.page;
        if (navPages[page]) {
            link.href = prefix + navPages[page];
        }
    });











/* =====================================================
   NAV MENU
===================================================== */

const navMenuButton =
    document.getElementById("nav-menu-button");

const navMenuPanel =
    document.getElementById("nav-menu-panel");

if (navMenuButton && navMenuPanel) {

    /* =================================================
       NAV MENU LINKS
    ================================================= */

    const menuPages = {
        PROFILE: "profile/profile.html",
        DEBUG: "debug/debug.html",
        TOOLS: "tools/tools.html"
    };

    document.querySelectorAll(".nav-menu-item").forEach(function (link) {

        const label =
            (link.textContent || "").trim().toUpperCase();

        if (menuPages[label]) {
            link.href = prefix + menuPages[label];
        }

    });


    /* =================================================
       OPEN / CLOSE MENU
    ================================================= */

    navMenuButton.addEventListener("click", function (event) {

        event.stopPropagation();

        navMenuPanel.classList.toggle("open");

    });


    /* =================================================
       CLOSE WHEN CLICKING OUTSIDE
    ================================================= */

    document.addEventListener("click", function () {

        navMenuPanel.classList.remove("open");

    });


    navMenuPanel.addEventListener("click", function (event) {

        event.stopPropagation();

    });

}











    const brandImage = document.querySelector(".brand-icon img");

    if (brandImage) {
        brandImage.src = prefix + "z-images/wirelab-logo2.png";
    }

    const settingsIcon = document.querySelector("#settings-button-icon");

if (settingsIcon) {
    settingsIcon.src = prefix + "z-images/settings-icon.webp";
}


    /* =====================================================
    ACTIVE NAVIGATION
    ===================================================== */

    const currentPage = window.location.pathname;

    document.querySelectorAll(".nav-button[data-page]").forEach(function (link) {

    const page = link.dataset.page;

    if (!navPages[page]) return;

    if (
        (page === "home" && (
            currentPage.endsWith("/") ||
            currentPage.endsWith("/index.html")
        )) ||
        currentPage.endsWith(navPages[page])
    ) {
        link.classList.add("active");
    }
    });


    /* =====================================================
       PROFILE LINK
    ===================================================== */

    const navbarProfile = document.getElementById("navbar-profile");

    if (navbarProfile) {

        navbarProfile.href = prefix + "profile/profile.html";

        if (currentPage.endsWith("/profile/profile.html")) {
    navbarProfile.classList.add("active");
}

        const savedIcon =
            localStorage.getItem("wirelabProfileIcon") || "icon-03.webp";

        const iconPath = prefix + "z-images/profile-icons/" + savedIcon;
        let profileImage = navbarProfile.querySelector("img");

        if (!profileImage) {
            navbarProfile.innerHTML = "";
            profileImage = document.createElement("img");
            navbarProfile.appendChild(profileImage);
        }

        profileImage.src = iconPath;
        profileImage.alt = "Profile";
    }







/* =====================================================
   SETTINGS MENU
===================================================== */

const settingsButton =
    document.getElementById("settings-button");

const settingsButtonPanel =
    document.getElementById("settings-button-panel");

if (settingsButton && settingsButtonPanel) {

    /* =================================================
       SETTINGS LINKS
    ================================================= */

    const settingsPages = {
        SETTINGS: "settings/settings.html",
        PROFILE: "profile/profile.html"
    };

    document.querySelectorAll(".settings-button-item").forEach(function (link) {

        const label =
            (link.textContent || "").trim().toUpperCase();

        if (settingsPages[label]) {
            link.href = prefix + settingsPages[label];
        }

    });


    /* =================================================
       OPEN / CLOSE SETTINGS
    ================================================= */

    settingsButton.addEventListener("click", function (event) {

        event.stopPropagation();

        settingsButtonPanel.classList.toggle("open");

    });


    /* =================================================
       CLOSE WHEN CLICKING OUTSIDE
    ================================================= */

    document.addEventListener("click", function () {

        settingsButtonPanel.classList.remove("open");

    });


    settingsButtonPanel.addEventListener("click", function (event) {

        event.stopPropagation();

    });

}












    /* =====================================================
    THEME TOGGLE
    ===================================================== */

    const themeToggle =
        document.getElementById("theme-toggle-button");

    if (themeToggle) {

        function updateThemeButton() {

            const isLight =
                document.documentElement.getAttribute("data-theme")
                === "light";

            if (isLight) {

                themeToggle.textContent = "☾";

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to dark theme"
                );

                themeToggle.title =
                    "Switch to dark theme";

            } else {

                themeToggle.textContent = "☾";

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to light theme"
                );

                themeToggle.title =
                    "Switch to light theme";
            }
        }


        updateThemeButton();


        themeToggle.addEventListener("click", function () {

            const isLight =
                document.documentElement.getAttribute("data-theme")
                === "light";


            if (isLight) {

                document.documentElement.removeAttribute(
                    "data-theme"
                );

                localStorage.setItem(
                    "wirelabTheme",
                    "dark"
                );

            } else {

                document.documentElement.setAttribute(
                    "data-theme",
                    "light"
                );

                localStorage.setItem(
                    "wirelabTheme",
                    "light"
                );
            }


            updateThemeButton();
        });
    }

    /* stops page from jumping to the top when clicking bad links  */
    document.querySelectorAll('a[href="#"], a:not([href])').forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
    });
    });
    /* stops page from jumping to the top when clicking bad links  */


});


/* =====================================================
   WIRELAB — STENCIL LOGO SHOWN ON ALL PAGES
===================================================== */

const stencilLogo = document.getElementById("wirelab-stencil-logo");

if (stencilLogo) {

    const path = window.location.pathname;

    let prefix = "";

    if (
    path.includes("/study/units/") ||
    path.includes("/tools/color-wheel/")
) {
    prefix = "../../";
}

else if (
    path.includes("/study/") ||
        path.includes("/tools/") ||
        path.includes("/labs/") ||
        path.includes("/test/") ||
        path.includes("/profile/") ||
        path.includes("/settings/") ||
        path.includes("/debug/")
    ) {
        prefix = "../";
    }

    stencilLogo.href = `${prefix}index.html`;

    const logoImage = stencilLogo.querySelector("img");

    if (logoImage) {
        const mobileScreen = window.matchMedia("(max-width: 600px)");

function updateStencilLogo() {
    logoImage.src = mobileScreen.matches
        ? `${prefix}z-images/wirelab-stencil-logo3.webp`
        : `${prefix}z-images/wirelab-stencil-logo.webp`;
}

updateStencilLogo();
mobileScreen.addEventListener("change", updateStencilLogo);
    }

}
