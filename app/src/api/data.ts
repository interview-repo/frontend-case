import { data } from "../assets/items.json";

declare global {
  interface Item {
    id: number;
    title: string;
    checked: boolean;
  }
}

export default async function fakeFetchData() {
  return new Promise<Item[]>((resolve) => {
    setTimeout(
      () =>
        resolve(
          data.map((title, index) => ({
            id: index,
            title: title,
            checked: false,
          }))
        ),
      1000
    );
  });
}
