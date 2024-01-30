import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import AllUser from './AllUsers';

jest.mock('./../../../../../hooks/admin/useAllUser', () => ({
  __esModule: true,
  default: jest.fn(() => [[], false, jest.fn()]),
}));

describe('AllUser Component', () => {
  it('renders component without crashing', async () => {
    await act(async () => {
      render(
        <Router>
          <AllUser />
        </Router>
      );
    });

    expect(screen.getByText(/Manage All Users/i)).toBeInTheDocument();
  });

  it('displays loading state when data is loading', async () => {
    await act(async () => {
      render(
        <Router>
          <AllUser />
        </Router>
      );
    });

    expect(screen.getByTestId('loading-animation')).toBeInTheDocument();
  });

  it('displays user data when loading is complete', async () => {
    const mockUsers = [
      { _id: '1', name: 'User1', email: 'user1@example.com', role: 'Admin' },
      { _id: '2', name: 'User2', email: 'user2@example.com', role: 'User' },
    ];

    jest.mock('./../../../../../hooks/admin/useAllUser', () => ({
      __esModule: true,
      default: jest.fn(() => [mockUsers, false, jest.fn()]),
    }));

    await act(async () => {
      render(
        <Router>
          <AllUser />
        </Router>
      );
    });

    expect(screen.getByText(/User1/i)).toBeInTheDocument();
    expect(screen.getByText(/User2/i)).toBeInTheDocument();
  });
});
