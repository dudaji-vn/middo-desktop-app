function selectSource(sources) {
  console.log("selectSource called: ", sources);
  return new Promise((resolve, reject) => {
    const container = document.createElement("div");
    // ADd styles to the container with tailwindcss
    container.classList.add(
      "fixed",
      "top-0",
      "left-0",
      "w-full",
      "h-full",
      "flex",
      "items-center",
      "justify-center",
    );
    container.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    container.style.zIndex = 1000;
    container.setAttribute("id", "sourceSelectContainer");
    const sourceSelect = document.createElement("select");
    sourceSelect.classList.add(
      "bg-white",
      "border",
      "rounded",
      "w-64",
      "p-2",
      "text-black",
      'mr-2',
    );
    sourceSelect.setAttribute("id", "sourceSelect");
    sources.forEach((source) => {
      const option = document.createElement("option");
      option.value = source.id;
      option.innerText = source.name;
      sourceSelect.appendChild(option);
    });
    const button = document.createElement("button");
    button.innerText = "Select";
    button.classList.add("bg-primary", "hover:opacity-80", "text-white", "font-bold", "py-2", "px-4", "rounded");
    button.onclick = () => {
      const selectedSourceId = sourceSelect.value;
      const selectedSource = sources.find(
        (source) => source.id === selectedSourceId
      );
      if (selectedSource) {
        container.remove(); // Remove the UI after selection
        resolve(selectedSource);
      } else {
        reject(new Error("No source selected"));
      }
    };
    container.appendChild(sourceSelect);
    container.appendChild(button);
    document.body.appendChild(container);
  });
}

module.exports = {
  selectSource,
};
