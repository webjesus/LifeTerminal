const STORAGE_KEYS = {
    theme: "life-terminal-theme",
    tasks: "life-terminal-tasks",
    habits: "life-terminal-habits",
    goal: "life-terminal-goal",
    selectedDate: "life-terminal-selected-date"
};

const WEEKDAY_LABELS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const defaultHabits = [
    { id: "running", name: "Бег", count: 0 },
    { id: "study", name: "Учеба", count: 0 },
    { id: "water", name: "Вода", count: 0 },
    { id: "reading", name: "Чтение", count: 0 }
];

const priorityLabels = {
    normal: "Обычная",
    important: "Важная",
    urgent: "Срочная"
};

const categoryLabels = {
    work: "Работа",
    study: "Учёба",
    health: "Здоровье",
    personal: "Личное",
    other: "Другое"
};

const elements = {
    body: document.body,
    themeToggle: document.getElementById("themeToggle"),
    themeIcon: document.getElementById("themeIcon"),
    totalTasks: document.getElementById("totalTasks"),
    completedTasks: document.getElementById("completedTasks"),
    taskProgress: document.getElementById("taskProgress"),
    progressPercent: document.getElementById("progressPercent"),
    statsDateLabel: document.getElementById("statsDateLabel"),
    taskForm: document.getElementById("taskForm"),
    taskInput: document.getElementById("taskInput"),
    prioritySelect: document.getElementById("prioritySelect"),
    categorySelect: document.getElementById("categorySelect"),
    taskFilters: document.getElementById("taskFilters"),
    searchInput: document.getElementById("searchInput"),
    taskList: document.getElementById("taskList"),
    taskEmptyState: document.getElementById("taskEmptyState"),
    taskTemplate: document.getElementById("taskTemplate"),
    habitGrid: document.getElementById("habitGrid"),
    habitTemplate: document.getElementById("habitTemplate"),
    goalTitle: document.getElementById("goalTitle"),
    goalProgress: document.getElementById("goalProgress"),
    goalProgressValue: document.getElementById("goalProgressValue"),
    goalPreviewTitle: document.getElementById("goalPreviewTitle"),
    goalPreviewPercent: document.getElementById("goalPreviewPercent"),
    goalProgressFill: document.getElementById("goalProgressFill"),
    taskSelectedDateLabel: document.getElementById("taskSelectedDateLabel"),
    calendarSubtitle: document.getElementById("calendarSubtitle"),
    calendarPrev: document.getElementById("calendarPrev"),
    calendarNext: document.getElementById("calendarNext"),
    calendarMonthLabel: document.getElementById("calendarMonthLabel"),
    selectedDateLabel: document.getElementById("selectedDateLabel"),
    calendarWeekdays: document.getElementById("calendarWeekdays"),
    calendarGrid: document.getElementById("calendarGrid"),
    summaryTotal: document.getElementById("summaryTotal"),
    summaryCompleted: document.getElementById("summaryCompleted"),
    summaryActive: document.getElementById("summaryActive"),
    progressChart: document.getElementById("progressChart"),
    exportButton: document.getElementById("exportButton"),
    importButton: document.getElementById("importButton"),
    importInput: document.getElementById("importInput")
};

let currentFilter = "all";
let searchQuery = "";
let selectedDate = loadSelectedDate();
let currentCalendarDate = parseDateKey(selectedDate);
let draggedTaskId = null;

const state = {
    theme: loadTheme(),
    tasks: loadTasks(),
    habits: loadHabits(),
    goal: loadGoal()
};

init();

