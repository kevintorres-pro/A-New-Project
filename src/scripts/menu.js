document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuOptions = Array.from(mobileMenu.querySelectorAll("a"));
  const line_1 = document.getElementById("line-1");
  const line_2 = document.getElementById("line-2");
  const line_3 = document.getElementById("line-3");

  let isMenuOpen = false;
  let focusedItemIndex = -1;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    line_1.classList.toggle("rotate-45");
    line_1.classList.toggle("translate-y-2.5");
    line_2.classList.toggle("opacity-0");
    line_3.classList.toggle("-rotate-45");
    line_3.classList.toggle("w-8");
    line_3.classList.toggle("-translate-y-2.5");

    mobileMenu.classList.toggle("translate-x-full");
    mobileMenu.setAttribute("aria-hidden", !isMenuOpen);
    toggleButton.setAttribute("aria-expanded", isMenuOpen);

    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    if (isMenuOpen) {
      menuOptions[0]?.focus();
      focusedItemIndex = 0;
    } else {
      toggleButton.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (isMenuOpen) {
      if (event.key === "Escape") {
        toggleMenu();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        focusedItemIndex = (focusedItemIndex + 1) % menuOptions.length;
        menuOptions[focusedItemIndex].focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        focusedItemIndex =
          (focusedItemIndex - 1 + menuOptions.length) % menuOptions.length;
        menuOptions[focusedItemIndex].focus();
      }
    }
  };

  toggleButton.addEventListener("click", toggleMenu);
  document.addEventListener("keydown", handleKeyDown);

  menuOptions.forEach((item) => {
    item.addEventListener("click", () => {
      if (isMenuOpen) {
        toggleMenu();
      }
    });
  });
});
