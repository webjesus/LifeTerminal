const APP_DATA_KEY = 'lifeTerminalData';
const CORRUPTED_BACKUP_KEY = 'lifeTerminalData_corrupted_backup';
const PRE_MIGRATION_BACKUP_KEY = 'lifeTerminalData_backup_before_migration';
const MIGRATION_DONE_KEY = 'lifeTerminalMigrationDone';
const CURRENT_DATA_VERSION = 1;

const LEGACY_STORAGE_KEYS = {
    theme: ['lifeTerminalTheme', 'life-terminal-theme'],
    tasks: ['lifeTerminalTasks', 'life-terminal-tasks'],
    habits: ['lifeTerminalHabits', 'life-terminal-habits'],
    goal: ['lifeTerminalGoal', 'life-terminal-goal'],
    selectedDate: ['lifeTerminalSelectedDate', 'life-terminal-selected-date']
};

const PRIORITIES = ['normal', 'important', 'urgent'];
const CATEGORIES = ['work', 'study', 'health', 'personal', 'other'];
const DEFAULT_HABITS = [
    { id: 'running', name: 'running', count: 0 },
    { id: 'study', name: 'study', count: 0 },
    { id: 'water', name: 'water', count: 0 },
    { id: 'reading', name: 'reading', count: 0 }
];

const HABIT_ICONS = {
    running: '↗',
    study: '⌁',
    water: '◔',
    reading: '☰'
};

const LOCALES = {
    ru: 'ru-RU',
    uk: 'uk-UA',
    en: 'en-US'
};

