import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes  } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Basket from './Basket';

import profilePic from "../images/pic-person-01.jpg";

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
    it('contains the common Header', () => {
        renderWithRouter(<Basket />, {
            route: '/basket',
            state: { user: {
                userId: "1",
                first_name: "Brain",
                last_name: "Kibugi",
                basket: [],
                image: profilePic,},
            }}
        );

        expect(screen.getByRole('heading', { name: 'Fresh Fetch'})).toBeInTheDocument();
    });

    it('contains the user profile section', () => {
        renderWithRouter(<Basket />, {
            route: '/basket',
            state: { user: {
                userId: "1",
                first_name: "Brain",
                last_name: "Kibugi",
                basket: [],
                image: profilePic,},
            }}
        );

        expect(screen.getByLabelText('User Profile')).toBeInTheDocument();
    })

    it('Contains the profile component', () => {
        renderWithRouter(<Basket />, {
            route: '/basket',
            state: { user: {
                userId: "1",
                first_name: "Brain",
                last_name: "Kibugi",
                basket: [],
                image: profilePic,},
            }}
        );

        expect(screen.getByLabelText('Profile')).toBeInTheDocument();
    });

    it('Contains the Basket header', () => {
        renderWithRouter(<Basket />, {
            route: '/basket',
            state: { user: {
                userId: "1",
                first_name: "Brain",
                last_name: "Kibugi",
                basket: [],
                image: profilePic,},
            }}
        );

        expect(screen.getByRole('heading', { name: 'Basket'})).toBeInTheDocument();
        
    });

    it('Has the item count', () => {
        renderWithRouter(<Basket />, {
            route: '/basket',
            state: { user: {
                userId: "1",
                first_name: "Brain",
                last_name: "Kibugi",
                basket: [],
                image: profilePic,},
            }}
        );

        expect(screen.getByLabelText("Item count")).toBeInTheDocument();
    });

    it('Contains the order all button', () => {
        renderWithRouter(<Basket />, {
            route: '/basket',
            state: { user: {
                userId: "1",
                first_name: "Brain",
                last_name: "Kibugi",
                basket: [],
                image: profilePic,},
            }}
        );

        expect(screen.getByRole('button', { name: 'Order all'})).toBeInTheDocument();
    });

    it('Contains the order elements that have not been sent out yet', () => {
        renderWithRouter(<Basket />, {
            route: '/basket',
            state: { user: {
                userId: "1",
                first_name: "Brain",
                last_name: "Kibugi",
                basket:  [
                    {
                        id: "1",
                        name: "Heirloom tomato",
                        pic: profilePic,
                        price: 0,
                        pricePerPound: "5.99",
                        quantity: 1,
                        status: null,
                        vendor: "Wall-mart",
                    },
                ],
                image: profilePic,},
            }}
        );

        expect(screen.getAllByLabelText('Unmade order').length).toBeGreaterThanOrEqual(0);
    })

    it('Inititally contains no order elements that are sent out and are\
        pending/cancelled', () => {
    
            renderWithRouter(<Basket />, {
                route: '/basket',
                state: { user: {
                    userId: "1",
                    first_name: "Brain",
                    last_name: "Kibugi",
                    basket: [],
                    image: profilePic,},
                }}
            );

        expect(screen.queryAllByLabelText('Pending/Cancelled order')).toEqual([]);
    })

    it('Removes the unmade order when an remove is pressed on orders', () => {
        renderWithRouter(<Basket />, {
            route: '/basket',
            state: { user: {
                userId: "1",
                first_name: "Brain",
                last_name: "Kibugi",
                basket:  [
                    {
                        id: "1",
                        name: "Heirloom tomato",
                        pic: profilePic,
                        price: 0,
                        pricePerPound: "5.99",
                        quantity: 1,
                        status: null,
                        vendor: "Wall-mart",
                    },
                ],
                image: profilePic,},
            }}
        );
        const preOrdersInitialLength = screen.queryAllByLabelText('Unmade order').length;
        const removeBtns = screen.queryAllByRole('button', {name: 'Remove'})

        act(() => {
            preOrdersInitialLength >= 1 && userEvent.click(removeBtns[0]);
        })
        expect(screen.queryAllByLabelText('Unmade order').length).toEqual(preOrdersInitialLength - 1);
    })
    
    // it('Displays an informative message when there is nothing in\
    //     unmadeOrders', async () => {
    //     render(<BrowserRouter>
    //                 <Basket />
    //             </BrowserRouter>
    //     );

    //     const removeBtns = screen.queryAllByRole('button', {name: 'Remove'})

    //     act(async () => {
    //         for (const btn of removeBtns) {
    //             userEvent.click(btn);
    //         }
    //     });

    //     screen.debug();

    //     await expect(screen.queryAllByLabelText('Unmade order').length).toBe(0);

    //     expect(screen.getByRole('paragraph', { name: 'Looks like there\
    //         is nothing in your basket' })).toBeInTheDocument();
    // })

    // it('Removes the pending order when cancel is pressed on orders', () => {
    //     renderWithRouter(<Basket />, {
    //         route: '/basket',
    //         state: {
    //             userId: "1",
    //             first_name: "Brain",
    //             last_name: "Kibugi",
    //             basket: [],
    //             image: profilePic,},
    //     });

    //     const pendingOrdersInitialLength = screen.queryAllByLabelText('Pending/Cancelled order').length;
    //     const removeBtns = screen.queryAllByRole('button', {name: 'Cancel'})

    //     act(() => {
    //         pendingOrdersInitialLength >= 1 && userEvent.click(removeBtns[0]);
    //     })

    //     if (pendingOrdersInitialLength == 0) {
    //         expect(screen.queryAllByLabelText('Pending/Cancelled order').length).toBe(0);

    //     } else {
    //         expect(screen.queryAllByLabelText('Pending/Cancelled order').length).toEqual(pendingOrdersInitialLength - 1 || 0);

    //     }
    // })

    // it('Removes all pending orders when cancel all is clicked' , () => {
    //     render(<BrowserRouter>
                //     <Basket />
                // </BrowserRouter>
        // );ROute

    //     const cancelAllBtn = screen.queryAllByRole('button', { name: 'Cancel All' });

    //     act(() => {
    //         userEvent.click(cancelAllBtn);
    //     })

    //     expect(screen.queryAllByLabelText('Pending/Cancelled order')).toBeNone();

    // })
});
