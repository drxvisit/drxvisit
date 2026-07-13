import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword, validatePhone } from '@/lib/utils/validation';

describe('Authentication Validation', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('user@example.com')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate password with 8+ characters', () => {
      expect(validatePassword('password123')).toBe(true);
    });

    it('should reject password with less than 8 characters', () => {
      expect(validatePassword('pass')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('should validate Indian phone number', () => {
      expect(validatePhone('+91 98765 43210')).toBe(true);
    });

    it('should validate phone without country code', () => {
      expect(validatePhone('9876543210')).toBe(true);
    });
  });
});
