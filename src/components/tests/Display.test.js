import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from '../Display';

import fetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');

const testShow = {
    name: 'Show Test',
    summary: 'This is a testing summary',
    seasons: [
        {
            id: 1,
            name: 'season One',
            episodes: []
        },
        {
            id: 2,
            name: 'season Two',
            episodes: []
        },
        {
            id: 3,
            name: 'season Three',
            episodes: []
        }
    ]
}

test('renders without error', () => {
    render(<Display/>);
});

test('renders Show component when button is clicked', async () => {
    fetchShow.mockResolvedValueOnce(testShow);
    render(<Display/>);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();
});

test('renders equal amount of seasons in test data when button is clicked', async () => {
    fetchShow.mockResolvedValueOnce(testShow);
    
    render(<Display/>);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const seasons = screen.queryAllByTestId('season-option');
        expect(seasons).toHaveLength(3);
    });
});

test('displayFunc is called when the fetch button is pressed', async () => {
    fetchShow.mockResolvedValueOnce(testShow);

    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc}/>);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    })
})













///Tasks:
//1. Add in necessary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.