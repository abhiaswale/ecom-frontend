import React from "react";

const Form = (props) => {
  return (
    <div className="flex justify-center items-center h-auto my-[5rem]">
      <div className="flex justify-center items-center flex-col w-2/5 text-sm h-auto  p-4">
        {props.children}
      </div>
    </div>
  );
};

export default Form;
