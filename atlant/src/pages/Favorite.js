import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import FavoriteList from "../components/FavoriteList";

const Favorite = () => {
    const { userId } = useParams()

    return (
        <FavoriteList userId={userId} />
    );
};

export default observer(Favorite);
