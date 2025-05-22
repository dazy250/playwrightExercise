import { test } from '../Fixtures/fixtures.ts'
import { RegistrationData } from '../Domains/registrationData.ts'
import {
  ValidationMessagesRequiredFields,
  IncorrectPasswordMessage,
  IncorrectEmailMessage,
  IncorrectRepeatPasswordMessage,
  PhoneValidationMessages
} from '../Domains/validationMessages.ts'

const validUserData: RegistrationData = {
  name: 'Jan',
  lastName: 'Kowalski',
  email: 'jan.kowalski@example.com',
  password: 'BezpieczneHaslo123!',
  repeatPassword: 'BezpieczneHaslo123!',
  birthDate: '1990-01-01',
  language: 'polski',
  phone: '48123456789',
  acceptTerms: true,
  consentInfo: true,
}

test('Registration - Happy path: Successful registration with valid data', async ({ loginPageFixture, confirmationPageFixture }) => {
  await test.step(`WHEN: The user fills out the registration form with valid personal data and accepts all required checkboxes`, async () => {
    await loginPageFixture.fillForm(validUserData);
  });

  await test.step(`AND: The user selects the "Zarejestruj" button`, async () => {
    await loginPageFixture.submitForm();
  });

  await test.step(`THEN: The confirmation message is displayed and includes the user's name and email`, async () => {
    await confirmationPageFixture.assertConfirmationMessageContains(validUserData.name!, validUserData.email!);
  });
});

test('Registration Test - Validation messages for all required fields', async ({ loginPageFixture }) => {
  await test.step(`WHEN: The user attempts to register without entering any data`, async () => {
    await loginPageFixture.submitForm();
  });

  await test.step(`THEN: Validation error messages are displayed for all mandatory fields`, async () => {
    const messages: string[] = Object.values(ValidationMessagesRequiredFields);
    for (const message of messages) {
      await loginPageFixture.assertValidationMessageIsVisible(message, true);
    }
  });
});
/////
test('Registration test - missing user name', async ({ loginPageFixture }) => {
  const updatedUserData: RegistrationData = {
    ...validUserData,
    name: undefined,
  };

  await test.step(`WHEN: The user fills out the registration form with valid personal data except user name`, async () => {
    await loginPageFixture.fillForm(updatedUserData);
  });

  await test.step(`AND: The user selects the "Zarejestruj" button`, async () => {
    await loginPageFixture.submitForm();
  });

  await test.step(`THEN: The error message is visible for the name field`, async () => {
    await loginPageFixture.assertValidationMessageIsVisible(ValidationMessagesRequiredFields.NameRequired, true);
  });
});

test('Registration test - missing lastName', async ({ loginPageFixture }) => {
  const updatedUserData: RegistrationData = {
    ...validUserData,
    lastName: undefined,
  };

  await test.step(`WHEN: The user fills out the registration form with valid personal data except lastName`, async () => {
    await loginPageFixture.fillForm(updatedUserData);
  });

  await test.step(`AND: The user selects the "Zarejestruj" button`, async () => {
    await loginPageFixture.submitForm();
  });

  await test.step(`THEN: The error message is visible for the lastName field`, async () => {
    await loginPageFixture.assertValidationMessageIsVisible(ValidationMessagesRequiredFields.LastNameRequired, true);
  });
});

test('Registration test - missing email', async ({ loginPageFixture }) => {
  const updatedUserData: RegistrationData = {
    ...validUserData,
    email: undefined,
  };

  await test.step(`WHEN: The user fills out the registration form with valid personal data except email`, async () => {
    await loginPageFixture.fillForm(updatedUserData);
  });

  await test.step(`AND: The user selects the "Zarejestruj" button`, async () => {
    await loginPageFixture.submitForm();
  });

  await test.step(`THEN: The error message is visible for the email field`, async () => {
    await loginPageFixture.assertValidationMessageIsVisible(ValidationMessagesRequiredFields.EmailRequired, true);
  });
});

test('Registration test - missing password', async ({ loginPageFixture }) => {
  const updatedUserData: RegistrationData = {
    ...validUserData,
    password: undefined,
  };

  await test.step(`WHEN: The user fills out the registration form with valid personal data except password`, async () => {
    await loginPageFixture.fillForm(updatedUserData);
  });

  await test.step(`AND: The user selects the "Zarejestruj" button`, async () => {
    await loginPageFixture.submitForm();
  });

  await test.step(`THEN: The error message is visible for the password field`, async () => {
    await loginPageFixture.assertValidationMessageIsVisible(ValidationMessagesRequiredFields.PasswordRequired, true);
  });
});

test('Registration test - missing repeatPassword', async ({ loginPageFixture }) => {
  const updatedUserData: RegistrationData = {
    ...validUserData,
    repeatPassword: undefined,
  };

  await test.step(`WHEN: The user fills out the registration form with valid personal data except repeatPassword`, async () => {
    await loginPageFixture.fillForm(updatedUserData);
  });

  await test.step(`AND: The user selects the "Zarejestruj" button`, async () => {
    await loginPageFixture.submitForm();
  });

  await test.step(`THEN: The error message is visible for the repeatPassword field`, async () => {
    await loginPageFixture.assertValidationMessageIsVisible(ValidationMessagesRequiredFields.RepeatPasswordRequired, true);
  });
});

