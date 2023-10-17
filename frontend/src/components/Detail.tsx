import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import Boss from "../assets/7309685.jpg";

interface Position {
  data: any;
}

const defaultPositions: Position = {
  data: undefined,
};

const Detail = () => {
  const { id } = useParams();
  const [position, setPosition] = useState(defaultPositions); //redux
  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = useState("");
  // Fetch the details of the position with the given ID from your data source or API

  useEffect(() => {
    axios
      .get<Position>(`http://localhost:3001/position/findchild/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // dispatch(setPositions(response.data));
        setPosition(response.data);
        console.log(response.data, "here");
        // setLoading(false);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((ex) => {
        console.log(ex);
        const error =
          ex.response && ex.response.status === 404
            ? "Resource Not found"
            : "An unexpected error has occurred";
        setError(error);
        // setLoading(false);

        // Simulate a loading duration of 2 seconds
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <div className="detail-container h-full">
      {loading ? (
        // Render the loading spinner when loading is true
        <div className="top-50% left-50%">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      ) : (
        <div className="detail bg-gray-400 w-3/4 mx-auto mt-4 ">
          <div className="top flex flex-row justify-center gap-2 p-7">
            <div className="img h-44 w-44">
              <img
                className="border-green-700 w-full h-full rounded-lg"
                src={Boss}
                alt="Profile"
              />
            </div>
            <div className="title pl-3 pt-2">
              <h1 className="name text-green-700 text-5xl font-bold">
                {position.data.name}
              </h1>
              <p className="description text-black-700 text-xl font-semiold">
                {position.data.description}
              </p>
            </div>
          </div>
          <div className="bottom ">
            <button className="update"></button>
            <button className="create"></button>
            <button className="delete"></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
