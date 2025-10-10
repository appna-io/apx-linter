import React, { useState } from 'react';

// Sample React component to test linting rules
interface Props {
    title: string;
    count?: number;
}

export const SampleComponent: React.FC<Props> = ({ title, count = 0 }) => {
    const [value, setValue] = useState(count);
    const unusedVariable = 'test'; // Should trigger unused-vars warning

    // This should trigger no-console warning
    console.log('Component rendered');

    const handleClick = () => {
        setValue(value + 1);
    };

    // Testing spacing and formatting rules
    const obj = { foo: 'bar', baz: 'qux' };
    const arr = [1, 2, 3];

    // Testing any type (should warn by default)
    const someValue: any = 'test';

    return (
        <div className="sample-component">
            <h1>{title}</h1>
            <p>Count: {value}</p>
            <button onClick={handleClick}>
                Increment
            </button>
        </div>
    );
};

export default SampleComponent;

