import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card component', () => {
   it('renders the component with the provided props', () => {
      const cardData = {
         _id: '1',
         name: 'John Doe',
         prompt: 'Test Prompt',
         photo: 'test.jpg',
      };

      render(<Card {...cardData} />);

      // Add your assertions based on how you expect the component to render
      expect(screen.getByAltText(/photo/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Prompt/i)).toBeInTheDocument();
      // Add more assertions as needed
   });

   it('calls downloadImage when the download button is clicked', () => {
      const cardData = {
         _id: '1',
         name: 'John Doe',
         prompt: 'Test Prompt',
         photo: 'test.jpg',
      };

      const mockDownloadImage = jest.fn();
      jest.mock('../utils', () => ({
         downloadImage: mockDownloadImage,
      }));

      render(<Card {...cardData} />);

      fireEvent.click(screen.getByAltText(/button/i));

      // Verify that downloadImage has been called with the correct arguments
      expect(mockDownloadImage).toHaveBeenCalledWith('1', 'test.jpg');
   });
});
