// import "./chart.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";


import Charts from "./Chart";
import FirstTime from "./FirstTime";
import { Loader } from "@mantine/core";

interface Position {
  id: string;
  name?: string;
  description?: string;
  report_to?: string;
  parent_id: string | null;
}

const defaultPositions: Position[] = [];

interface HierarchyNode {
  id: string;
  name: string;
  description: string;
  children: HierarchyNode[];
  report_to: string;
}

function Home() {
  const [positions, setPositions] = useState(defaultPositions); //redux
  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = useState("");

  function convertToHierarchy(inputArray: Position[]) {
    // Create a mapping from id to node object for efficient access.
    const idToNode: Record<string, HierarchyNode> = {};
    inputArray.forEach((item) => {
      idToNode[item.id] = {
        id: item.id,
        name: item.name || "",
        description: item.description || "",
        report_to: item.report_to || "",
        children: [],
      };
    });
    // Build the hierarchy.
    const hierarchy: HierarchyNode[] = [];
    inputArray.forEach((item) => {
      if (item.parent_id === null) {
        hierarchy.push(idToNode[item.id]);
      } else if (idToNode[item.parent_id]) {
        idToNode[item.parent_id].children.push(idToNode[item.id]);
      }
    });

    return hierarchy;
  }

  const hierarchy = convertToHierarchy(positions);

  // Output the hierarchy
  console.log(hierarchy, "hierarchy");

  useEffect(() => {
    axios
      .get<Position[]>("http://localhost:3001/position/list", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // dispatch(setPositions(response.data));
        setPositions(response.data);
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
  setTimeout(() => {
    setLoading(false);
  }, 1000);
      });
  }, []);
  console.log(positions, "raw position");

  console.log("it is working");
  return (
    <div>
      {loading ? (
        // Render the loading spinner when loading is true

        <div className="absolute left-1/2 top-1/2">
          <Loader color="green" size="xl" type="bars" />
        </div>
      ) : // <ThreeDots
      //   height="80"
      //   width="80"
      //   radius="9"
      //   color="#4fa94d"
      //   ariaLabel="three-dots-loading"
      //   wrapperStyle={{}}
      //   visible={true}
      // />

      hierarchy.length > 0 ? (
        
        <div className="chart-container w-4/5 mx-auto">
          <Charts hierarchy={hierarchy} error={error}/>
        </div>
      ) : (
        <FirstTime />
      )}
    </div>
  );
}

export default Home;
