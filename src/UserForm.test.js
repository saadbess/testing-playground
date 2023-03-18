// UserForm.test.js

// The role of each testing library in React.

/* 

- @testing-library/react: Uses ReactDOM to render a component.
- @testing-library/user-event: Helps simulate user input like typing and clicking.

# Behind the scenes:

- @testing-library/dom: Helps to find elements that are rendered by our components. Comes with '@testing-library/react'.
- Jest: Testing framework used to run the tests and report results.
- jsdom: Simulates a browser when running in a Node environment.

*/

import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

// TEST #1
test('it shows two inputs and a button', () => {
  render(<UserForm />);
         
  /*
  	Manipulate the component or find an element using
    query functions screen.getAllByRole & screen.getByRole
  */
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');
  
  /*
  	Assertion - make sure the component is doing what we expect it to do.
    
    The expect() function is provided by the Jest testing
    framework. It's a global var so doesn't need to be imported.
    
    .toHaveLength() matcher comes from Jest.
    
  	.toBeInTheDocument() matcher comes from React Testing Library (jest-dom).
  */
  
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

// TEST #2
test('it should call onUserAdd when the form is submitted', async () => {
  // Using a mock function from Jest
  const mock = jest.fn();
  // Try to render the component
  render(<UserForm onUserAdd={mock} />);
  
  // Find the two inputs
  const nameInput = screen.getByRole('textbox', {
    name: /name/i,
  });
  const emailInput = screen.getByRole('textbox', {
    name: /email/i,
  });
  
  // Simulate typing in a name
  await user.click(nameInput);
  await user.keyboard('saad');
  
  // Simulate typing in an email
  await user.click(emailInput);
  await user.keyboard('saad@gmail.com');
  
  // Find the button
  const button = screen.getByRole('button');
  
  // Simulate clicking the button to submit the form
  await user.click(button);
  
  // Assertion to make sure 'onUserAdd' gets called with email/name
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: 'saad', email: 'saad@gmail.com' });
});