const translations = {
    ru: {
        brand: {
            eyebrow: 'Productivity OS',
            description: 'Единое рабочее пространство для фокуса, задач, привычек и личного прогресса.'
        },
        nav: {
            dashboard: 'Дашборд',
            tasks: 'Задачи',
            habits: 'Привычки',
            goals: 'Цели',
            calendar: 'Календарь',
            stats: 'Статистика',
            settings: 'Настройки'
        },
        workflow: {
            label: 'Workflow',
            title: 'Перетаскивай, планируй, повторяй.',
            description: 'Перетаскивайте задачи на даты календаря и держите день под контролем без лишнего шума.'
        },
        header: {
            eyebrow: 'Focus dashboard',
            title: 'Премиальный productivity workspace для вашего дня',
            subtitle: 'Минималистичный интерфейс для планирования задач, отслеживания привычек и контроля личных целей.'
        },
        common: {
            today: 'Сегодня',
            theme: 'Тема',
            light: 'Светлая',
            dark: 'Тёмная',
            guest: 'Гость',
            save: 'Сохранить',
            enabled: 'включено',
            disabled: 'выключено',
            local: 'локально'
        },
        hero: {
            badge: 'Premium productivity app',
            description: 'Чистый продуктовый интерфейс для управления задачами, календарём, привычками и целью месяца в одном месте.'
        },
        stats: {
            selectedDay: 'Selected day',
            title: 'Статистика дня',
            totalTasks: 'Всего задач',
            completedTasks: 'Выполнено',
            dayProgress: 'Прогресс',
            weeklyEyebrow: 'Weekly progress',
            weeklyTitle: 'Прогресс за 7 дней',
            weeklyDescription: 'Чистая визуализация выполнения задач и быстрый экспорт состояния workspace.'
        },
        tasks: {
            eyebrow: 'Task list',
            description: 'Чистый inbox для выбранной даты с фильтрами, поиском и drag-and-drop планированием.',
            quickAdd: 'Новая задача',
            addPlaceholder: 'Добавить задачу',
            addButton: 'Добавить',
            dragHint: 'Перетащите задачу на день календаря',
            searchPlaceholder: 'Поиск задач...',
            selectedDate: 'Выбранная дата: {date}',
            emptyNone: 'На выбранную дату задач пока нет.',
            emptySearch: 'Ничего не найдено по вашему запросу.',
            emptyCompleted: 'Нет выполненных задач для выбранной даты.',
            emptyActive: 'Нет активных задач для выбранной даты.',
            delete: 'Удалить задачу',
            filter: {
                all: 'Все',
                active: 'Активные',
                completed: 'Выполненные'
            },
            priority: {
                normal: 'Обычная',
                important: 'Важная',
                urgent: 'Срочная'
            },
            category: {
                work: 'Работа',
                study: 'Учёба',
                health: 'Здоровье',
                personal: 'Личное',
                other: 'Другое'
            }
        },
        calendar: {
            eyebrow: 'Calendar',
            subtitle: 'Выберите день для просмотра задач',
            selectedDate: 'Выбрано: {date}',
            weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            summary: {
                total: 'Всего',
                completed: 'Выполнено',
                remaining: 'Осталось'
            }
        },
        habits: {
            eyebrow: 'Habit tracker',
            description: 'Ежедневные ритуалы в компактных product-cards с понятной динамикой.',
            hint: 'Нажмите, чтобы увеличить',
            names: {
                running: 'Бег',
                study: 'Учёба',
                water: 'Вода',
                reading: 'Чтение'
            }
        },
        goals: {
            eyebrow: 'Monthly goal',
            description: 'Сосредоточьтесь на одной важной цели и отслеживайте прогресс визуально.',
            goalTitleLabel: 'Название цели',
            progressLabel: 'Прогресс',
            placeholder: 'Например: 20 тренировок за месяц',
            empty: 'Цель пока не задана'
        },
        settings: {
            title: 'Настройки',
            subtitle: 'Локальный профиль, язык и безопасное управление данными в браузере.',
            profile: 'Профиль',
            profileDescription: 'Личные данные сохраняются локально в этом браузере.',
            avatarUpload: 'Загрузить аватар',
            avatarHint: 'Аватар хранится локально в base64 до подключения облачной синхронизации.',
            displayName: 'Отображаемое имя',
            firstName: 'Имя',
            lastName: 'Фамилия',
            username: 'Username',
            email: 'Email',
            usernameHint: 'Локальный username. Он уникален только на этом устройстве.',
            language: 'Язык',
            languageDescription: 'Меняйте язык интерфейса и тему без перезагрузки страницы.',
            data: 'Данные',
            dataDescription: 'Резервное копирование и перенос локальных данных без потери состояния после деплоев.',
            exportData: 'Экспорт JSON',
            importData: 'Импорт JSON',
            resetData: 'Сбросить данные',
            storageMode: 'Режим хранения',
            cloudSync: 'Cloud sync',
            account: 'Аккаунт',
            accountDescription: 'Подготовка под будущую облачную авторизацию без подключения backend на этом этапе.',
            localProfile: 'Local profile',
            active: 'Active',
            emailLogin: 'Email login',
            googleLogin: 'Google login',
            comingSoon: 'Скоро',
            accountHint: 'Ваши данные сейчас хранятся локально в этом браузере. Для cloud sync нужна интеграция с Supabase/Firebase.',
            confirmReset: 'Сбросить все локальные данные Life Terminal на этом устройстве?',
            profileSaved: 'Профиль сохранён локально.',
            avatarSaved: 'Аватар сохранён локально.',
            exportSuccess: 'Резервная копия данных экспортирована.',
            importSuccess: 'Данные успешно импортированы.',
            importFailed: 'Не удалось импортировать JSON. Проверьте файл и попробуйте снова.',
            resetSuccess: 'Локальные данные сброшены.',
            usernameError: 'Username должен содержать минимум 3 символа после @.'
        }
    },
    uk: {
        brand: {
            eyebrow: 'Productivity OS',
            description: 'Єдиний робочий простір для фокусу, задач, звичок і особистого прогресу.'
        },
        nav: {
            dashboard: 'Панель',
            tasks: 'Завдання',
            habits: 'Звички',
            goals: 'Цілі',
            calendar: 'Календар',
            stats: 'Статистика',
            settings: 'Налаштування'
        },
        workflow: {
            label: 'Workflow',
            title: 'Перетягуй, плануй, повторюй.',
            description: 'Перетягуйте завдання на дні календаря й тримайте день під контролем без зайвого шуму.'
        },
        header: {
            eyebrow: 'Focus dashboard',
            title: 'Преміальний productivity workspace для вашого дня',
            subtitle: 'Мінімалістичний інтерфейс для планування завдань, відстеження звичок і контролю особистих цілей.'
        },
        common: {
            today: 'Сьогодні',
            theme: 'Тема',
            light: 'Світла',
            dark: 'Темна',
            guest: 'Гість',
            save: 'Зберегти',
            enabled: 'увімкнено',
            disabled: 'вимкнено',
            local: 'локально'
        },
        hero: {
            badge: 'Premium productivity app',
            description: 'Чистий продуктовий інтерфейс для керування завданнями, календарем, звичками та ціллю місяця в одному місці.'
        },
        stats: {
            selectedDay: 'Selected day',
            title: 'Статистика дня',
            totalTasks: 'Усього завдань',
            completedTasks: 'Виконано',
            dayProgress: 'Прогрес',
            weeklyEyebrow: 'Weekly progress',
            weeklyTitle: 'Прогрес за 7 днів',
            weeklyDescription: 'Чиста візуалізація виконання завдань і швидкий експорт стану workspace.'
        },
        tasks: {
            eyebrow: 'Task list',
            description: 'Чистий inbox для вибраної дати з фільтрами, пошуком і drag-and-drop плануванням.',
            quickAdd: 'Нове завдання',
            addPlaceholder: 'Додати завдання',
            addButton: 'Додати',
            dragHint: 'Перетягніть завдання на день календаря',
            searchPlaceholder: 'Пошук завдань...',
            selectedDate: 'Вибрана дата: {date}',
            emptyNone: 'На вибрану дату ще немає завдань.',
            emptySearch: 'Нічого не знайдено за вашим запитом.',
            emptyCompleted: 'Немає виконаних завдань для вибраної дати.',
            emptyActive: 'Немає активних завдань для вибраної дати.',
            delete: 'Видалити завдання',
            filter: {
                all: 'Усі',
                active: 'Активні',
                completed: 'Виконані'
            },
            priority: {
                normal: 'Звичайна',
                important: 'Важлива',
                urgent: 'Термінова'
            },
            category: {
                work: 'Робота',
                study: 'Навчання',
                health: 'Здоровʼя',
                personal: 'Особисте',
                other: 'Інше'
            }
        },
        calendar: {
            eyebrow: 'Calendar',
            subtitle: 'Оберіть день для перегляду завдань',
            selectedDate: 'Обрано: {date}',
            weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
            summary: {
                total: 'Усього',
                completed: 'Виконано',
                remaining: 'Залишилось'
            }
        },
        habits: {
            eyebrow: 'Habit tracker',
            description: 'Щоденні ритуали у компактних product-cards з наочною динамікою.',
            hint: 'Натисніть, щоб збільшити',
            names: {
                running: 'Біг',
                study: 'Навчання',
                water: 'Вода',
                reading: 'Читання'
            }
        },
        goals: {
            eyebrow: 'Monthly goal',
            description: 'Сфокусуйтеся на одній важливій цілі та відстежуйте прогрес візуально.',
            goalTitleLabel: 'Назва цілі',
            progressLabel: 'Прогрес',
            placeholder: 'Наприклад: 20 тренувань за місяць',
            empty: 'Ціль ще не задано'
        },
        settings: {
            title: 'Налаштування',
            subtitle: 'Локальний профіль, мова та безпечне керування даними в браузері.',
            profile: 'Профіль',
            profileDescription: 'Особисті дані зберігаються локально в цьому браузері.',
            avatarUpload: 'Завантажити аватар',
            avatarHint: 'Аватар зберігається локально в base64 до підключення хмарної синхронізації.',
            displayName: 'Відображуване імʼя',
            firstName: 'Імʼя',
            lastName: 'Прізвище',
            username: 'Username',
            email: 'Email',
            usernameHint: 'Локальний username. Він унікальний лише на цьому пристрої.',
            language: 'Мова',
            languageDescription: 'Змінюйте мову інтерфейсу й тему без перезавантаження сторінки.',
            data: 'Дані',
            dataDescription: 'Резервне копіювання та перенесення локальних даних без втрати стану після деплоїв.',
            exportData: 'Експорт JSON',
            importData: 'Імпорт JSON',
            resetData: 'Скинути дані',
            storageMode: 'Режим зберігання',
            cloudSync: 'Cloud sync',
            account: 'Акаунт',
            accountDescription: 'Підготовка до майбутньої хмарної авторизації без підключення backend на цьому етапі.',
            localProfile: 'Local profile',
            active: 'Active',
            emailLogin: 'Email login',
            googleLogin: 'Google login',
            comingSoon: 'Незабаром',
            accountHint: 'Ваші дані зараз зберігаються локально в цьому браузері. Для cloud sync потрібна інтеграція з Supabase/Firebase.',
            confirmReset: 'Скинути всі локальні дані Life Terminal на цьому пристрої?',
            profileSaved: 'Профіль збережено локально.',
            avatarSaved: 'Аватар збережено локально.',
            exportSuccess: 'Резервну копію даних експортовано.',
            importSuccess: 'Дані успішно імпортовано.',
            importFailed: 'Не вдалося імпортувати JSON. Перевірте файл і спробуйте ще раз.',
            resetSuccess: 'Локальні дані скинуто.',
            usernameError: 'Username має містити щонайменше 3 символи після @.'
        }
    },
    en: {
        brand: {
            eyebrow: 'Productivity OS',
            description: 'A single workspace for focus, tasks, habits, and personal progress.'
        },
        nav: {
            dashboard: 'Dashboard',
            tasks: 'Tasks',
            habits: 'Habits',
            goals: 'Goals',
            calendar: 'Calendar',
            stats: 'Stats',
            settings: 'Settings'
        },
        workflow: {
            label: 'Workflow',
            title: 'Drag, plan, iterate.',
            description: 'Drag tasks onto calendar days and keep your day under control without extra noise.'
        },
        header: {
            eyebrow: 'Focus dashboard',
            title: 'A premium productivity workspace for your day',
            subtitle: 'A minimal interface for planning tasks, tracking habits, and managing personal goals.'
        },
        common: {
            today: 'Today',
            theme: 'Theme',
            light: 'Light',
            dark: 'Dark',
            guest: 'Guest',
            save: 'Save',
            enabled: 'enabled',
            disabled: 'disabled',
            local: 'local'
        },
        hero: {
            badge: 'Premium productivity app',
            description: 'A clean product interface for tasks, calendar planning, habits, and monthly goals in one place.'
        },
        stats: {
            selectedDay: 'Selected day',
            title: 'Daily stats',
            totalTasks: 'Total tasks',
            completedTasks: 'Completed',
            dayProgress: 'Progress',
            weeklyEyebrow: 'Weekly progress',
            weeklyTitle: 'Progress over 7 days',
            weeklyDescription: 'A clean view of task completion plus quick workspace export.'
        },
        tasks: {
            eyebrow: 'Task list',
            description: 'A clean inbox for the selected date with filters, search, and drag-and-drop planning.',
            quickAdd: 'New task',
            addPlaceholder: 'Add a task',
            addButton: 'Add',
            dragHint: 'Drag a task onto a calendar day',
            searchPlaceholder: 'Search tasks...',
            selectedDate: 'Selected date: {date}',
            emptyNone: 'No tasks yet for the selected date.',
            emptySearch: 'Nothing matched your search.',
            emptyCompleted: 'No completed tasks for the selected date.',
            emptyActive: 'No active tasks for the selected date.',
            delete: 'Delete task',
            filter: {
                all: 'All',
                active: 'Active',
                completed: 'Completed'
            },
            priority: {
                normal: 'Normal',
                important: 'Important',
                urgent: 'Urgent'
            },
            category: {
                work: 'Work',
                study: 'Study',
                health: 'Health',
                personal: 'Personal',
                other: 'Other'
            }
        },
        calendar: {
            eyebrow: 'Calendar',
            subtitle: 'Choose a day to review tasks',
            selectedDate: 'Selected: {date}',
            weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            summary: {
                total: 'Total',
                completed: 'Completed',
                remaining: 'Remaining'
            }
        },
        habits: {
            eyebrow: 'Habit tracker',
            description: 'Daily rituals in compact product cards with clear momentum.',
            hint: 'Click to increment',
            names: {
                running: 'Running',
                study: 'Study',
                water: 'Water',
                reading: 'Reading'
            }
        },
        goals: {
            eyebrow: 'Monthly goal',
            description: 'Focus on one important goal and track progress visually.',
            goalTitleLabel: 'Goal title',
            progressLabel: 'Progress',
            placeholder: 'For example: 20 workouts this month',
            empty: 'No goal set yet'
        },
        settings: {
            title: 'Settings',
            subtitle: 'Local profile, language, and safe browser-based data management.',
            profile: 'Profile',
            profileDescription: 'Personal details are stored locally in this browser.',
            avatarUpload: 'Upload avatar',
            avatarHint: 'The avatar is stored locally as base64 until cloud sync is added.',
            displayName: 'Display name',
            firstName: 'First name',
            lastName: 'Last name',
            username: 'Username',
            email: 'Email',
            usernameHint: 'Local username. It is unique only on this device.',
            language: 'Language',
            languageDescription: 'Switch the interface language and theme without reloading the page.',
            data: 'Data',
            dataDescription: 'Back up and move local data without losing state across deployments.',
            exportData: 'Export JSON',
            importData: 'Import JSON',
            resetData: 'Reset data',
            storageMode: 'Storage mode',
            cloudSync: 'Cloud sync',
            account: 'Account',
            accountDescription: 'Prepared for future cloud auth without connecting a backend yet.',
            localProfile: 'Local profile',
            active: 'Active',
            emailLogin: 'Email login',
            googleLogin: 'Google login',
            comingSoon: 'Coming soon',
            accountHint: 'Your data is stored locally in this browser. Cloud sync requires Supabase/Firebase integration.',
            confirmReset: 'Reset all local Life Terminal data on this device?',
            profileSaved: 'Profile saved locally.',
            avatarSaved: 'Avatar saved locally.',
            exportSuccess: 'Data backup exported.',
            importSuccess: 'Data imported successfully.',
            importFailed: 'Could not import JSON. Check the file and try again.',
            resetSuccess: 'Local data has been reset.',
            usernameError: 'Username must contain at least 3 characters after @.'
        }
    }
};

