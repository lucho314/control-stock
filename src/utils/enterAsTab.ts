export const enterAsTab = <T extends HTMLElement>(
  e: React.KeyboardEvent<T>
) => {
  if (e.key === "Enter") {
    e.preventDefault();

    // Selecciona todos los elementos que pueden recibir foco en el documento
    const focusableElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        'input, select, textarea, button, [tabindex]:not([tabindex="-1"])'
      )
    );

    const currentIndex = focusableElements.indexOf(
      e.currentTarget as HTMLElement
    );
    const nextElement = focusableElements[currentIndex + 1];

    if (nextElement) {
      nextElement.focus();
    }
  }
};
