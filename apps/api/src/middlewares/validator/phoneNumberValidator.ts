export const phoneNumberValidation = (number: string): boolean => {
    const phoneNumber = /^\d+$/
    return phoneNumber.test(number)
}