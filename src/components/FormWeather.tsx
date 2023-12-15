import { IoSearch } from "react-icons/io5";

type FormProps = {
  isDesktopOrLaptop: boolean;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
};

const FormWeather = ({ isDesktopOrLaptop, submitHandler }: FormProps) => {
  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          className="search_input"
          name="city"
          type="text"
          placeholder="Wprowadź nazwę miasta"
        />
        <button className="search_btn">
          <IoSearch color="white" fontSize={16} />
        </button>
      </form>
    </>
  );
};

export default FormWeather;
