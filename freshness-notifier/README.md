# Freshness Notifier Business Logic

This directory contains the business logic for managing freshness notifications and related settings.

## Overview

The Freshness Notifier service provides CRUD operations for:
- **Freshness items**: Track expiration dates and notification preferences for various items
- **Settings**: Manage terminal-specific notification configurations

## Architecture

The implementation follows a clean separation of concerns with composition over inheritance and dedicated data access components:

### Data Types
- `FreshnessDataType`: Represents a freshness item with name, expiry date, and notification settings
- `SettingDataType`: Represents notification settings for a specific terminal

### Record Types (DynamoDB)
- `FreshnessRecordType`: DynamoDB record format for freshness items
- `SettingRecordType`: DynamoDB record format for settings
- `FreshnessNotifierRecordTypeBase`: Base interface for all record types

### Core Components
- `FreshnessDataService`: Handles Freshness CRUD operations, extends `CRUDServiceBase`
- `FreshnessDataAccessor`: Dedicated data accessor for Freshness operations
- `SettingDataService`: Handles Setting CRUD operations, extends `CRUDServiceBase`
- `SettingDataAccessor`: Dedicated data accessor for Setting operations
- `FreshnessNotifierService`: Orchestrates both DataServices using composition

### Architecture Benefits
- Each data type has its own dedicated DataAccessor extending `DataAccessorBase`
- Better separation of concerns between data access and business logic
- Improved maintainability with focused responsibilities
- Follows composition over inheritance principles

## Usage

```typescript
import FreshnessNotifierService from '@freshness-notifier/services/FreshnessNotifierService';

// Create service
const service = new FreshnessNotifierService();

// Create a freshness item
await service.createFreshness({
  id: 'unique-id',
  name: 'Milk',
  expiryDate: '2024-01-15',
  notificationEnabled: true,
  create: Date.now(),
  update: Date.now()
});

// Get all freshness items
const items = await service.getFreshness();

// Get freshness item by ID
const item = await service.getFreshnessById('unique-id');

// Create notification settings
await service.createSetting({
  id: 'setting-id',
  terminalId: 'terminal-123',
  subscriptionEndpoint: 'https://...',
  subscriptionKeysP256dh: 'key...',
  subscriptionKeysAuth: 'auth...',
  notificationEnabled: true,
  notificationTime: 9, // 9 AM
  create: Date.now(),
  update: Date.now()
});

// Get settings by terminal ID
const setting = await service.getSettingByTerminalId('terminal-123');

// Get all settings
const settings = await service.getSettings();
```

## Testing

The module includes comprehensive Jest-based unit tests to ensure quality and reliability.

### Running Tests

```bash
npm test
```

### Test Structure

Tests are located in the `tests/` directory and follow the naming convention `*.test.ts`.

#### Business Logic Tests

The business logic patterns are thoroughly tested with:
- Data creation patterns and default value validation
- Update timestamp behavior verification  
- ID generation uniqueness and format validation
- Data type compliance and interface contract verification

#### Interface Tests

The data type interfaces are thoroughly tested with:
- Type validation and structure verification
- Property type checking
- Data integrity validation

```typescript
// Example test structure
describe('Business Logic Validation', () => {
  describe('Data Creation Patterns', () => {
    it('should create freshness items with proper structure and defaults', () => {
      // Test implementation verifying data creation logic
    });
  });
});
```

### Test Configuration

Jest is configured with:
- TypeScript support via ts-jest
- Module path mapping for `@freshness-notifier` and `@common` imports
- Node.js test environment
- Automatic mocking of dependencies

## Database Tables

The services use environment-aware table naming:
- Development: `DevFreshnessNotifier`
- Production: `FreshnessNotifier`

Both data types are stored in the same table using different `DataType` values:
- Freshness items: `DataType = 'Freshness'`
- Settings: `DataType = 'Setting'`