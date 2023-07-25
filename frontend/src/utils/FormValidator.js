export const validateName = (value) => {
    if (!value) {
        return "Имя обязательно";
    }
    if (value.length < 2) {
        return "Имя должно содержать минимум 2 символа";
    }
    if (value.length > 30) {
        return "Имя должно содержать максимум 30 символов";
    }
    return null;
};

export const validateDescription = (value) => {
    if (!value) {
        return "Описание обязательно";
    }
    if (value.length < 2) {
        return "Описание должно содержать минимум 2 символа";
    }
    if (value.length > 30) {
        return "Описание должно содержать максимум 30 символов";
    }
    return null;
};

export const validateTitle = (value) => {
    if (!value) {
        return "Название обязательно";
    }
    if (value.length < 2) {
        return "Название должно содержать минимум 2 символа";
    }
    if (value.length > 30) {
        return "Название должно содержать максимум 30 символов";
    }
    return null;
};

export const validateUrl = (value) => {
    if (!value) {
        return "Ссылка обязательна";
    }
    if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value)) {
        return "Введите корректную ссылку на картинку";
    }
    return null;
};
