
type ValidationRule = {
  test: (value: string) => boolean;
  message: string;
};

export const validateField = (value: string, rules: ValidationRule[]): string | null => {
  for (const rule of rules) {
    if (!rule.test(value)) {
      return rule.message;
    }
  }
  return null;
};

// Common validation rules
export const required = (fieldName: string): ValidationRule => ({
  test: (value) => value.trim().length > 0,
  message: `${fieldName} is required`
});

export const minLength = (length: number, fieldName: string): ValidationRule => ({
  test: (value) => value.trim().length >= length,
  message: `${fieldName} must be at least ${length} characters`
});

export const maxLength = (length: number, fieldName: string): ValidationRule => ({
  test: (value) => value.trim().length <= length,
  message: `${fieldName} cannot be more than ${length} characters`
});

export const isEmail = (): ValidationRule => ({
  test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: 'Please enter a valid email address'
});

export const isNepaliPhone = (): ValidationRule => ({
  test: (value) => /^(98|97)\d{8}$/.test(value),
  message: 'Enter a valid Nepali phone number (e.g., 98XXXXXXXX)'
});

export const validateNepaliAddress = (value: string): string | null => {
  if (value.trim().length < 5) {
    return 'Please provide a more detailed address';
  }
  return null;
};
