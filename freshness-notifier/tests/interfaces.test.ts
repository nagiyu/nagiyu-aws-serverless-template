import { FreshnessDataType } from '@freshness-notifier/interfaces/data/FreshnessDataType';
import { SettingDataType } from '@freshness-notifier/interfaces/data/SettingDataType';

describe('Data Types', () => {
  describe('FreshnessDataType', () => {
    it('should have correct interface structure', () => {
      const freshnessItem: FreshnessDataType = {
        id: 'test-id',
        name: 'Test Item',
        expiryDate: '2024-12-31',
        notificationEnabled: true,
        create: Date.now(),
        update: Date.now(),
      };

      expect(freshnessItem).toBeDefined();
      expect(typeof freshnessItem.id).toBe('string');
      expect(typeof freshnessItem.name).toBe('string');
      expect(typeof freshnessItem.expiryDate).toBe('string');
      expect(typeof freshnessItem.notificationEnabled).toBe('boolean');
      expect(typeof freshnessItem.create).toBe('number');
      expect(typeof freshnessItem.update).toBe('number');
    });
  });

  describe('SettingDataType', () => {
    it('should have correct interface structure', () => {
      const setting: SettingDataType = {
        id: 'setting-id',
        terminalId: 'terminal-123',
        subscriptionEndpoint: 'https://example.com/push',
        subscriptionKeysP256dh: 'key-p256dh',
        subscriptionKeysAuth: 'key-auth',
        notificationEnabled: true,
        notificationTime: 9,
        create: Date.now(),
        update: Date.now(),
      };

      expect(setting).toBeDefined();
      expect(typeof setting.id).toBe('string');
      expect(typeof setting.terminalId).toBe('string');
      expect(typeof setting.subscriptionEndpoint).toBe('string');
      expect(typeof setting.subscriptionKeysP256dh).toBe('string');
      expect(typeof setting.subscriptionKeysAuth).toBe('string');
      expect(typeof setting.notificationEnabled).toBe('boolean');
      expect(typeof setting.notificationTime).toBe('number');
      expect(typeof setting.create).toBe('number');
      expect(typeof setting.update).toBe('number');
    });
  });
});