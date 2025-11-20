import HeartBoldIcon from "@/assets/icons/heart-bold.svg";
import HeartEmptyIcon from "@/assets/icons/heart-empty.svg";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

interface ToggleFavoriteProps {
  isFavorite: boolean;
  noToggle?: boolean;
  onToggle: () => void;
}

const ToggleFavorite: React.FC<ToggleFavoriteProps> = ({
  isFavorite,
  noToggle,
  onToggle,
}) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    isFavorite && setFavorite(isFavorite);
  }, [isFavorite]);

  const handleToggle = () => {
    if (noToggle) {
      onToggle();
      return;
    }
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);
    onToggle();
  };

  return (
    <TouchableOpacity onPress={handleToggle}>
      {favorite ? <HeartBoldIcon /> : <HeartEmptyIcon />}
    </TouchableOpacity>
  );
};
export default ToggleFavorite;