function init() {
    applyTheme(state.theme);
    renderCalendarWeekdays();
    renderCalendar();
    renderTasks();
    renderHabits();
    renderGoal();
    renderProgressChart();
    updateStats();
    updateFilterUI();

    elements.themeToggle.addEventListener("click", handleThemeToggle);
    elements.taskForm.addEventListener("submit", handleTaskSubmit);
    elements.taskFilters.addEventListener("click", handleFilterClick);
    elements.searchInput.addEventListener("input", handleSearchInput);
    elements.goalTitle.addEventListener("input", handleGoalChange);
    elements.goalProgress.addEventListener("input", handleGoalChange);
    elements.calendarPrev.addEventListener("click", () => changeCalendarMonth(-1));
    elements.calendarNext.addEventListener("click", () => changeCalendarMonth(1));
    elements.exportButton.addEventListener("click", handleExport);
    elements.importButton.addEventListener("click", () => elements.importInput.click());
    elements.importInput.addEventListener("change", handleImport);
}

function loadTheme() {
    return localStorage.getItem(STORAGE_KEYS.theme) || "dark";
}

function loadSelectedDate() {
    return localStorage.getItem(STORAGE_KEYS.selectedDate) || getTodayKey();
}

function loadTasks() {
    try {
        const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.tasks)) || [];
        return Array.isArray(savedTasks) ? savedTasks.map(normalizeTask).filter((task) => task.text) : [];
    } catch {
        return [];
    }
}

function loadHabits() {
    try {
        const savedHabits = JSON.parse(localStorage.getItem(STORAGE_KEYS.habits));
        if (!Array.isArray(savedHabits) || savedHabits.length === 0) {
            return defaultHabits;
        }

        return defaultHabits.map((habit) => {
            const savedHabit = savedHabits.find((item) => item.id === habit.id);
            return savedHabit ? { ...habit, count: savedHabit.count || 0 } : habit;
        });
    } catch {
        return defaultHabits;
    }
}

function loadGoal() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.goal)) || { title: "", progress: 0 };
    } catch {
        return { title: "", progress: 0 };
    }
}

function normalizeTask(task) {
    return {
        id: task.id || crypto.randomUUID(),
        text: String(task.text || "").trim(),
        priority: priorityLabels[task.priority] ? task.priority : "normal",
        category: categoryLabels[task.category] ? task.category : "other",
        completed: Boolean(task.completed),
        date: isValidDateKey(task.date) ? task.date : getTodayKey(),
        createdAt: task.createdAt || new Date().toISOString()
    };
}

function handleThemeToggle() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    applyTheme(state.theme);
    localStorage.setItem(STORAGE_KEYS.theme, state.theme);
}

function applyTheme(theme) {
    elements.body.classList.toggle("dark", theme === "dark");
    elements.themeIcon.textContent = theme === "dark" ? "☀" : "☾";
}

function handleTaskSubmit(event) {
    event.preventDefault();

    const text = elements.taskInput.value.trim();
    const priority = elements.prioritySelect.value;
    const category = elements.categorySelect.value;

    if (!text) {
        return;
    }

    state.tasks.unshift({
        id: crypto.randomUUID(),
        text,
        priority,
        category,
        date: selectedDate,
        completed: false,
        createdAt: new Date().toISOString()
    });

    syncTaskViews();
    elements.taskForm.reset();
    elements.taskInput.focus();
}

function handleFilterClick(event) {
    const button = event.target.closest("[data-filter]");
    if (!button) {
        return;
    }

    currentFilter = button.dataset.filter;
    renderTasks();
    updateFilterUI();
}

function handleSearchInput(event) {
    searchQuery = event.target.value.trim();
    renderTasks();
}

function getTasksForSelectedDate() {
    return state.tasks.filter((task) => task.date === selectedDate);
}

function getFilteredTasks() {
    return getTasksForSelectedDate().filter((task) => {
        const matchesFilter =
            currentFilter === "all" ||
            (currentFilter === "active" && !task.completed) ||
            (currentFilter === "completed" && task.completed);

        const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });
}

