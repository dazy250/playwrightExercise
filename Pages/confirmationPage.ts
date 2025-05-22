import { expect, Locator, Page } from '@playwright/test';

export class ConfirmationPage {
    private readonly conformationMessage: Locator;

    constructor(page: Page) {
        this.conformationMessage = page.locator("//div[@class='container']");
    }

    async assertConfirmationMessageContains(username: string, email: string) {
        const messageText = (await this.conformationMessage.innerText()).replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ').trim();

        expect(messageText).toBe(`${username}, dziękujemy za rejestrację! Na Twój adres email ${email} wysłaliśmy wiadomość z linkiem aktywującym konto`);
    }
}