const elements = {
    themeToggle: document.getElementById('themeToggle'),
    themeIcon: document.getElementById('themeIcon'),
    currentDateLabel: document.getElementById('currentDateLabel'),
    statsDateLabel: document.getElementById('statsDateLabel'),
    totalTasks: document.getElementById('totalTasks'),
    completedTasks: document.getElementById('completedTasks'),
    taskProgress: document.getElementById('taskProgress'),
    progressPercent: document.getElementById('progressPercent'),
    taskForm: document.getElementById('taskForm'),
    taskInput: document.getElementById('taskInput'),
    prioritySelect: document.getElementById('prioritySelect'),
    categorySelect: document.getElementById('categorySelect'),
    taskSelectedDateLabel: document.getElementById('taskSelectedDateLabel'),
    taskFilters: document.getElementById('taskFilters'),
    searchInput: document.getElementById('searchInput'),
    taskList: document.getElementById('taskList'),
    taskEmptyState: document.getElementById('taskEmptyState'),
    taskTemplate: document.getElementById('taskTemplate'),
    habitGrid: document.getElementById('habitGrid'),
    habitTemplate: document.getElementById('habitTemplate'),
    goalTitle: document.getElementById('goalTitle'),
    goalProgress: document.getElementById('goalProgress'),
    goalProgressValue: document.getElementById('goalProgressValue'),
    goalPreviewTitle: document.getElementById('goalPreviewTitle'),
    goalPreviewPercent: document.getElementById('goalPreviewPercent'),
    goalProgressFill: document.getElementById('goalProgressFill'),
    calendarPrev: document.getElementById('calendarPrev'),
    calendarNext: document.getElementById('calendarNext'),
    calendarMonthLabel: document.getElementById('calendarMonthLabel'),
    selectedDateLabel: document.getElementById('selectedDateLabel'),
    calendarSubtitle: document.getElementById('calendarSubtitle'),
    calendarWeekdays: document.getElementById('calendarWeekdays'),
    calendarGrid: document.getElementById('calendarGrid'),
    summaryTotal: document.getElementById('summaryTotal'),
    summaryCompleted: document.getElementById('summaryCompleted'),
    summaryActive: document.getElementById('summaryActive'),
    progressChart: document.getElementById('progressChart'),
    exportButton: document.getElementById('exportButton'),
    importButton: document.getElementById('importButton'),
    importInput: document.getElementById('importInput'),
    sidebarAvatar: document.getElementById('sidebarAvatar'),
    headerAvatar: document.getElementById('headerAvatar'),
    modalAvatarPreview: document.getElementById('modalAvatarPreview'),
    sidebarProfileName: document.getElementById('sidebarProfileName'),
    sidebarProfileHandle: document.getElementById('sidebarProfileHandle'),
    headerProfileName: document.getElementById('headerProfileName'),
    headerProfileHandle: document.getElementById('headerProfileHandle'),
    settingsNavTrigger: document.getElementById('settingsNavTrigger'),
    settingsQuickTrigger: document.getElementById('settingsQuickTrigger'),
    settingsModal: document.getElementById('settingsModal'),
    settingsClose: document.getElementById('settingsClose'),
    profileForm: document.getElementById('profileForm'),
    displayNameInput: document.getElementById('displayNameInput'),
    firstNameInput: document.getElementById('firstNameInput'),
    lastNameInput: document.getElementById('lastNameInput'),
    usernameInput: document.getElementById('usernameInput'),
    emailInput: document.getElementById('emailInput'),
    avatarInput: document.getElementById('avatarInput'),
    languageSelect: document.getElementById('languageSelect'),
    themeSelect: document.getElementById('themeSelect'),
    settingsExportButton: document.getElementById('settingsExportButton'),
    settingsImportButton: document.getElementById('settingsImportButton'),
    settingsImportInput: document.getElementById('settingsImportInput'),
    settingsResetButton: document.getElementById('settingsResetButton'),
    storageModeValue: document.getElementById('storageModeValue'),
    cloudSyncValue: document.getElementById('cloudSyncValue'),
    toast: document.getElementById('toast')
};

