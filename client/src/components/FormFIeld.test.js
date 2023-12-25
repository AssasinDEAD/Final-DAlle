import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormField from './FormField';

describe('FormField component', () => {
   it('renders the component with the provided props', () => {
      const handleChange = jest.fn();
      const handleSurpriseMe = jest.fn();

      render(
         <FormField
            labelName="Test Label"
            type="text"
            name="testName"
            placeholder="Test Placeholder"
            value="Test Value"
            handleChange={handleChange}
            isSurpriseMe={true}
            handleSurpriseMe={handleSurpriseMe}
         />
      );

      // Add your assertions based on how you expect the component to render
      expect(screen.getByLabelText(/Test Label/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Test Placeholder/i)).toHaveValue('Test Value');
      // Add more assertions as needed
   });

   it('calls handleSurpriseMe when the "Удиви меня" button is clicked', () => {
      const handleChange = jest.fn();
      const handleSurpriseMe = jest.fn();

      render(
         <FormField
            labelName="Test Label"
            type="text"
            name="testName"
            placeholder="Test Placeholder"
            value="Test Value"
            handleChange={handleChange}
            isSurpriseMe={true}
            handleSurpriseMe={handleSurpriseMe}
         />
      );

      fireEvent.click(screen.getByText(/Удиви меня/i));

      // Verify that handleSurpriseMe has been called
      expect(handleSurpriseMe).toHaveBeenCalled();
   });
});
