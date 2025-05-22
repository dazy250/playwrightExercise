export enum ValidationMessagesRequiredFields {
  NameRequired = "Pole Imię jest wymagane",
  LastNameRequired = "Pole Nazwisko jest wymagane",
  EmailRequired = "Pole E-mail jest wymagane",
  PasswordRequired = "Pole password jest wymagane",
  RepeatPasswordRequired = "Pole Powtórz hasło jest wymagane",
  BirthDateRequired = "Pole Data urodzenia jest wymagane",
  AcceptTermsRequired = "To pole jest wymagane"
}

export enum IncorrectPasswordMessage {
  TooShort = "Hasło musi zawierać: co najmniej 8 znaków!",
  MissingUppercase = "Hasło musi zawierać: dużą literę!", 
  MissingNumber = "Hasło musi zawierać: liczbę!",
  MissingSpecialChar = "Hasło musi zawierać: znak specjalny!",
  AllRequirements = "Hasło musi zawierać: co najmniej 8 znaków, dużą literę, liczbę, znak specjalny!"
}

export enum IncorrectEmailMessage {
  IncorrectEmail = "Pole E-mail musi być poprawnym adresem email",
}

export enum IncorrectRepeatPasswordMessage {
  IncorrectRepeatPassword = "Hasła nie są jednakowe!",
}

export enum PhoneValidationMessages {
  MinDigits = "To pole musi zawierać co najmniej 9 cyfr",
  OnlyDigitsAndSpaces = "To pole może zawierać tylko cyfry i spacje",
}