test('Registration test - missing birthDate', async ({ loginPageFixture }) => {
  const updatedUserData: RegistrationData = {
    ...validUserData,
    birthDate: undefined,
  };

  await test.step(`WHEN: The user fills out the registration form with valid personal data except birthDate`, async () => {
    await loginPageFixture.fillForm(updatedUserData);
  });

  await test.step(`AND: The user selects the "Zarejestruj" button`, async () => {
    await loginPageFixture.submitForm();
  });

  await test.step(`THEN: The error message is visible for the birthDate field`, async () => {
    await loginPageFixture.assertValidationMessageIsVisible(ValidationMessagesRequiredFields.BirthDateRequired, true);
  });
});

test('Registration test - missing acceptTerms checkbox', async ({ loginPageFixture }) => {
  const updatedUserData: RegistrationData = {
    ...validUserData,
    acceptTerms: false,
  };

  await test.step(`WHEN: The user fills out the registration form with valid personal data except acceptTerms`, async () => {
    await loginPageFixture.fillForm(updatedUserData);
  });

  await test.step(`AND: The user selects the "Zarejestruj" button`, async () => {
    await loginPageFixture.submitForm();
  });

  await test.step(`THEN: The error message is visible for the acceptTerms field`, async () => {
    await loginPageFixture.assertValidationMessageIsVisible(ValidationMessagesRequiredFields.AcceptTermsRequired, true);
  });
});

test('Registration test - incorrect email ', async ({ loginPageFixture }) => {

  const incorrectEmails: string[] = ["userexample.com", "user@@example.com", "user@", "@example.com", "user @example.com", "user<>@mail.com", "user@example", "user.@example.com", ".user@example.com", "user..name@example.com"];

  for await (const email of incorrectEmails) {
    await test.step(`WHEN: The user fills out incorrect email: ${email} `, async () => {
      await loginPageFixture.fillForm({
        ...validUserData,
        email: email,
      });
    })

    await test.step(`AND: The user selects "Zarejestruj' button`, async () => {
      await loginPageFixture.submitForm();
    })

    await test.step(`THEN: The validation message is visible: ${IncorrectEmailMessage.IncorrectEmail}`, async () => {
      await loginPageFixture.assertValidationMessageIsVisible(IncorrectEmailMessage.IncorrectEmail, true);
    })
  }
});

test('Registration test - incorrect password ', async ({ loginPageFixture }) => {

  const incorrectPassword: { password: string, message: string }[] = [
    { password: 'Ab1!', message: IncorrectPasswordMessage.TooShort },
    { password: 'abcdef1!', message: IncorrectPasswordMessage.MissingUppercase },
    { password: 'Abcdefg!', message: IncorrectPasswordMessage.MissingNumber },
    { password: 'Abcdefg1', message: IncorrectPasswordMessage.MissingSpecialChar },
    { password: 'abcdefg', message: IncorrectPasswordMessage.AllRequirements }
  ];

  for await (const value of incorrectPassword) {
    await test.step(`WHEN: The user fills out incorrect password: ${value.password} `, async () => {
      await loginPageFixture.fillForm({
        ...validUserData,
        password: value.password,
      });
    })

    await test.step(`AND: The user selects "Zarejestruj' button`, async () => {
      await loginPageFixture.submitForm();
    })

    await test.step(`THEN: The validation message is visible: ${value.message}`, async () => {
      await loginPageFixture.assertValidationMessageIsVisible(value.message, true);
    })
  }
});

test('Registration test - incorrect repeat password ', async ({ loginPageFixture }) => {

  await test.step(`WHEN: The user fills out incorrect repeat password`, async () => {
    await loginPageFixture.fillForm({
      password: 'BezpieczneHaslo123!',
      repeatPassword: 'BezpieczneHaslo123!New',
    });
  })

  await test.step(`AND: The user selects "Zarejestruj' button`, async () => {
    await loginPageFixture.submitForm();
  })

  await test.step(`THEN: The validation message is visible: ${IncorrectRepeatPasswordMessage.IncorrectRepeatPassword}`, async () => {
    await loginPageFixture.assertValidationMessageIsVisible(IncorrectRepeatPasswordMessage.IncorrectRepeatPassword, true);
  })
});

test('Registration test - incorrect phone number ', async ({ loginPageFixture }) => {
  const incorrectvalues: { phoneNumber: string, message: string }[] = [
    { phoneNumber: "1234", message: PhoneValidationMessages.MinDigits },
    { phoneNumber: "123 4567", message: PhoneValidationMessages.MinDigits },
    { phoneNumber: "123456a", message: PhoneValidationMessages.OnlyDigitsAndSpaces },
    { phoneNumber: "+48123456789", message: PhoneValidationMessages.OnlyDigitsAndSpaces },
  ];

  for await (const value of incorrectvalues) {
    await test.step(`WHEN: The user fills out incorrect phone number: ${value.phoneNumber} `, async () => {
      await loginPageFixture.fillForm({
        ...validUserData,
        phone: value.phoneNumber,
      });
    })

    await test.step(`AND: The user selects "Zarejestruj' button`, async () => {
      await loginPageFixture.submitForm();
    })
      
    await test.step(`THEN: The validation message is visible: ${value.message}`, async () => {
      await loginPageFixture.assertValidationMessageIsVisible(value.message, true);
    })
  }
});





