import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { ThreeDots } from "react-loader-spinner";
import {
  Button,
  Text,
  Loader,
  Divider,
  Alert,
  Card,
} from "@mantine/core";
import Boss from "../assets/avatar.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectPosition, deletePosition } from "../ducks/rawPositionSlice";
import Position from "./Position";

interface Position {
  data: any;
}

const defaultPositions: Position = {
  data: undefined,
};

const Detail = () => {
  const { id } = useParams();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);

  //redux
  const dispatch = useDispatch();
  const positions = useSelector(selectPosition);

  const [position, setPosition]:[any,(position:any)=>any] = useState(defaultPositions);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = useState("");

  const handleDeleteButtonClick = () => {
    setIsAlertVisible(true);
  };

  // Fetch the details of the position with the given ID from your data source or API
  // Find the specific position by ID
  const positionRedux = positions.find((item) => item.id === id);
    
    useEffect(() => {
      console.log("useState starting")
      if (typeof positionRedux === null) {
        console.log("detailllll",positionRedux)
        
        // Cast positionRedux to the Position type
        const positionData: Position = { data: positionRedux };

        setPosition(positionData);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }else{
      console.log("in tje axios")
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

        // Simulate a loading duration of 2 seconds
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    }
  }, [positionRedux]);

  const navigate = useNavigate();

  //Handlers

  const updateHandler = () => {
    if (position.data.parent_id === null) {
      navigate(`/position/updateroot/${position.data.id}`);
    } else {
      navigate(
        `/position/updatechild/${position.data.id}/${position.data.parent_id}`
      );
    }
  };

  const createHandler = () => {
    navigate(`/position/subsidiary/${position.data.id}`);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/position/${id}`
      );
      console.log("Response from the API:", response.data);
      dispatch(deletePosition(id))

      toast.success("Position deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });

      setIsDeleteConfirmed(true);
      navigate("/");
    } catch (error) {
      console.error("Error deleting the node:", error);

      toast.error("An error occurred while deleting the node", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsAlertVisible(false);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="h-full">
      {loading ? (
        // Render the loading spinner when loading is true
        <div className="absolute left-1/2 top-1/2">
          <Loader color="green" size="xl" type="bars" />
        </div>
      ) : (
        <Card
          shadow="sm"
          // padding="md"
          radius="md"
          withBorder
          className="w-4/5 mx-auto my-auto h-auto overflow-y-visible"
        >
          {/* <Text size="xl" fw={900} variant="filed" color="green.8">
            Detail Information
          </Text> */}
          <div className="top flex flex-col justify-start gap-6 p-4 md:flex-row md:justify-start">
            <div className="img h-52 w-52">
              <img
                className="border-green-600 w-full h-full rounded-lg  "
                src={Boss}
                alt="Profile"
              />
            </div>

            {/* <Divider size="sm" orientation="vertical" color="green" /> */}

            <div className="title pl-3 pt-2">
              <h1
                className="name text-green-700 text-5xl font-bold"
                // size="xl"
                // fw={700}
                // variant="filed"
                // color="green"
              >
                {position.data.name}
              </h1>
              <h3 className="description text-black-700 text-xl font-semiold">
                {position.data.description}
              </h3>
            </div>
          </div>

          <div className="bottom flex flex-col flex-wrap justify-start md:h-auto gap-6 align-top md:flex-row md:justify-center ">
            <Button
              className="update"
              variant="outline"
              color="blue"
              onClick={updateHandler}
            >
              Update Role
            </Button>
            <Button
              className="create"
              variant="outline"
              color="green"
              onClick={createHandler}
            >
              Create Subsidiary Role
            </Button>
            <Button
              onClick={handleDeleteButtonClick}
              variant="outline"
              color="red"
            >
              Delete Role
            </Button>

            {isAlertVisible && (
              <div className="absolute right-5 top-5">
                <Alert
                  title="Warning"
                  color="red"
                  onClose={() => setIsAlertVisible(false)}
                >
                  <Text>
                    Deleting this Position will result in losing the hierarchy
                    below this Position.
                  </Text>
                  <div className="flex justify-between flex-wrap">
                    <Button
                      onClick={handleConfirmDelete}
                      color="red"
                      variant="filled"
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={() => setIsAlertVisible(false)}
                      color="gray"
                      variant="filled"
                    >
                      Cancel
                    </Button>
                  </div>
                </Alert>
              </div>
            )}
          </div>
        </Card>
      )}
    </Card>
  );
};

export default Detail;
