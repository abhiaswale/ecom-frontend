import React from "react";

const Form = (props) => {
  return (
    <div className="flex justify-center items-center h-auto mt-10">
      <div className="flex justify-center items-center flex-col w-2/5 h-auto border-2 border-black p-4">
        {props.children}
      </div>
    </div>
  );
};

export default Form;
