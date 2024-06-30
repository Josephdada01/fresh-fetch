import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import App from './App';

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

describe('<App /> when user is not logged in', () => {
  const history = createMemoryHistory();
  it('renders the Produce page by default', () => {
    render(<App />, {
      route: '/',
      state: null,
    });
    
    expect(screen.getByText(/Produce/)).toBeInTheDocument();
  });

  it('renders the default header', () => {
    render(<App />);

    expect(screen.getByRole('heading', {name: 'Fresh Fetch'})).toBeInTheDocument();

  });

  it('does not render the Basket button', () => {
    render(<App />);

    expect(screen.queryByRole('button', {name: /Basket(.)/})).toBeNull()
  });

  it('Renders the Login and Sign up buttons', () => {
    render(<App />);

    expect(screen.getByRole('button', {name: 'Login'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Signup'})).toBeInTheDocument();
  });
  

  it('does not render the User profile section', () => {
    render(<App />);

    expect(screen.queryByLabelText('User Profile')).toBeNull();
  });

  it('does not renders the Profile component', () => {
    render(<App />);
    expect(screen.queryByLabelText('Profile')).toBeNull();
  });

  it('does not render the logout button when user not loggged in', () => {
    render(<App />);
  
    expect(screen.queryByRole('button', {name: 'Logout'})).toBeNull();
  });
  
  it('Renders a search button', () => {
    render(<App />, {
      route: '/',
      state: null,
    });

    expect(screen.getByRole('button', { name: /Search/})).toBeInTheDocument();
  });

  it('Renders product element(s)', async () => {
    render(<App />, {
      route: '/',
      state: null,
    });

    const mockProducts = [
      {
        date_added: "2024-06-29T16:44:55.288252Z",
        description: "this is a descritpiton",
        id: "34237f81-da56-48ad-a798-2afa48fc2158",
        image: null,
        name: "Sweet onions",
        old_price: "0.00",
        paid_status: false,
        price: "2.77",
        product_status: "available",
        quantity: 0,
        user: "48a3a34a-6e65-4d3c-9e07-266e078007cd",
        vendor: "Johnny Walker",
      }
    ];

    const mockVendors = [
      {
        first_name: "Test",
        last_name: "Vendor",
        id: "48a3a34a-6e65-4d3c-9e07-266e078007cd",
      }
    ]

    fetch.mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      })
    }).mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockVendors),
      })
    });

    // fetch.get.mockImplementationOnce(() =>
    //   Promise.resolve({ data: { products: mockProducts}}))

    await waitFor(() => screen.getAllByLabelText('Produce item'));

    expect(screen.getAllByLabelText('Produce item').length).toBeGreaterThanOrEqual(1);
  });

  it('goes to the Login page when the login button is pressed', async () => {
    render(<App />);

    const button = screen.getByRole('button', { name : 'Login' })

    act(() => {
      userEvent.click(button);
    })

    await expect(window.location.href).toContain('/login');
  });

  it('gets a search input field when the search button is clicked', () => {
    render(<App />)
  });
  

  // it('goes to the signup page when the singup button is pressed', async () => {
  //   render(<App />);

  //   const button = screen.getByRole('button', { name : 'Signup' })

  //   act(() => {
  //     userEvent.click(button);
  //   })

  //   await expect(window.location.href).toContain('/signup');
  // });

  // it('goes to the Basket page when the Basket button is pressed', async () => {
  //   render(<App />);

  //   const button = screen.getByRole('button', { name: /Basket(.)/})

  //   act(() => {
  //     userEvent.click(button);
  //   });
  
  //   await expect(window.location.href).toContain('/basket');
  // })
});
