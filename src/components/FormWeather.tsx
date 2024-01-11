import { IoSearch } from "react-icons/io5";
import { store } from "../store/store";
import { setCity } from "../store/features/weatherSlice";

const FormWeather = () => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const city = formData.get("city");
    if (city !== "" && city !== null) {
      store.dispatch(setCity(city));
    }
  };
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
