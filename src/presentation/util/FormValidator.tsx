// Вот что-то типа хэлперов сюда хорошо бы сунулось в эту папку (напр. класс для работы с датами)

export default class FormValidator {
    static isValidEmail(email: string): boolean {
        const emailRegex = /^\S+@\S+\.\S+$/
        return emailRegex.test(email)
    }
}