'use client';
import React from 'react';
import { Input } from './Input';

interface FormProps {
    inputFields: any[];
}

const Form = ({ inputFields }: FormProps) => {
  return (
    <form className="form w-full flex flex-col gap-[35px] h-[100%] justify-evenly">
        {inputFields.map((field : any , index : number) => (
            <Input
                key={index}
                index={index}
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                type={field.type}
                icon={field.icon}
                placeholder={field.placeholder}
                message={field.message}
            />
        ))}
    </form>
  );
};

export default Form;
