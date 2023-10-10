import { memo } from "react";

interface IProps {
  item: Item;
  onToggle: (id: number) => () => void;
}

const ListItem: React.FC<IProps> = memo(
  ({ item: { id, title, checked }, onToggle }) => {
    return (
      <li
        className={`flex items-center p-2 cursor-pointer ${
          checked ? "bg-gray-200" : ""
        }`}
        onClick={onToggle(id)}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {}}
          className="mr-2"
        />
        <span dangerouslySetInnerHTML={{ __html: title }}></span>
      </li>
    );
  }
);

export default ListItem;
