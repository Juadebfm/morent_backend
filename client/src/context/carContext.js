import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import placeholderImage from "../assets/images/carplaceholder.png";
import * as assetsImages from "../assets/assets";

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [recommendedCars, setRecommendedCars] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch cars from api

  const fetchCars = useCallback(async () => {
    setIsLoading(true);

    const requestObject = { method: "GET", redirect: "follow" };

    try {
      const response = await fetch(
        "https://morent-backend-zeta.vercel.app/api/cars",
        requestObject
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      const processedCars = processCarData(data);
      setCars(processedCars);

      // filter cars with a rating of 5 for recommendations
      const topRatedCars = processedCars.filter((car) => car.ratings === 5);
      setRecommendedCars(topRatedCars);
    } catch (error) {
      console.error("Error Fetching Car Data:", error);
      setError("Failed to fetch car data. Please try again later");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const processCarData = (carArray) => {
    return carArray.map((car) => {
      const validImage = car.img && car.img.startsWith("http") ? car.img : null;

      return {
        ...car,
        id: car._id || car.id,
        price: Number(car.price),
        image:
          assetsImages[validImage?.split("/")?.pop()?.split(".")[0]] ||
          validImage ||
          placeholderImage,
      };
    });
  };

  return (
    <CarContext.Provider
      value={{ cars, recommendedCars, isLoading, error, refetch: fetchCars }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => useContext(CarContext);
