import { memo } from "react";
import ListItem from "./list-item";

interface IProps {
  searchText: string;
  handleSearch: ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => void;
  listItems: Item[];
  handleItemToggle: (itemId: number) => () => void;
}

const ListContainer: React.FC<IProps> = memo(
  ({ searchText, handleSearch, listItems, handleItemToggle }) => {
    return (
      <div className="sm:w-8/12 w-full bg-gray-50 h-full mx-auto border rounded border-gray-400 px-6 pb-5 mix-blend-hue shadow-xl shadow-slate-300 md:w-7/12 lg:w-5/12">
        <h1 className="my-3 text-lg font-normal">Kategoriler</h1>
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          className="w-full border border-gray-400 p-2 rounded-md mb-4 shadow-md shadow-zinc-200"
          placeholder="kategori ara..."
        />
        <ul className="overflow-y-auto max-h-80 mb-5">
          {listItems.length ? (
            listItems.map((item) => (
              <ListItem key={item.id} item={item} onToggle={handleItemToggle} />
            ))
          ) : (
            <div>Sonuç Bulunamadı</div>
          )}
        </ul>
        <button className="w-full rounded bg-blue-700 px-6 py-2 text-xl font-light text-white">
          Ara
        </button>
      </div>
    );
  }
);

export default ListContainer;
