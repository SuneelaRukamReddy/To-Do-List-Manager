let form = document.getElementById("inputForm");
let titleInput = document.getElementById("taskTitle");
let priorityInput = document.getElementById("priority");
let deadlineInput = document.getElementById("deadline");
let resultsContainer = document.getElementById("resultsContainer");
let addBtn = document.getElementById("addBtn");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const priority = priorityInput.value;
    const deadline = deadlineInput.value;

    if (!title || !deadline) {
        alert("Please enter both title and deadline.");
        return;
    }

   const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const timeDiff = deadlineDate - currentDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    let statusText = "";
    let statusColor = "";

    if (daysRemaining < -2) {
      statusText = "Overdue";
      statusColor = "text-danger";
    } else {
      const days = daysRemaining < 0 ? 0 : daysRemaining;
      statusText = `Due in ${days} day${days !== 1 ? "s" : ""}`;
      statusColor = "text-secondary";
    }


    // Create card
    const card = document.createElement("div");
    card.className = "card p-3 mb-3 shadow-sm";

    const cardBody = document.createElement("div");
    cardBody.className = "d-flex justify-content-between align-items-start";

    // Checkbox section
    const checkWrapper = document.createElement("div");
    checkWrapper.className = "form-check";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input";
    checkWrapper.appendChild(checkbox);

    // Content
    const content = document.createElement("div");
    content.className = "flex-grow-1 ml-3";

    const titleEl = document.createElement("h5");
    titleEl.className = "mb-1";
    titleEl.textContent = title;

    const badge = document.createElement("span");
    badge.className = "badge mb-1";
    if (priority === "High") {
      badge.classList.add("badge-danger");   // Red
    } else if (priority === "Medium") {
      badge.classList.add("badge-warning");  // Orange
    } else if (priority === "Low") {
      badge.classList.add("badge-success");  // Green
    }


    badge.textContent = priority;

    const deadlineSpan = document.createElement("span");
    deadlineSpan.className = "ml-2";
    const deadlineIcon = document.createElement("i");
    deadlineIcon.className = "fas fa-calendar-alt";
    deadlineSpan.appendChild(deadlineIcon);
    deadlineSpan.append(" " + deadline);

    const statusSpan = document.createElement("span");
    statusSpan.className = "ml-2 " + statusColor;
    statusSpan.textContent = statusText;

    content.appendChild(titleEl);
    content.appendChild(badge);
    content.appendChild(deadlineSpan);
    content.appendChild(statusSpan);

    // Icons section
    const iconGroup = document.createElement("div");

    const editIcon = document.createElement("i");
    editIcon.className = "fas fa-edit mr-3";
    editIcon.style.cursor = "pointer";

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash";
    deleteIcon.style.cursor = "pointer";

    iconGroup.appendChild(editIcon);
    iconGroup.appendChild(deleteIcon);

    // Build card
    cardBody.appendChild(checkWrapper);
    cardBody.appendChild(content);
    cardBody.appendChild(iconGroup);
    card.appendChild(cardBody);
    resultsContainer.appendChild(card);

    // Checkbox strike-through
    checkbox.addEventListener("change", function() {
        titleEl.style.textDecoration = this.checked ? "line-through" : "none";
    });

    // Delete
    deleteIcon.addEventListener("click", function() {
        resultsContainer.removeChild(card);
    });

    // Edit
    editIcon.addEventListener("click", function() {
        titleInput.value = title;
        priorityInput.value = priority;
        deadlineInput.value = deadline;
        resultsContainer.removeChild(card);
    });

    // Reset input fields
    titleInput.value = "";
    priorityInput.value = "Medium";
    deadlineInput.value = "";
});