function renderTasks() {
    const visibleTasks = getFilteredTasks();
    elements.taskList.innerHTML = "";
    elements.taskEmptyState.hidden = visibleTasks.length > 0;
    elements.taskEmptyState.textContent = getEmptyStateText();

    visibleTasks.forEach((task) => {
        const fragment = elements.taskTemplate.content.cloneNode(true);
        const item = fragment.querySelector(".task-item");
        const checkbox = fragment.querySelector(".task-item__checkbox");
        const text = fragment.querySelector(".task-item__text");
        const priority = fragment.querySelector(".task-item__priority");
        const category = fragment.querySelector(".task-item__category");
        const date = fragment.querySelector(".task-item__date");
        const deleteButton = fragment.querySelector(".task-item__delete");

        item.draggable = true;
        item.classList.toggle("completed", task.completed);
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", `Отметить задачу ${task.text}`);
        text.textContent = task.text;
        priority.textContent = priorityLabels[task.priority] || priorityLabels.normal;
        priority.dataset.priority = task.priority;
        category.textContent = categoryLabels[task.category] || categoryLabels.other;
        date.textContent = formatShortDate(task.date);

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            syncTaskViews();
        });

        deleteButton.addEventListener("click", () => {
            state.tasks = state.tasks.filter((itemTask) => itemTask.id !== task.id);
            syncTaskViews();
        });

        item.addEventListener("dragstart", (event) => {
            draggedTaskId = task.id;
            item.classList.add("is-dragging");
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", String(task.id));
        });

        item.addEventListener("dragend", () => {
            draggedTaskId = null;
            item.classList.remove("is-dragging");
            clearCalendarDropTargets();
        });

        elements.taskList.appendChild(fragment);
    });
}

function getEmptyStateText() {
    const hasTasksForDate = getTasksForSelectedDate().length > 0;
    if (!hasTasksForDate) {
        return "На выбранную дату задач нет. Добавьте первую.";
    }

    return "По текущему фильтру и поиску задач не найдено.";
}

function updateFilterUI() {
    const buttons = elements.taskFilters.querySelectorAll("[data-filter]");
    buttons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.filter === currentFilter);
    });
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(state.tasks));
}

function updateStats() {
    const tasksForDay = getTasksForSelectedDate();
    const total = tasksForDay.length;
    const completed = tasksForDay.filter((task) => task.completed).length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    elements.totalTasks.textContent = total;
    elements.completedTasks.textContent = completed;
    elements.taskProgress.textContent = `${progress}%`;
    elements.progressPercent.textContent = `${progress}%`;
    elements.statsDateLabel.textContent = `За ${formatLongDate(selectedDate)}`;

    const progressDegrees = progress * 3.6;
    const progressRing = document.querySelector(".progress-ring");
    progressRing.style.background = `conic-gradient(var(--primary) ${progressDegrees}deg, rgba(255, 255, 255, 0.12) ${progressDegrees}deg)`;

    renderCalendarSummary(tasksForDay);
}

function renderCalendarSummary(tasksForDay) {
    const completed = tasksForDay.filter((task) => task.completed).length;
    elements.summaryTotal.textContent = String(tasksForDay.length);
    elements.summaryCompleted.textContent = String(completed);
    elements.summaryActive.textContent = String(tasksForDay.length - completed);
}

function renderHabits() {
    elements.habitGrid.innerHTML = "";

    state.habits.forEach((habit) => {
        const fragment = elements.habitTemplate.content.cloneNode(true);
        const card = fragment.querySelector(".habit-card");
        const name = fragment.querySelector(".habit-card__name");
        const count = fragment.querySelector(".habit-card__count");

        name.textContent = habit.name;
        count.textContent = `${habit.count} дн.`;

        card.addEventListener("click", () => {
            habit.count += 1;
            saveHabits();
            renderHabits();
        });

        elements.habitGrid.appendChild(fragment);
    });
}

function saveHabits() {
    localStorage.setItem(STORAGE_KEYS.habits, JSON.stringify(state.habits));
}

function handleGoalChange() {
    state.goal = {
        title: elements.goalTitle.value.trim(),
        progress: Number(elements.goalProgress.value)
    };

    saveGoal();
    renderGoal();
}

