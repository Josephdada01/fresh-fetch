import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import PendingOrder from './PendingOrder';

import tomatoImg from '../images/tomato.jpg';

describe('<PendingOrder />', () => {
    const testOrder = {
        id: "1",
        productId: "1",
        name: "Heirloom tomato",
        pricePerPound: 5.99,
        vendor: "Wall-Mart",
        quantity: 1,
        price: 5.99,
        status: "Pending",
        pic: tomatoImg,
    };

    it('Contains an image with the write alt message', () => {
        render(<BrowserRouter>
                <PendingOrder order={testOrder} />
            </BrowserRouter>);

        expect(screen.getByAltText('produce')).toBeInTheDocument();
    });

    it('Contains the name of the produce', () => {
        render(<BrowserRouter>
                <PendingOrder order={testOrder} />
            </BrowserRouter>);

        expect(screen.getByRole('heading', {name: 'Heirloom tomato'})).toBeInTheDocument();
    })

    it('Contains the price of the produce', () => {
        render(<BrowserRouter>
                <PendingOrder order={testOrder} />
            </BrowserRouter>);

        expect(screen.getByText('Price: $5.99')).toBeInTheDocument();
    });

    it('Contains the vendor of the produce', () => {
        render(<BrowserRouter>
                <PendingOrder order={testOrder} />
            </BrowserRouter>);

        expect(screen.getByText('Vendor: Wall-Mart')).toBeInTheDocument();
    });

    it('Contains the Confirm and Cancel buttons', () => {
        render(<BrowserRouter>
                <PendingOrder order={testOrder} />
            </BrowserRouter>);

        expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('Contains the qunatity of the produce', () => {
        render(<BrowserRouter>
                <PendingOrder order={testOrder} />
            </BrowserRouter>);

        expect(screen.getByText('Quantity: 1 lbs')).toBeInTheDocument();
    });

    it('Contains the correct delivery status', () => {
        render(<BrowserRouter>
                <PendingOrder order={testOrder} />
            </BrowserRouter>);

        expect(screen.getByText('Pending')).toBeInTheDocument();
    });  
});
