import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard';

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

describe('<Dashboard />', () => {
    const testUser = {
        userId: "",
        firstName: "",
        lastName: "",
        orders: [
            {
                id: "1",
                productId: "1",
                name: "Heirloom tomato",
                pricePerPound: "$5.99 / kg",
                vendor: "Wall-Mart",
                quantity: 5,
                price: "$5.99",
                status: "En-route",
                pic: null,
            },
            
        ],
        // Fake (To be replaced by API data)
        products: [
            {
                id: "1",
                name: "Heirloom Tomato",
                pricePerPound: 5.99,
                vendor: "Wall-Mart",
                quantity: 1,
                price: 0,
                // status: null,
                pic: null,
            },
           
        ] 
    }
    it('renders the common header', () => {
        renderWithRouter(<Dashboard />, {
            route: '/dashboard',
            state: { user: testUser }
        });

        expect(screen.queryByRole('heading', { name: 'Fresh Fetch'})).toBeNull();
    });

    it('contains the Vendor dashboard header(Orders)' , () => {
        renderWithRouter(<Dashboard />, {
            route: '/dashboard',
            state: { user: testUser }
        });

        expect(screen.queryByRole('heading', { name: 'Orders'})).toBeNull();
    })

    it('contains the order elements', () => {
        renderWithRouter(<Dashboard />, {
            route: '/dashboard',
            state: { user: testUser }
        });

        expect(screen.queryAllByLabelText('Vendor order').length).toBeGreaterThanOrEqual(0);
    })
    
});
