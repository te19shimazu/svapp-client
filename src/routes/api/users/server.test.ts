import { GET, POST, PUT, DELETE } from './+server';

// データベース関連のモック
const mockDB = {
  prepare: jest.fn().mockReturnThis(),
  all: jest.fn(),
  run: jest.fn(),
  bind: jest.fn().mockReturnThis()
};

// platform オブジェクトのモック
const mockPlatform = {
  env: { DB: mockDB },
  context: { waitUntil: jest.fn() },
  caches: {} as CacheStorage & { default: Cache }
};

// RequestEvent型に適合するモックオブジェクト
const createMockRequestEvent = (request: Request, params = {}) => ({
  request,
  platform: mockPlatform,
  params,
  cookies: {
    getAll: jest.fn(),
    serialize: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  },
  fetch: jest.fn(),
  getClientAddress: () => '127.0.0.1',
  locals: {},
  navigation: jest.fn(),
  setHeaders: jest.fn(),
  waitUntil: jest.fn(),
  url: new URL(request.url),
  route: { id: 'mock-route-id' },
  isDataRequest: false,
  isSubRequest: false,
});

// テストの前に各モックをリセット
beforeEach(() => {
  jest.clearAllMocks();
});

// GET メソッドのテスト
test('GET returns user data', async () => {
  const request = new Request('http://localhost');
  const params = { id: '1' };
  mockDB.all.mockResolvedValue([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);

  const mockRequestEvent = createMockRequestEvent(request, params);
  const response = await GET(mockRequestEvent);
  expect(response).toBeInstanceOf(Response);
  const data = await response.json();
  expect(data).toEqual([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);
});

// POST メソッドのテスト
test('POST creates a new user', async () => {
  const userData = { name: 'Jane Doe', email: 'jane@example.com' };
  const request = new Request('http://localhost', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  const mockRequestEvent = createMockRequestEvent(request);
  mockDB.run.mockResolvedValue({});

  const response = await POST(mockRequestEvent);
  expect(mockDB.run).toHaveBeenCalled();
  expect(response).toBeInstanceOf(Response);
  const data = await response.json();
  expect(data).toEqual({ message: 'User created successfully' });
});

// PUT メソッドのテスト
test('PUT updates a user', async () => {
  const updatedData = { name: 'Jane Doe Updated', email: 'janeupdated@example.com' };
  const request = new Request('http://localhost', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  });
  const params = { id: '1' };

  const mockRequestEvent = createMockRequestEvent(request, params);
  mockDB.run.mockResolvedValue({});

  const response = await PUT(mockRequestEvent);
  expect(mockDB.run).toHaveBeenCalled();
  expect(response).toBeInstanceOf(Response);
  const data = await response.json();
  expect(data).toEqual({ message: 'User updated successfully' });
});

// DELETE メソッドのテスト
test('DELETE removes a user', async () => {
  const request = new Request('http://localhost', {
    method: 'DELETE'
  });
  const params = { id: '1' };

  const mockRequestEvent = createMockRequestEvent(request, params);
  mockDB.run.mockResolvedValue({});

  const response = await DELETE(mockRequestEvent);
  expect(mockDB.run).toHaveBeenCalled();
  expect(response).toBeInstanceOf(Response);
  const data = await response.json();
  expect(data).toEqual({ message: 'User deleted successfully' });
});