function renderGoal() {
    elements.goalTitle.value = state.goal.title;
    elements.goalProgress.value = state.goal.progress;
    elements.goalProgressValue.textContent = `${state.goal.progress}%`;
    elements.goalPreviewTitle.textContent = state.goal.title || "Цель пока не задана";
    elements.goalPreviewPercent.textContent = `${state.goal.progress}%`;
    elements.goalProgressFill.style.width = `${state.goal.progress}%`;
}

function saveGoal() {
    localStorage.setItem(STORAGE_KEYS.goal, JSON.stringify(state.goal));
}

function renderCalendarWeekdays() {
    elements.calendarWeekdays.innerHTML = WEEKDAY_LABELS.map((label) => `<span>${label}</span>`).join("");
}

function renderCalendar() {
    const monthStart = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), 1);
    const monthEnd = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, 0);
    const startOffset = (monthStart.getDay() + 6) % 7;

    elements.calendarMonthLabel.textContent = currentCalendarDate.toLocaleDateString("ru-RU", {
        month: "long",
        year: "numeric"
    });
    elements.selectedDateLabel.textContent = `Выбранная дата: ${formatDisplayDate(selectedDate)}`;
    elements.taskSelectedDateLabel.textContent = `Выбранная дата: ${formatDisplayDate(selectedDate)}`;
    elements.calendarSubtitle.textContent = "Выберите день для привязки задач";
    elements.calendarGrid.innerHTML = "";

    for (let index = 0; index < startOffset; index += 1) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "calendar-day calendar-day--empty";
        button.setAttribute("aria-hidden", "true");
        elements.calendarGrid.appendChild(button);
    }

    for (let day = 1; day <= monthEnd.getDate(); day += 1) {
        const cellDate = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), day);
        const key = toDateKey(cellDate);
        const button = document.createElement("button");
        button.type = "button";
        button.className = "calendar-day";
        button.textContent = String(day);
        button.classList.toggle("is-selected", key === selectedDate);
        button.classList.toggle("is-today", key === getTodayKey());
        button.classList.toggle("has-task", state.tasks.some((task) => task.date === key));
        button.dataset.date = key;
        button.setAttribute("aria-label", formatLongDate(key));

        button.addEventListener("click", () => {
            setSelectedDate(key);
        });

        button.addEventListener("dragover", (event) => {
            if (!draggedTaskId) {
                return;
            }

            event.preventDefault();
            button.classList.add("is-drop-target");
            event.dataTransfer.dropEffect = "move";
        });

        button.addEventListener("dragleave", () => {
            button.classList.remove("is-drop-target");
        });

        button.addEventListener("drop", (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData("text/plain") || draggedTaskId;
            moveTaskToDate(taskId, key);
        });

        elements.calendarGrid.appendChild(button);
    }
}

function changeCalendarMonth(direction) {
    currentCalendarDate = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + direction, 1);
    renderCalendar();
}

function setSelectedDate(dateKey) {
    selectedDate = dateKey;
    localStorage.setItem(STORAGE_KEYS.selectedDate, selectedDate);
    currentCalendarDate = parseDateKey(dateKey);
    renderCalendar();
    renderTasks();
    updateStats();
}

function moveTaskToDate(taskId, dateKey) {
    const task = state.tasks.find((item) => String(item.id) === String(taskId));
    if (!task || task.date === dateKey) {
        clearCalendarDropTargets();
        return;
    }

    task.date = dateKey;
    saveTasks();
    selectedDate = dateKey;
    currentCalendarDate = parseDateKey(dateKey);
    localStorage.setItem(STORAGE_KEYS.selectedDate, selectedDate);
    syncTaskViews();
    clearCalendarDropTargets();
}

function clearCalendarDropTargets() {
    const targets = elements.calendarGrid.querySelectorAll(".is-drop-target");
    targets.forEach((target) => target.classList.remove("is-drop-target"));
}

