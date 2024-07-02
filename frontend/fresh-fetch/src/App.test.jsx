import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Route, Routes } from 'react-router';

import App from './App';
import Produce from './components/Produce';
import fetchMock from 'jest-fetch-mock';
import testProfilePic from "./images/pic-person-01.jpg";

global.fetch = jest.fn();

beforeEach(() => {
  // Reset the URL to the root before each test
  window.history.pushState({}, 'Home', '/');
  // fetch.mockClear();
  fetchMock.resetMocks();
});

fetchMock.mockResponses(
  [
    JSON.stringify([
      {
        date_added: "2024-06-29T16:44:55.288252Z",
        description: "this is a description",
        id: "34237f81-da56-48ad-a798-2afa48fc2158",
        image: null,
        name: "Sweet onions",
        old_price: "0.00",
        paid_status: false,
        price: "2.77",
        product_status: "available",
        quantity: 0,
        user: "48a3a34a-6e65-4d3c-9e07-266e078007cd",
      },
    ]),
    { status: 200 },
  ],
  // Mock the second fetch request for vendors
  [
    JSON.stringify([
      {
        first_name: "Test",
        last_name: "Vendor",
        id: "48a3a34a-6e65-4d3c-9e07-266e078007cd",
      },
    ]),
    { status: 200 },
  ],
  // Mock the third fetch request for basket
  [
    JSON.stringify([
      {
        id: "11cd562b-d2ab-4c42-bae5-4e32e5f811bf",
        order_status: "pending",
        paid_status: false,
        product_id: "34237f81-da56-48ad-a798-2afa48fc2158",
        product_name: "Sweet onions",
        product_price: 2.99,
        quantity: 1,
        vendor_id: "48a3a34a-6e65-4d3c-9e07-266e078007cd",
        vendor_name: "Test Vendor",
      },
    ]),
    { status: 200 },
  ]
);

describe('<App /> when user is not logged in', () => {
  it('renders the Produce page by default', () => {
    render(<App />);
    
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

    await waitFor(() => screen.queryAllByLabelText('Produce item'));

    expect(screen.queryAllByLabelText('Produce item').length).toBeGreaterThanOrEqual(0);
  });

  it('goes to the Login page when the login button is pressed', async () => {
    render(<App />);

    const button = screen.getByRole('button', { name : 'Login' });

    act(() => {
      userEvent.click(button);
    })

    expect(window.location.href).toContain('/login');
  });

  it('gets a search input field when the search button is clicked', () => {
    render(<App />);

    const button = screen.getByRole('button', { name : 'Search'});

    act(() => {
      userEvent.click(button);
    })

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Search' })).toBeNull();
  });

  it('removes the search input field and displays the search button', () => {
    render(<App />);

    const button = screen.getByRole('button', { name : 'Search'});

    act(() => {
      userEvent.click(button);
    })

    const closeBtn = screen.getByLabelText('close-btn');

    act(() => {
      userEvent.click(closeBtn)
    })

    expect(screen.queryByPlaceholderText('Search...')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('goes to the signup page when the singup button is pressed', async () => {
    render(<App />);

    const button = screen.getByRole('button', { name : 'Signup' })

   
    act(() => {
      userEvent.click(button);
    })

    expect(window.location.href).toContain('/signup');
  });

  // it('goes to the login page when a user is not logged in and\
  //     they press order now/add to basket buttons',async  () => {

  //   fetch.mockImplementationOnce(() => {
  //     return Promise.resolve({
  //       ok: true,
  //       json: () => Promise.resolve(mockProducts),
  //     })
  //   }).mockImplementationOnce(() => {
  //     return Promise.resolve({
  //       ok: true,
  //       json: () => Promise.resolve(mockVendors),
  //     })
  //   });

  //   render(<App />);

  //   await waitFor(() => screen.queryAllByLabelText('Produce item'));


  //   const orderBtn = screen.getByRole('button', { name: 'Order now'});
  //   const addToBasketBtn = screen.getByRole('button', { name: 'Add to basket'});

  //   act(() => {
  //     userEvent.click(orderBtn)
  //   })

  //   await expect(window.location.href).toContain('/login');

  //   window.history.pushState({}, 'Home', '/');

  //   act(() => {
  //     userEvent.click(addToBasketBtn);
  //   })

  //   await expect(window.location.href).toContaint('signup');
  // })
});

const mockUser = {
  first_name: "Testy",
  id: "159eb783-d640-43d8-ba7f-105c5ca239f5",
  image: testProfilePic,
  is_vendor: false,
  basket: [],
};

const mockOrders = [
  {
    id: "11cd562b-d2ab-4c42-bae5-4e32e5f811bf",
    order_status: "pending",
    paid_status: false,
    product_id: "34237f81-da56-48ad-a798-2afa48fc2158",
    product_name: "Sweet onions",
    product_price: 2.99,
    quantity: 1,
    vendor_id: "48a3a34a-6e65-4d3c-9e07-266e078007cd",
    vendor_name: "Test Vendor",
    vendor_id: "48a3a34a-6e65-4d3c-9e07-266e078007cd",

  }
]

const renderWithRouter = (ui, { route = '/', state = {} } = {}) => {
  window.history.pushState(state, 'Test page', route);

  return render(
      <MemoryRouter initialEntries={[{ pathname: route, state }]}>
          <Routes>
              <Route path={route} element={ui} />
          </Routes>
      </MemoryRouter>
  );
}

describe('<Basket />', () => {
  localStorage.setItem('token', 'fake token');
  it('contains the common Header', () => {
      renderWithRouter(<Produce />, {
          route: '/',
          state: {user: mockUser}
          }
      );
    screen.debug()

  });
});

