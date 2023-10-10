import { useCallback, useState } from "react";
import ListContainer from "./components/list-container";
import useList from "./hooks/use-list";

export default function App() {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
      setSearchText(value),
    []
  );

  const { listItems, handleItemToggle, isLoading, isError } = useList({
    searchText,
    initialSelected: [10, 62, 34],
  });

  if (isLoading) return <div>yükleniyor...</div>;
  if (isError) return <div>hata</div>;

  return (
    <div className="container mx-auto p-4">
      <ListContainer
        listItems={listItems}
        searchText={searchText}
        handleSearch={handleSearch}
        handleItemToggle={handleItemToggle}
      />
    </div>
  );
}