let currentFilter = 'all';
let searchQuery = '';
let draggedTaskId = null;
let toastTimer = null;
let appData = loadAppData();

function init() {
    bindEvents();
    renderApp();
}

function createDefaultAppData() {
    const today = getTodayKey();
    const timestamp = new Date().toISOString();

    return {
        version: CURRENT_DATA_VERSION,
        profile: {
            avatar: '',
            displayName: '',
            firstName: '',
            lastName: '',
            username: '',
            email: ''
        },
        settings: {
            theme: 'light',
            language: 'ru'
        },
        tasks: [],
        habits: DEFAULT_HABITS.map((habit) => ({ ...habit })),
        goal: {
            title: '',
            progress: 0
        },
        calendar: {
            selectedDate: today,
            currentCalendarDate: today
        },
        meta: {
            createdAt: timestamp,
            lastUpdated: timestamp,
            lastExportedAt: '',
            lastImportedAt: '',
            storageMode: 'local',
            cloudSyncEnabled: false,
            remoteUserId: null
        }
    };
}

function bindEvents() {
    elements.themeToggle.addEventListener('click', handleThemeToggle);
    elements.taskForm.addEventListener('submit', handleTaskSubmit);
    elements.taskFilters.addEventListener('click', handleFilterClick);
    elements.searchInput.addEventListener('input', handleSearchInput);
    elements.goalTitle.addEventListener('input', handleGoalChange);
    elements.goalProgress.addEventListener('input', handleGoalChange);
    elements.calendarPrev.addEventListener('click', () => changeCalendarMonth(-1));
    elements.calendarNext.addEventListener('click', () => changeCalendarMonth(1));
    elements.exportButton.addEventListener('click', exportAppData);
    elements.importButton.addEventListener('click', () => elements.importInput.click());
    elements.importInput.addEventListener('change', handleImportChange);
    elements.settingsExportButton.addEventListener('click', exportAppData);
    elements.settingsImportButton.addEventListener('click', () => elements.settingsImportInput.click());
    elements.settingsImportInput.addEventListener('change', handleImportChange);
    elements.settingsResetButton.addEventListener('click', handleResetData);
    elements.settingsNavTrigger.addEventListener('click', openSettingsModal);
    elements.settingsQuickTrigger.addEventListener('click', openSettingsModal);
    elements.settingsClose.addEventListener('click', closeSettingsModal);
    elements.settingsModal.addEventListener('click', (event) => {
        if (event.target === elements.settingsModal) {
            closeSettingsModal();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !elements.settingsModal.hidden) {
            closeSettingsModal();
        }
    });
    elements.profileForm.addEventListener('submit', handleProfileSubmit);
    elements.usernameInput.addEventListener('input', handleUsernameInput);
    elements.avatarInput.addEventListener('change', handleAvatarUpload);
    elements.languageSelect.addEventListener('change', handleLanguageChange);
    elements.themeSelect.addEventListener('change', handleThemeSelectChange);
}

function renderApp() {
    applyTheme(appData.settings.theme);
    applyTranslations();
    syncSettingsControls();
    syncProfileForm();
    renderProfileSummary();
    renderHeaderDate();
    renderGoal();
    renderHabits();
    renderCalendarWeekdays();
    syncTaskViews();
    renderStorageInfo();
}

function loadAppData() {
    migrateLegacyData();

    const raw = localStorage.getItem(APP_DATA_KEY);
    if (!raw) {
        const defaultData = normalizeAppData(createDefaultAppData());
        localStorage.setItem(APP_DATA_KEY, JSON.stringify(defaultData));
        return defaultData;
    }

    try {
        const parsed = JSON.parse(raw);
        const migrated = migrateAppData(parsed, raw);
        return normalizeAppData(migrated);
    } catch {
        localStorage.setItem(CORRUPTED_BACKUP_KEY, raw);
        const recovered = normalizeAppData(mergeLegacyIntoBase(createDefaultAppData(), collectLegacyData()));
        localStorage.setItem(APP_DATA_KEY, JSON.stringify(recovered));
        return recovered;
    }
}

function migrateLegacyData() {
    const legacy = collectLegacyData();
    const hasLegacyData = legacyHasMeaningfulData(legacy);
    const existingRaw = localStorage.getItem(APP_DATA_KEY);
    const migrationDone = localStorage.getItem(MIGRATION_DONE_KEY) === 'true';

    if (!hasLegacyData) {
        if (!migrationDone) {
            localStorage.setItem(MIGRATION_DONE_KEY, 'true');
        }
        return;
    }

    let base = createDefaultAppData();
    if (existingRaw) {
        try {
            base = normalizeAppData(JSON.parse(existingRaw));
        } catch {
            localStorage.setItem(CORRUPTED_BACKUP_KEY, existingRaw);
        }
    }

    const merged = normalizeAppData(mergeLegacyIntoBase(base, legacy));

    if (existingRaw && existingRaw !== JSON.stringify(merged)) {
        localStorage.setItem(PRE_MIGRATION_BACKUP_KEY, existingRaw);
    }

    if (!existingRaw || JSON.stringify(merged) !== existingRaw) {
        localStorage.setItem(APP_DATA_KEY, JSON.stringify(merged));
    }

    localStorage.setItem(MIGRATION_DONE_KEY, 'true');
}

function migrateAppData(data, raw) {
    const normalized = normalizeAppData(data);
    if (!data || typeof data !== 'object' || data.version !== CURRENT_DATA_VERSION) {
        if (raw) {
            localStorage.setItem(PRE_MIGRATION_BACKUP_KEY, raw);
        }
        return normalized;
    }

    return normalized;
}

