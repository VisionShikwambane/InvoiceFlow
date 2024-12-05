/**
 * Validates an email address format
 * @param email Email address to validate
 * @returns boolean indicating if the email format is valid
 */
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
