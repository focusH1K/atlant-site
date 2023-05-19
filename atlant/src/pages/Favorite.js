import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import FavoriteList from "../components/FavoriteList";

const Favorite = () => {
    const { userId } = useParams()

    return (
        <>
        <h2 className="mt-3 ms-3">Избранное</h2>
        <FavoriteList userId={userId} />
        </>
    );
};

export default observer(Favorite);