function normalizeAppData(data) {
    const defaults = createDefaultAppData();
    const profile = isPlainObject(data?.profile) ? data.profile : {};
    const settings = isPlainObject(data?.settings) ? data.settings : {};
    const calendar = isPlainObject(data?.calendar) ? data.calendar : {};
    const meta = isPlainObject(data?.meta) ? data.meta : {};
    const selectedDate = isValidDateKey(calendar.selectedDate) ? calendar.selectedDate : defaults.calendar.selectedDate;
    const currentCalendarDate = isValidDateKey(calendar.currentCalendarDate) ? calendar.currentCalendarDate : selectedDate;

    return {
        version: CURRENT_DATA_VERSION,
        profile: {
            avatar: typeof profile.avatar === 'string' ? profile.avatar : '',
            displayName: normalizeText(profile.displayName, 60),
            firstName: normalizeText(profile.firstName, 60),
            lastName: normalizeText(profile.lastName, 60),
            username: normalizeUsername(profile.username),
            email: normalizeText(profile.email, 100)
        },
        settings: {
            theme: settings.theme === 'dark' ? 'dark' : 'light',
            language: Object.hasOwn(LOCALES, settings.language) ? settings.language : defaults.settings.language
        },
        tasks: normalizeTasks(data?.tasks, selectedDate),
        habits: normalizeHabits(data?.habits),
        goal: normalizeGoal(data?.goal),
        calendar: {
            selectedDate,
            currentCalendarDate
        },
        meta: {
            createdAt: typeof meta.createdAt === 'string' && meta.createdAt ? meta.createdAt : defaults.meta.createdAt,
            lastUpdated: typeof meta.lastUpdated === 'string' && meta.lastUpdated ? meta.lastUpdated : defaults.meta.lastUpdated,
            lastExportedAt: typeof meta.lastExportedAt === 'string' ? meta.lastExportedAt : '',
            lastImportedAt: typeof meta.lastImportedAt === 'string' ? meta.lastImportedAt : '',
            storageMode: typeof meta.storageMode === 'string' && meta.storageMode ? meta.storageMode : 'local',
            cloudSyncEnabled: Boolean(meta.cloudSyncEnabled),
            remoteUserId: typeof meta.remoteUserId === 'string' && meta.remoteUserId ? meta.remoteUserId : null
        }
    };
}

function normalizeTasks(input, fallbackDate) {
    if (!Array.isArray(input)) {
        return [];
    }

    return input
        .map((task, index) => normalizeTask(task, index, fallbackDate))
        .filter(Boolean);
}

function normalizeTask(task, index, fallbackDate) {
    if (!isPlainObject(task) || typeof task.text !== 'string') {
        return null;
    }

    const text = normalizeText(task.text, 100);
    if (!text) {
        return null;
    }

    return {
        id: typeof task.id === 'string' && task.id ? task.id : createId(`task-${index}`),
        text,
        priority: PRIORITIES.includes(task.priority) ? task.priority : 'normal',
        category: CATEGORIES.includes(task.category) ? task.category : 'other',
        completed: Boolean(task.completed),
        date: isValidDateKey(task.date) ? task.date : (isValidDateKey(fallbackDate) ? fallbackDate : getTodayKey()),
        createdAt: typeof task.createdAt === 'string' && task.createdAt ? task.createdAt : new Date().toISOString()
    };
}

function normalizeHabits(input) {
    const savedHabits = Array.isArray(input) ? input.filter(isPlainObject) : [];
    const normalizedDefaults = DEFAULT_HABITS.map((defaultHabit, index) => {
        const match = savedHabits.find((habit) => habit.id === defaultHabit.id || inferHabitId(habit.name) === defaultHabit.id);
        return {
            id: defaultHabit.id,
            name: defaultHabit.name,
            count: clamp(Number(match?.count || 0), 0, 999)
        };
    });

    const extraHabits = savedHabits
        .map((habit, index) => ({
            id: typeof habit.id === 'string' && habit.id ? habit.id : createId(`habit-${index}`),
            name: normalizeText(habit.name, 40) || `habit-${index + 1}`,
            count: clamp(Number(habit.count || 0), 0, 999)
        }))
        .filter((habit) => !normalizedDefaults.some((defaultHabit) => defaultHabit.id === habit.id));

    return [...normalizedDefaults, ...extraHabits];
}

function normalizeGoal(goal) {
    const source = isPlainObject(goal) ? goal : {};
    return {
        title: normalizeText(source.title, 120),
        progress: clamp(Number(source.progress || 0), 0, 100)
    };
}

function collectLegacyData() {
    return {
        theme: readStringValue(LEGACY_STORAGE_KEYS.theme),
        tasks: readJsonValue(LEGACY_STORAGE_KEYS.tasks),
        habits: readJsonValue(LEGACY_STORAGE_KEYS.habits),
        goal: readJsonValue(LEGACY_STORAGE_KEYS.goal),
        selectedDate: readStringValue(LEGACY_STORAGE_KEYS.selectedDate)
    };
}

function mergeLegacyIntoBase(base, legacy) {
    const merged = normalizeAppData(base);
    const defaultData = createDefaultAppData();
    const legacyTasks = normalizeTasks(legacy.tasks, legacy.selectedDate || merged.calendar.selectedDate);
    const legacyHabits = normalizeHabits(legacy.habits);
    const legacyGoal = normalizeGoal(legacy.goal);

    if ((!Array.isArray(merged.tasks) || merged.tasks.length === 0) && legacyTasks.length) {
        merged.tasks = legacyTasks;
    }

    if (merged.habits.every((habit) => habit.count === 0) && legacyHabits.some((habit) => habit.count > 0)) {
        merged.habits = legacyHabits;
    }

    if (!merged.goal.title && merged.goal.progress === 0 && (legacyGoal.title || legacyGoal.progress > 0)) {
        merged.goal = legacyGoal;
    }

    if ((!merged.settings.theme || merged.settings.theme === defaultData.settings.theme) && (legacy.theme === 'dark' || legacy.theme === 'light')) {
        merged.settings.theme = legacy.theme;
    }

    if (isValidDateKey(legacy.selectedDate) && (!merged.calendar.selectedDate || merged.calendar.selectedDate === defaultData.calendar.selectedDate)) {
        merged.calendar.selectedDate = legacy.selectedDate;
        merged.calendar.currentCalendarDate = legacy.selectedDate;
    }

    return merged;
}

function legacyHasMeaningfulData(legacy) {
    return (legacy.theme === 'light' || legacy.theme === 'dark')
        || (Array.isArray(legacy.tasks) && legacy.tasks.length > 0)
        || (Array.isArray(legacy.habits) && legacy.habits.length > 0)
        || isPlainObject(legacy.goal)
        || isValidDateKey(legacy.selectedDate);
}

function readStringValue(keys) {
    for (const key of keys) {
        const value = localStorage.getItem(key);
        if (typeof value === 'string' && value) {
            return value;
        }
    }

    return '';
}

function readJsonValue(keys) {
    for (const key of keys) {
        const raw = localStorage.getItem(key);
        if (!raw) {
            continue;
        }

        try {
            return JSON.parse(raw);
        } catch {
            continue;
        }
    }

    return null;
}

function saveAppData() {
    appData = normalizeAppData(appData);
    appData.meta.lastUpdated = new Date().toISOString();
    localStorage.setItem(APP_DATA_KEY, JSON.stringify(appData));
}

function applyTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    elements.themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
}

function applyTranslations() {
    const language = getCurrentLanguage();
    document.documentElement.lang = language;

    document.querySelectorAll('[data-i18n]').forEach((node) => {
        const value = t(node.dataset.i18n);
        if (typeof value === 'string') {
            node.textContent = value;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
        if ('placeholder' in node) {
            node.placeholder = t(node.dataset.i18nPlaceholder);
        }
    });

    elements.taskSelectedDateLabel.textContent = t('tasks.selectedDate', { date: formatLongDate(getSelectedDate()) });
    elements.calendarSubtitle.textContent = t('calendar.subtitle');
    elements.selectedDateLabel.textContent = t('calendar.selectedDate', { date: formatLongDate(getSelectedDate()) });
    elements.taskEmptyState.textContent = getEmptyStateText();
}

function renderHeaderDate() {
    const formatter = new Intl.DateTimeFormat(getLocale(), {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    elements.currentDateLabel.textContent = formatter.format(new Date());
}

function handleThemeToggle() {
    appData.settings.theme = appData.settings.theme === 'dark' ? 'light' : 'dark';
    saveAppData();
    renderApp();
}

function handleThemeSelectChange(event) {
    appData.settings.theme = event.target.value === 'dark' ? 'dark' : 'light';
    saveAppData();
    renderApp();
}

function handleLanguageChange(event) {
    const nextLanguage = Object.hasOwn(LOCALES, event.target.value) ? event.target.value : 'ru';
    appData.settings.language = nextLanguage;
    saveAppData();
    renderApp();
}

function handleTaskSubmit(event) {
    event.preventDefault();

    const text = normalizeText(elements.taskInput.value, 100);
    if (!text) {
        return;
    }

    appData.tasks.unshift(normalizeTask({
        id: createId('task'),
        text,
        priority: elements.prioritySelect.value,
        category: elements.categorySelect.value,
        completed: false,
        date: getSelectedDate(),
        createdAt: new Date().toISOString()
    }, 0, getSelectedDate()));

    saveAppData();
    elements.taskForm.reset();
    elements.prioritySelect.value = 'normal';
    elements.categorySelect.value = 'work';
    syncTaskViews();
}

function handleFilterClick(event) {
    const button = event.target.closest('[data-filter]');
    if (!button) {
        return;
    }

    currentFilter = button.dataset.filter;
    updateFilterUI();
    renderTasks();
}

function handleSearchInput(event) {
    searchQuery = event.target.value.trim().toLowerCase();
    renderTasks();
}

function getSelectedDate() {
    return appData.calendar.selectedDate;
}

function getCurrentCalendarDate() {
    return parseDateKey(appData.calendar.currentCalendarDate);
}

function getTasksForSelectedDate() {
    return appData.tasks.filter((task) => task.date === getSelectedDate());
}

function getFilteredTasks() {
    return getTasksForSelectedDate().filter((task) => {
        const matchesFilter = currentFilter === 'all'
            || (currentFilter === 'active' && !task.completed)
            || (currentFilter === 'completed' && task.completed);
        const matchesSearch = !searchQuery || task.text.toLowerCase().includes(searchQuery);
        return matchesFilter && matchesSearch;
    });
}

function renderTasks() {
    const tasks = getFilteredTasks();
    elements.taskList.innerHTML = '';
    updateFilterUI();

    if (!tasks.length) {
        elements.taskEmptyState.hidden = false;
        elements.taskEmptyState.textContent = getEmptyStateText();
        return;
    }

    elements.taskEmptyState.hidden = true;

    tasks.forEach((task) => {
        const fragment = elements.taskTemplate.content.cloneNode(true);
        const item = fragment.querySelector('.task-item');
        const checkbox = fragment.querySelector('.task-item__checkbox');
        const text = fragment.querySelector('.task-item__text');
        const priority = fragment.querySelector('.task-item__priority');
        const category = fragment.querySelector('.task-item__category');
        const date = fragment.querySelector('.task-item__date');
        const deleteButton = fragment.querySelector('.task-item__delete');

        item.dataset.taskId = task.id;
        item.draggable = true;
        item.classList.toggle('is-completed', task.completed);

        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(task.id, checkbox.checked));

        text.textContent = task.text;
        priority.textContent = t(`tasks.priority.${task.priority}`);
        priority.classList.add(`priority-${task.priority}`);
        category.textContent = t(`tasks.category.${task.category}`);
        date.textContent = formatShortDate(task.date);
        deleteButton.setAttribute('aria-label', t('tasks.delete'));
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        item.addEventListener('dragstart', (dragEvent) => {
            draggedTaskId = task.id;
            item.classList.add('is-dragging');
            if (dragEvent.dataTransfer) {
                dragEvent.dataTransfer.effectAllowed = 'move';
                dragEvent.dataTransfer.setData('text/plain', task.id);
            }
        });

        item.addEventListener('dragend', () => {
            draggedTaskId = null;
            item.classList.remove('is-dragging');
            clearCalendarDropTargets();
        });

        elements.taskList.append(fragment);
    });
}

function toggleTaskCompletion(taskId, completed) {
    const task = appData.tasks.find((entry) => entry.id === taskId);
    if (!task) {
        return;
    }

    task.completed = completed;
    saveAppData();
    syncTaskViews();
}

function deleteTask(taskId) {
    appData.tasks = appData.tasks.filter((task) => task.id !== taskId);
    saveAppData();
    syncTaskViews();
}

function getEmptyStateText() {
    const tasksForDay = getTasksForSelectedDate();
    if (!tasksForDay.length) {
        return t('tasks.emptyNone');
    }

    if (searchQuery) {
        return t('tasks.emptySearch');
    }

    return currentFilter === 'completed' ? t('tasks.emptyCompleted') : t('tasks.emptyActive');
}

function updateFilterUI() {
    elements.taskFilters.querySelectorAll('[data-filter]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.filter === currentFilter);
    });
}

function updateStats() {
    const tasksForDay = getTasksForSelectedDate();
    const total = tasksForDay.length;
    const completed = tasksForDay.filter((task) => task.completed).length;
    const progress = total ? Math.round((completed / total) * 100) : 0;
    const degrees = (progress / 100) * 360;

    elements.totalTasks.textContent = String(total);
    elements.completedTasks.textContent = String(completed);
    elements.taskProgress.textContent = `${progress}%`;
    elements.progressPercent.textContent = `${progress}%`;
    elements.statsDateLabel.textContent = formatLongDate(getSelectedDate());
    elements.progressPercent.parentElement.style.background = `conic-gradient(var(--accent) ${degrees}deg, rgba(148, 163, 184, 0.16) ${degrees}deg)`;
}

function renderCalendarSummary(tasksForDay) {
    const completed = tasksForDay.filter((task) => task.completed).length;
    elements.summaryTotal.textContent = String(tasksForDay.length);
    elements.summaryCompleted.textContent = String(completed);
    elements.summaryActive.textContent = String(tasksForDay.length - completed);
}

function renderHabits() {
    elements.habitGrid.innerHTML = '';

    appData.habits.forEach((habit) => {
        const fragment = elements.habitTemplate.content.cloneNode(true);
        const button = fragment.querySelector('.habit-card');
        const icon = fragment.querySelector('.habit-card__icon');
        const name = fragment.querySelector('.habit-card__name');
        const count = fragment.querySelector('.habit-card__count');
        const hint = fragment.querySelector('.habit-card__hint');

        icon.textContent = HABIT_ICONS[habit.id] || '•';
        name.textContent = getHabitLabel(habit);
        count.textContent = String(habit.count);
        hint.textContent = t('habits.hint');

        button.addEventListener('click', () => {
            habit.count = clamp(habit.count + 1, 0, 999);
            saveAppData();
            renderHabits();
        });

        elements.habitGrid.append(fragment);
    });
}

function handleGoalChange() {
    appData.goal = normalizeGoal({
        title: elements.goalTitle.value,
        progress: elements.goalProgress.value
    });
    saveAppData();
    renderGoal();
}

function renderGoal() {
    elements.goalTitle.value = appData.goal.title;
    elements.goalProgress.value = String(appData.goal.progress);
    elements.goalProgressValue.textContent = `${appData.goal.progress}%`;
    elements.goalPreviewTitle.textContent = appData.goal.title || t('goals.empty');
    elements.goalPreviewPercent.textContent = `${appData.goal.progress}%`;
    elements.goalProgressFill.style.width = `${appData.goal.progress}%`;
}

function renderCalendarWeekdays() {
    elements.calendarWeekdays.innerHTML = '';
    t('calendar.weekdays').forEach((label) => {
        const day = document.createElement('div');
        day.className = 'calendar-weekday';
        day.textContent = label;
        elements.calendarWeekdays.append(day);
    });
}

function renderCalendar() {
    const currentCalendarDate = getCurrentCalendarDate();
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = (firstDay.getDay() + 6) % 7;
    const todayKey = getTodayKey();
    const taskCounts = appData.tasks.reduce((accumulator, task) => {
        accumulator[task.date] = (accumulator[task.date] || 0) + 1;
        return accumulator;
    }, {});

    elements.calendarMonthLabel.textContent = formatMonthYear(toDateKey(firstDay));
    elements.calendarSubtitle.textContent = t('calendar.subtitle');
    elements.selectedDateLabel.textContent = t('calendar.selectedDate', { date: formatLongDate(getSelectedDate()) });
    elements.calendarGrid.innerHTML = '';

    for (let index = 0; index < startOffset; index += 1) {
        const blank = document.createElement('div');
        blank.className = 'calendar-day calendar-day--blank';
        elements.calendarGrid.append(blank);
    }

    for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
        const date = new Date(year, month, dayNumber);
        const dateKey = toDateKey(date);
        const button = document.createElement('button');
        const badge = taskCounts[dateKey] ? `<span class="calendar-day__badge">${taskCounts[dateKey]}</span>` : '';

        button.type = 'button';
        button.className = 'calendar-day';
        button.dataset.date = dateKey;
        button.innerHTML = `<span class="calendar-day__number">${dayNumber}</span>${badge}`;

        if (dateKey === getSelectedDate()) {
            button.classList.add('is-selected');
        }

        if (dateKey === todayKey) {
            button.classList.add('is-today');
        }

        if (taskCounts[dateKey]) {
            button.classList.add('has-task');
        }

        button.addEventListener('click', () => setSelectedDate(dateKey));
        button.addEventListener('dragover', (event) => {
            if (!draggedTaskId) {
                return;
            }

            event.preventDefault();
            button.classList.add('is-drop-target');
        });
        button.addEventListener('dragleave', () => {
            button.classList.remove('is-drop-target');
        });
        button.addEventListener('drop', (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer?.getData('text/plain') || draggedTaskId;
            button.classList.remove('is-drop-target');

            if (taskId) {
                moveTaskToDate(taskId, dateKey);
            }
        });

        elements.calendarGrid.append(button);
    }

    renderCalendarSummary(getTasksForSelectedDate());
}

