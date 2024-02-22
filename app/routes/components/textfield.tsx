interface TextFieldProps {
  htmlFor: string;
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange?: (...args: any) => any;
}

export function TextField({
  htmlFor,
  label,
  type = "text",
  value,
  placeholder,
  onChange = () => {},
}: TextFieldProps) {
  return (
    <label>
      <div className="flex items-center">
        <div className="w-1/6">
          <div className="px-2">
            {label.charAt(0).toUpperCase() + label.slice(1)}:
            <label
              htmlFor={htmlFor}
              className="text-gray-600 font-semibold bg-green-300 p-2 m-2 rounded transition duration-300 hover:bg-gray-300 w-80"
            >
              <label
                htmlFor={htmlFor}
                className="text-gray-600 font-semibold bg-green-300 p-2  rounded transition duration-300 hover:bg-gray-300 w-full"
              ></label>
            </label>
          </div>
          <input
            type={type}
            id={htmlFor}
            value={value}
            onChange={onChange}
            className="bg-gray-200 p-2 m-2 rounded transition duration-300 hover:bg-gray-300 w-80"
          />
        </div>
      </div>
    </label>
  );
}
