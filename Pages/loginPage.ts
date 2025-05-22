import { expect, Locator, Page } from '@playwright/test';
import { RegistrationData } from '../Domains/registrationData'

export class LoginPage {
    private readonly nameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly repeatPasswordInput: Locator;
    private readonly birthDateInput: Locator;
    private readonly languageSelect: Locator;
    private readonly phoneInput: Locator; 
    private readonly acceptanceCheckbox: Locator;
    private readonly infoConsentCheckbox: Locator;
    private readonly submitButton: Locator;
    private readonly countryDropdown: Locator;
    private countryDropdownSelector: Locator;

    constructor(public readonly page: Page) {
        this.nameInput = page.locator('input[placeholder="Imię"]');
        this.lastNameInput = page.locator('input[placeholder="Nazwisko"]');
        this.emailInput = page.locator('input[placeholder="Twój adres e-mail"]');
        this.passwordInput = page.locator('input[placeholder="Hasło"]');
        this.repeatPasswordInput = page.locator('input[placeholder="Powtórz hasło"]');
        this.birthDateInput = page.locator('input[placeholder="Data urodzenia"]');
        this.languageSelect = this.page.locator("//label[contains(text(),'Język')]/select");
        this.phoneInput = page.getByPlaceholder('Numer telefonu');
        this.acceptanceCheckbox = page.locator("//span[contains(text(),'Akceptuję')]/parent::div/div");
        this.infoConsentCheckbox = page.locator("//span[contains(text(),' Wyrażam zgodę ')]/parent::div/div");
        this.submitButton = page.getByRole('button', { name: /zarejestruj/i });
        this.countryDropdown = this.page.locator("//div[@class='vti__dropdown']");
        this.countryDropdownSelector = this.page.locator("//div[@class='vti__dropdown open']");
    }

    async navigateTo() {
        await this.page.goto(`${process.env.BASE_URL!}`, {
            waitUntil: 'load',
        });
    }

    async fillForm(registrationData: RegistrationData) {
        if (registrationData.acceptTerms) {
            await this.acceptanceCheckbox.check();
        }

        if (registrationData.consentInfo) {
            await this.infoConsentCheckbox.check();
        }

        registrationData.name && await this.nameInput.fill(registrationData.name);
        registrationData.lastName && await this.lastNameInput.fill(registrationData.lastName);
        registrationData.email && await this.emailInput.fill(registrationData.email);
        registrationData.password && await this.passwordInput.fill(registrationData.password);
        registrationData.repeatPassword && await this.repeatPasswordInput.fill(registrationData.repeatPassword);
        registrationData.language && await this.selectLanguage(registrationData.language!);
        registrationData.phone && await this.setPhoneNumber(registrationData.phone);   
        registrationData.birthDate && await this.selectbirthDate(registrationData.birthDate);
    }

    async setPhoneNumber(phoneNumber: string, country: string = "Poland (Polska)") {
        await this.countryDropdown.click();
        await this.countryDropdownSelector.locator(`//ul//strong[text()="${country}"]`).click()
        await this.phoneInput.clear();
        await this.phoneInput.fill(phoneNumber);
    }

    async selectbirthDate(birthDate: string) {
        await this.birthDateInput.fill(birthDate);  
    }

    async selectLanguage(language: string) {
        await this.languageSelect.selectOption({ label: language });
    }

    async submitForm() {
        await this.submitButton.click();
    }

    // ASSERTS
    async assertValidationMessageIsVisible(validationMessage: string, isVisible: boolean = true) {
        await expect(this.page.locator(`text=${validationMessage}`)).toBeVisible({ visible: isVisible, timeout: 3_000 });
    }
}