function changeCalendarMonth(direction) {
    const current = getCurrentCalendarDate();
    const next = new Date(current.getFullYear(), current.getMonth() + direction, 1);
    appData.calendar.currentCalendarDate = toDateKey(next);
    saveAppData();
    renderCalendar();
}

function setSelectedDate(dateKey) {
    if (!isValidDateKey(dateKey)) {
        return;
    }

    appData.calendar.selectedDate = dateKey;
    appData.calendar.currentCalendarDate = dateKey;
    saveAppData();
    elements.taskSelectedDateLabel.textContent = t('tasks.selectedDate', { date: formatLongDate(dateKey) });
    syncTaskViews();
}

function moveTaskToDate(taskId, dateKey) {
    const task = appData.tasks.find((entry) => entry.id === taskId);
    if (!task || !isValidDateKey(dateKey)) {
        return;
    }

    task.date = dateKey;
    saveAppData();
    syncTaskViews();
}

function clearCalendarDropTargets() {
    elements.calendarGrid.querySelectorAll('.calendar-day.is-drop-target').forEach((day) => {
        day.classList.remove('is-drop-target');
    });
}

function renderProgressChart() {
    const data = getLastSevenDaysProgress();
    elements.progressChart.innerHTML = '';

    data.forEach((entry) => {
        const column = document.createElement('div');
        column.className = 'chart-bar';

        const track = document.createElement('div');
        track.className = 'chart-bar__track';

        const fill = document.createElement('div');
        fill.className = 'chart-bar__fill';
        fill.style.height = `${Math.max(entry.progress, 8)}%`;

        const label = document.createElement('span');
        label.className = 'chart-bar__label';
        label.textContent = entry.label;

        const value = document.createElement('span');
        value.className = 'chart-bar__value';
        value.textContent = `${entry.progress}%`;

        track.append(fill);
        column.append(track, value, label);
        elements.progressChart.append(column);
    });
}

function getLastSevenDaysProgress() {
    const days = [];

    for (let offset = 6; offset >= 0; offset -= 1) {
        const date = new Date();
        date.setDate(date.getDate() - offset);
        const dateKey = toDateKey(date);
        const tasksForDay = appData.tasks.filter((task) => task.date === dateKey);
        const completed = tasksForDay.filter((task) => task.completed).length;
        const progress = tasksForDay.length ? Math.round((completed / tasksForDay.length) * 100) : 0;

        days.push({
            label: formatWeekday(dateKey),
            progress
        });
    }

    return days;
}

