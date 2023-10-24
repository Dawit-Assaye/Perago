import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import randomcolor from "randomcolor";
// import faker from "faker";
import Boss from "../assets/avatar.png"
import "./chart.css"

interface Position {
  id: string;
  name?: string;
  description?: string;
  parent_id?: string;
  report_to?: string;
}

interface HierarchyNode {
  id: string;
  name: string;
  description: string;
  report_to: string;
  children: HierarchyNode[];
}

const defaultHierarchy:HierarchyNode[]=[];
const defaultPositions: Position[] = [];

interface ChartProps {
  hierarchy:HierarchyNode[];
  error: string;
}

// function randomIntFromInterval(min :number, max:number) {
//     // min and max included
//     return Math.floor(Math.random() * (max - min + 1) + min);
//   }
  
  const Card = ({ hierarchy ,error}: ChartProps) => {
    
    return (
      <ul>
        {hierarchy.map((position) => (
          <Fragment key={position.id}>
            <li className="hover:cursor-pointer ">
              <div className="card w-48 mx-auto ">
                <div className="image">
                  <img className="border-green-700" src={Boss} alt="Profile" />
                </div>
                <div className="card-body  w-full shadow-md shadow-green-700">
                  <h4 className="text-xl text-green-600 font-semibold">
                    {position.name}
                  </h4>
                  <p className="font-semibold">{position.description}</p>
                  {/* <p>{position.report_to}</p> */}
                </div>
                <Link
                  to={`/position/detail/${position.id}`}
                  className="bg-green-600 w-full shadow-md shadow-green-700 rounded-b-sm"
                >
                  <div className="card-footer w-full ">
                    <p className="text-black text-sm">
                      Click here to see more details
                    </p>
                  </div>
                </Link>
                <div></div>
              </div>
              {position.children?.length > 0 && (
                <Card hierarchy={position.children} error={error} />
              )}
            </li>
          </Fragment>
        ))}
      </ul>
    );
  };
  
const Chart = ({ hierarchy, error }: ChartProps) => {
    return (
      //       <div className="bg-white w-4/5 m-auto">
      // //       <div className="font-bold text-green-700"> Home</div>
   
        <div className="org-tree flex flex-col items-center justify-center mt-5">
          <h1 className="text-5xl text-green-600 font-semibold w-fit mx-auto p-3">
            Organizational Hierarchy
          </h1>

          <Card hierarchy={hierarchy} error={error}/>
        </div>
    
      // </div>
    );
  };

  export default Chart;
  