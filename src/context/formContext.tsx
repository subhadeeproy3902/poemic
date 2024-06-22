'use client'

import React, { createContext, useContext, useState } from "react";

const FormContext = createContext(
  {} as {
    formData: {
      text: string;
      images: string[];
    };
    updateForm: (key: string, value: any) => void;
  }
);

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] = useState({
    text: "Write a rhyming poem on this given picture. The poem should be of 3 para with a title, each line should contain rhymes.",
    images: [],
  });

  const updateForm = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: key === 'images' ? value : value.toString(),
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateForm }}>
      {children}
    </FormContext.Provider>
  );
};