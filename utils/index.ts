import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  const headers = {
    "X-RapidAPI-Key": "ea7e979bbfmsh9903b59bdaa952dp1d2db3jsnd9b21308f9a2",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&fuel_type=${fuel}&limit=${limit}`,
    {
      headers: headers,
    }
  );
  const result = await response.json();
  //   console.log("fetch successful")
  return result;
}

export const calculateRent = (year: number, transmission: string) => {
  // Define base rental rate (you can adjust this rate)
  const baseRate = 50; // Adjust based on your needs

  // Additional charges based on parameters
  let additionalCharges = 0;

  if (transmission === "m") {
    additionalCharges += 50; // No additional charges for compact cars
  } else if (transmission === "a") {
    additionalCharges += 100; // Additional charges for midsize cars
  }

  // Adjust rent based on the car's age (you can adjust depreciation)
  const currentYear = new Date().getFullYear();
  const carAge = currentYear - year;
  additionalCharges += carAge * 5; // Adjust based on your depreciation rate

  // Calculate total rent
  const totalRent = baseRate + additionalCharges;

  return totalRent;
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "hrjavascript-mastery" || "");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  //   url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (title: string, value: string) => {
  // const newPathname="";
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(title, value);
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};