function renderProgressChart() {
    const dailyProgress = getLastSevenDaysProgress();
    elements.progressChart.innerHTML = "";

    dailyProgress.forEach((day) => {
        const column = document.createElement("div");
        column.className = "chart-bar";
        column.innerHTML = `
            <span class="chart-bar__value">${day.progress}%</span>
            <div class="chart-bar__track">
                <div class="chart-bar__fill" style="height: ${Math.max(day.progress, day.total > 0 ? 12 : 6)}%;"></div>
            </div>
            <span class="chart-bar__label">${day.label}</span>
        `;

        elements.progressChart.appendChild(column);
    });
}

function getLastSevenDaysProgress() {
    const today = parseDateKey(getTodayKey());
    const days = [];

    for (let offset = 6; offset >= 0; offset -= 1) {
        const date = new Date(today);
        date.setDate(today.getDate() - offset);
        const key = toDateKey(date);
        const tasks = state.tasks.filter((task) => task.date === key);
        const completed = tasks.filter((task) => task.completed).length;
        const progress = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

        days.push({
            key,
            total: tasks.length,
            progress,
            label: date.toLocaleDateString("ru-RU", { weekday: "short" }).slice(0, 2)
        });
    }

    return days;
}

function handleExport() {
    const payload = {
        exportedAt: new Date().toISOString(),
        theme: state.theme,
        tasks: state.tasks,
        habits: state.habits,
        goal: state.goal,
        statistics: {
            selectedDate,
            totalTasks: getTasksForSelectedDate().length,
            completedTasks: getTasksForSelectedDate().filter((task) => task.completed).length,
            progressPercent: calculateProgress(getTasksForSelectedDate())
        }
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `life-terminal-${getTodayKey()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function handleImport(event) {
    const [file] = event.target.files || [];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        try {
            const payload = JSON.parse(String(reader.result || "{}"));

            if (payload.theme === "dark" || payload.theme === "light") {
                state.theme = payload.theme;
                localStorage.setItem(STORAGE_KEYS.theme, state.theme);
            }

            if (Array.isArray(payload.tasks)) {
                state.tasks = payload.tasks.map(normalizeTask).filter((task) => task.text);
                saveTasks();
            }

            if (Array.isArray(payload.habits)) {
                state.habits = defaultHabits.map((habit) => {
                    const importedHabit = payload.habits.find((item) => item.id === habit.id);
                    return importedHabit ? { ...habit, count: Number(importedHabit.count) || 0 } : habit;
                });
                saveHabits();
            }

            if (payload.goal && typeof payload.goal === "object") {
                state.goal = {
                    title: String(payload.goal.title || ""),
                    progress: clamp(Number(payload.goal.progress) || 0, 0, 100)
                };
                saveGoal();
            }

            if (payload.statistics && isValidDateKey(payload.statistics.selectedDate)) {
                selectedDate = payload.statistics.selectedDate;
                currentCalendarDate = parseDateKey(selectedDate);
                localStorage.setItem(STORAGE_KEYS.selectedDate, selectedDate);
            }

            applyTheme(state.theme);
            syncTaskViews();
            renderHabits();
            renderGoal();
        } catch {
            window.alert("Не удалось импортировать файл. Проверьте формат JSON.");
        } finally {
            event.target.value = "";
        }
    };

    reader.readAsText(file, "utf-8");
}

function syncTaskViews() {
    saveTasks();
    renderTasks();
    renderCalendar();
    renderProgressChart();
    updateStats();
    updateFilterUI();
}

function calculateProgress(tasks) {
    if (tasks.length === 0) {
        return 0;
    }

    const completed = tasks.filter((task) => task.completed).length;
    return Math.round((completed / tasks.length) * 100);
}

function formatShortDate(dateKey) {
    return parseDateKey(dateKey).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "short"
    });
}

function formatLongDate(dateKey) {
    return parseDateKey(dateKey).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function formatDisplayDate(dateKey) {
    return parseDateKey(dateKey).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function toDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
    const [year, month, day] = String(dateKey).split("-").map(Number);
    return new Date(year, month - 1, day);
}

function isValidDateKey(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
}

function getTodayKey() {
    return toDateKey(new Date());
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}