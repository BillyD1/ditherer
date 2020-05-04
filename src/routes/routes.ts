type Route = (...args: any[]) => string;

export const Routes: { [k in string]: Route } = {
  booklist: () => "/booklist",
  counter: () => "/counter",
  // Example of using parameters
  // counter: (counterId: string = "?") => `/counter/${id}`,
  root: () => "/",
};