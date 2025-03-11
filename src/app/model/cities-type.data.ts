export interface CitiesType {
  name: string;
  local_names: {
    [language_code: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