function exportAppData() {
    appData.meta.lastExportedAt = new Date().toISOString();
    saveAppData();

    const payload = {
        exportedAt: new Date().toISOString(),
        appData: normalizeAppData(appData)
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'life-terminal-backup.json';
    link.click();
    URL.revokeObjectURL(url);
    renderStorageInfo();
    showToast(t('settings.exportSuccess'));
}

async function handleImportChange(event) {
    const file = event.target.files?.[0];
    if (!file) {
        return;
    }

    try {
        const text = await file.text();
        importAppData(text);
        showToast(t('settings.importSuccess'));
    } catch {
        showToast(t('settings.importFailed'));
    } finally {
        event.target.value = '';
    }
}

function importAppData(text) {
    const parsed = JSON.parse(text);
    const payload = isPlainObject(parsed?.appData) ? parsed.appData : parsed;
    const normalized = normalizeAppData(payload);
    normalized.meta.lastImportedAt = new Date().toISOString();
    appData = normalized;
    saveAppData();
    currentFilter = 'all';
    searchQuery = '';
    elements.searchInput.value = '';
    renderApp();
}

function handleResetData() {
    if (!window.confirm(t('settings.confirmReset'))) {
        return;
    }

    appData = normalizeAppData(createDefaultAppData());
    saveAppData();
    currentFilter = 'all';
    searchQuery = '';
    elements.searchInput.value = '';
    renderApp();
    showToast(t('settings.resetSuccess'));
}

function openSettingsModal() {
    elements.settingsModal.hidden = false;
}

function closeSettingsModal() {
    elements.settingsModal.hidden = true;
}

function syncSettingsControls() {
    elements.languageSelect.value = getCurrentLanguage();
    elements.themeSelect.value = appData.settings.theme;
}

function syncProfileForm() {
    elements.displayNameInput.value = appData.profile.displayName;
    elements.firstNameInput.value = appData.profile.firstName;
    elements.lastNameInput.value = appData.profile.lastName;
    elements.usernameInput.value = appData.profile.username;
    elements.emailInput.value = appData.profile.email;
}

function handleProfileSubmit(event) {
    event.preventDefault();

    const username = normalizeUsername(elements.usernameInput.value);
    if (username && username.replace('@', '').length < 3) {
        showToast(t('settings.usernameError'));
        return;
    }

    appData.profile.displayName = normalizeText(elements.displayNameInput.value, 60);
    appData.profile.firstName = normalizeText(elements.firstNameInput.value, 60);
    appData.profile.lastName = normalizeText(elements.lastNameInput.value, 60);
    appData.profile.username = username;
    appData.profile.email = normalizeText(elements.emailInput.value, 100);
    saveAppData();
    renderProfileSummary();
    syncProfileForm();
    showToast(t('settings.profileSaved'));
}

function handleUsernameInput(event) {
    event.target.value = normalizeUsername(event.target.value);
}

async function handleAvatarUpload(event) {
    const file = event.target.files?.[0];
    if (!file) {
        return;
    }

    const dataUrl = await fileToDataUrl(file);
    appData.profile.avatar = dataUrl;
    saveAppData();
    renderProfileSummary();
    showToast(t('settings.avatarSaved'));
    event.target.value = '';
}

function renderProfileSummary() {
    const name = getProfileDisplayName();
    const handle = appData.profile.username || '@local';

    elements.sidebarProfileName.textContent = name;
    elements.headerProfileName.textContent = name;
    elements.sidebarProfileHandle.textContent = handle;
    elements.headerProfileHandle.textContent = handle;

    renderAvatar(elements.sidebarAvatar, 'brand');
    renderAvatar(elements.headerAvatar, 'small');
    renderAvatar(elements.modalAvatarPreview, 'large');
}

function renderAvatar(container) {
    const initials = getProfileInitials();
    if (appData.profile.avatar) {
        container.innerHTML = `<img src="${appData.profile.avatar}" alt="avatar">`;
        return;
    }

    container.textContent = initials;
}

function renderStorageInfo() {
    elements.storageModeValue.textContent = t(`common.${appData.meta.storageMode}`) || appData.meta.storageMode;
    elements.cloudSyncValue.textContent = appData.meta.cloudSyncEnabled ? t('common.enabled') : t('common.disabled');
}

function syncTaskViews() {
    renderTasks();
    updateStats();
    renderCalendar();
    renderProgressChart();
}

function showToast(message) {
    clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.hidden = false;
    toastTimer = window.setTimeout(() => {
        elements.toast.hidden = true;
    }, 2400);
}

function t(key, variables = {}) {
    const language = getCurrentLanguage();
    const source = translations[language] || translations.ru;
    const fallback = translations.ru;
    const value = readTranslationValue(source, key) ?? readTranslationValue(fallback, key) ?? key;

    if (typeof value !== 'string') {
        return value;
    }

    return value.replace(/\{(\w+)\}/g, (_, variableName) => String(variables[variableName] ?? ''));
}

function readTranslationValue(source, key) {
    return key.split('.').reduce((value, segment) => (value && value[segment] !== undefined ? value[segment] : undefined), source);
}

function getCurrentLanguage() {
    return Object.hasOwn(LOCALES, appData.settings.language) ? appData.settings.language : 'ru';
}

function getLocale() {
    return LOCALES[getCurrentLanguage()] || LOCALES.ru;
}

function getHabitLabel(habit) {
    if (readTranslationValue(translations[getCurrentLanguage()], `habits.names.${habit.id}`)) {
        return t(`habits.names.${habit.id}`);
    }

    return habit.name;
}

function getProfileDisplayName() {
    return appData.profile.displayName
        || [appData.profile.firstName, appData.profile.lastName].filter(Boolean).join(' ')
        || t('common.guest');
}

function getProfileInitials() {
    const base = getProfileDisplayName();
    const parts = base.split(/\s+/).filter(Boolean).slice(0, 2);
    const initials = parts.map((part) => part[0]).join('').toUpperCase();
    return initials || 'LT';
}

function formatShortDate(dateKey) {
    return formatDate(dateKey, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatLongDate(dateKey) {
    return formatDate(dateKey, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function formatMonthYear(dateKey) {
    return formatDate(dateKey, {
        month: 'long',
        year: 'numeric'
    });
}

function formatWeekday(dateKey) {
    return formatDate(dateKey, {
        weekday: 'short'
    });
}

function formatDate(dateKey, options) {
    return new Intl.DateTimeFormat(getLocale(), options).format(parseDateKey(dateKey));
}

function toDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
    const [year, month, day] = dateKey.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function isValidDateKey(dateKey) {
    return typeof dateKey === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateKey);
}

function getTodayKey() {
    return toDateKey(new Date());
}

function normalizeText(value, maxLength) {
    return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function normalizeUsername(value) {
    if (typeof value !== 'string') {
        return '';
    }

    const clean = value.toLowerCase().replace(/^@+/, '').replace(/[^a-z0-9._]/g, '').slice(0, 32);
    return clean ? `@${clean}` : '';
}

function inferHabitId(name) {
    const normalized = typeof name === 'string' ? name.trim().toLowerCase() : '';
    const map = {
        running: 'running',
        бег: 'running',
        біг: 'running',
        study: 'study',
        учёба: 'study',
        учеба: 'study',
        навчання: 'study',
        water: 'water',
        вода: 'water',
        reading: 'reading',
        чтение: 'reading',
        читання: 'reading'
    };
    return map[normalized] || '';
}

function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function clamp(value, min, max) {
    if (!Number.isFinite(value)) {
        return min;
    }

    return Math.min(Math.max(value, min), max);
}

function createId(prefix) {
    if (window.crypto?.randomUUID) {
        return `${prefix}-${window.crypto.randomUUID()}`;
    }

    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

init();