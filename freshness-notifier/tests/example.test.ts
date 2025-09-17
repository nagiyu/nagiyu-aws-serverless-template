import { FreshnessNotifierExample } from '@freshness-notifier/example';
import FreshnessNotifierService from '@freshness-notifier/services/FreshnessNotifierService';
import { FreshnessDataType } from '@freshness-notifier/interfaces/data/FreshnessDataType';
import { SettingDataType } from '@freshness-notifier/interfaces/data/SettingDataType';

// Mock the FreshnessNotifierService
jest.mock('@freshness-notifier/services/FreshnessNotifierService');

describe('FreshnessNotifierExample', () => {
  let example: FreshnessNotifierExample;
  let mockService: jest.Mocked<FreshnessNotifierService>;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Create a new instance
    example = new FreshnessNotifierExample();
    
    // Get the mocked service instance
    mockService = jest.mocked(example['service']);
  });

  describe('createFreshnessItem', () => {
    it('should create a freshness item with correct data structure', async () => {
      // Arrange
      const name = 'Test Item';
      const expiryDate = '2024-12-31';
      const notificationEnabled = true;

      mockService.createFreshness.mockResolvedValue(undefined);

      // Act
      await example.createFreshnessItem(name, expiryDate, notificationEnabled);

      // Assert
      expect(mockService.createFreshness).toHaveBeenCalledTimes(1);
      const callArg = mockService.createFreshness.mock.calls[0][0];
      
      expect(callArg).toMatchObject({
        name,
        expiryDate,
        notificationEnabled,
      });
      expect(callArg.id).toMatch(/^freshness_\d+$/);
      expect(typeof callArg.create).toBe('number');
      expect(typeof callArg.update).toBe('number');
    });

    it('should use default notification enabled value when not provided', async () => {
      // Arrange
      const name = 'Test Item';
      const expiryDate = '2024-12-31';

      mockService.createFreshness.mockResolvedValue(undefined);

      // Act
      await example.createFreshnessItem(name, expiryDate);

      // Assert
      const callArg = mockService.createFreshness.mock.calls[0][0];
      expect(callArg.notificationEnabled).toBe(true);
    });
  });

  describe('createSetting', () => {
    it('should create a setting with correct data structure', async () => {
      // Arrange
      const terminalId = 'terminal123';
      const subscriptionEndpoint = 'https://example.com/push';
      const subscriptionKeysP256dh = 'key-p256dh';
      const subscriptionKeysAuth = 'key-auth';
      const notificationTime = 10;
      const notificationEnabled = false;

      mockService.createSetting.mockResolvedValue(undefined);

      // Act
      await example.createSetting(
        terminalId,
        subscriptionEndpoint,
        subscriptionKeysP256dh,
        subscriptionKeysAuth,
        notificationTime,
        notificationEnabled
      );

      // Assert
      expect(mockService.createSetting).toHaveBeenCalledTimes(1);
      const callArg = mockService.createSetting.mock.calls[0][0];
      
      expect(callArg).toMatchObject({
        terminalId,
        subscriptionEndpoint,
        subscriptionKeysP256dh,
        subscriptionKeysAuth,
        notificationTime,
        notificationEnabled,
      });
      expect(callArg.id).toMatch(/^setting_\d+$/);
      expect(typeof callArg.create).toBe('number');
      expect(typeof callArg.update).toBe('number');
    });

    it('should use default values when not provided', async () => {
      // Arrange
      const terminalId = 'terminal123';
      const subscriptionEndpoint = 'https://example.com/push';
      const subscriptionKeysP256dh = 'key-p256dh';
      const subscriptionKeysAuth = 'key-auth';

      mockService.createSetting.mockResolvedValue(undefined);

      // Act
      await example.createSetting(
        terminalId,
        subscriptionEndpoint,
        subscriptionKeysP256dh,
        subscriptionKeysAuth
      );

      // Assert
      const callArg = mockService.createSetting.mock.calls[0][0];
      expect(callArg.notificationTime).toBe(9); // Default to 9 AM
      expect(callArg.notificationEnabled).toBe(true); // Default to true
    });
  });

  describe('getAllFreshnessItems', () => {
    it('should return all freshness items', async () => {
      // Arrange
      const mockFreshnessItems: FreshnessDataType[] = [
        {
          id: 'freshness_1',
          name: 'Item 1',
          expiryDate: '2024-12-31',
          notificationEnabled: true,
          create: Date.now(),
          update: Date.now(),
        },
        {
          id: 'freshness_2',
          name: 'Item 2',
          expiryDate: '2024-11-30',
          notificationEnabled: false,
          create: Date.now(),
          update: Date.now(),
        },
      ];

      mockService.getFreshness.mockResolvedValue(mockFreshnessItems);

      // Act
      const result = await example.getAllFreshnessItems();

      // Assert
      expect(mockService.getFreshness).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockFreshnessItems);
    });
  });

  describe('getFreshnessItemById', () => {
    it('should return freshness item by ID', async () => {
      // Arrange
      const itemId = 'freshness_123';
      const mockItem: FreshnessDataType = {
        id: itemId,
        name: 'Test Item',
        expiryDate: '2024-12-31',
        notificationEnabled: true,
        create: Date.now(),
        update: Date.now(),
      };

      mockService.getFreshnessById.mockResolvedValue(mockItem);

      // Act
      const result = await example.getFreshnessItemById(itemId);

      // Assert
      expect(mockService.getFreshnessById).toHaveBeenCalledWith(itemId);
      expect(result).toEqual(mockItem);
    });

    it('should return null when item not found', async () => {
      // Arrange
      const itemId = 'non_existent';
      mockService.getFreshnessById.mockResolvedValue(null);

      // Act
      const result = await example.getFreshnessItemById(itemId);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('getAllSettings', () => {
    it('should return all settings', async () => {
      // Arrange
      const mockSettings: SettingDataType[] = [
        {
          id: 'setting_1',
          terminalId: 'terminal_1',
          subscriptionEndpoint: 'https://example.com/push',
          subscriptionKeysP256dh: 'key1',
          subscriptionKeysAuth: 'auth1',
          notificationEnabled: true,
          notificationTime: 9,
          create: Date.now(),
          update: Date.now(),
        },
      ];

      mockService.getSettings.mockResolvedValue(mockSettings);

      // Act
      const result = await example.getAllSettings();

      // Assert
      expect(mockService.getSettings).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockSettings);
    });
  });

  describe('getSettingByTerminalId', () => {
    it('should return setting by terminal ID', async () => {
      // Arrange
      const terminalId = 'terminal_123';
      const mockSetting: SettingDataType = {
        id: 'setting_123',
        terminalId,
        subscriptionEndpoint: 'https://example.com/push',
        subscriptionKeysP256dh: 'key',
        subscriptionKeysAuth: 'auth',
        notificationEnabled: true,
        notificationTime: 9,
        create: Date.now(),
        update: Date.now(),
      };

      mockService.getSettingByTerminalId.mockResolvedValue(mockSetting);

      // Act
      const result = await example.getSettingByTerminalId(terminalId);

      // Assert
      expect(mockService.getSettingByTerminalId).toHaveBeenCalledWith(terminalId);
      expect(result).toEqual(mockSetting);
    });
  });

  describe('getSettingById', () => {
    it('should return setting by ID', async () => {
      // Arrange
      const settingId = 'setting_123';
      const mockSetting: SettingDataType = {
        id: settingId,
        terminalId: 'terminal_123',
        subscriptionEndpoint: 'https://example.com/push',
        subscriptionKeysP256dh: 'key',
        subscriptionKeysAuth: 'auth',
        notificationEnabled: true,
        notificationTime: 9,
        create: Date.now(),
        update: Date.now(),
      };

      mockService.getSettingById.mockResolvedValue(mockSetting);

      // Act
      const result = await example.getSettingById(settingId);

      // Assert
      expect(mockService.getSettingById).toHaveBeenCalledWith(settingId);
      expect(result).toEqual(mockSetting);
    });
  });

  describe('updateFreshnessItem', () => {
    it('should update freshness item with new timestamp', async () => {
      // Arrange
      const item: FreshnessDataType = {
        id: 'freshness_123',
        name: 'Updated Item',
        expiryDate: '2024-12-31',
        notificationEnabled: true,
        create: Date.now() - 1000,
        update: Date.now() - 1000,
      };

      const originalUpdate = item.update;
      mockService.updateFreshness.mockResolvedValue(undefined);

      // Act
      await example.updateFreshnessItem(item);

      // Assert
      expect(mockService.updateFreshness).toHaveBeenCalledTimes(1);
      const callArg = mockService.updateFreshness.mock.calls[0][0];
      expect(callArg.update).toBeGreaterThan(originalUpdate);
      expect(callArg.id).toBe(item.id);
      expect(callArg.name).toBe(item.name);
    });
  });

  describe('updateSetting', () => {
    it('should update setting with new timestamp', async () => {
      // Arrange
      const setting: SettingDataType = {
        id: 'setting_123',
        terminalId: 'terminal_123',
        subscriptionEndpoint: 'https://example.com/push',
        subscriptionKeysP256dh: 'key',
        subscriptionKeysAuth: 'auth',
        notificationEnabled: true,
        notificationTime: 9,
        create: Date.now() - 1000,
        update: Date.now() - 1000,
      };

      const originalUpdate = setting.update;
      mockService.updateSetting.mockResolvedValue(undefined);

      // Act
      await example.updateSetting(setting);

      // Assert
      expect(mockService.updateSetting).toHaveBeenCalledTimes(1);
      const callArg = mockService.updateSetting.mock.calls[0][0];
      expect(callArg.update).toBeGreaterThan(originalUpdate);
      expect(callArg.id).toBe(setting.id);
    });
  });

  describe('deleteFreshnessItem', () => {
    it('should delete freshness item by ID', async () => {
      // Arrange
      const itemId = 'freshness_123';
      mockService.deleteFreshness.mockResolvedValue(undefined);

      // Act
      await example.deleteFreshnessItem(itemId);

      // Assert
      expect(mockService.deleteFreshness).toHaveBeenCalledWith(itemId);
    });
  });

  describe('deleteSetting', () => {
    it('should delete setting by ID', async () => {
      // Arrange
      const settingId = 'setting_123';
      mockService.deleteSetting.mockResolvedValue(undefined);

      // Act
      await example.deleteSetting(settingId);

      // Assert
      expect(mockService.deleteSetting).toHaveBeenCalledWith(settingId);
    });
  });
});