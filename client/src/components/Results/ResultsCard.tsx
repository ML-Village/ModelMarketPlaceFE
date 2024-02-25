import React from 'react';
import { Card } from 'flowbite-react';
import { Badge } from 'flowbite-react';
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export const ResultsCard = ({
    projectcoverurl,
    modelname,
    description,
    creator,
    creatorrating,
    efficiency,
    floorprice,
    remaining,
    tags
    }) => {
    return (
        <Card
                            
                            className="max-w-sm overflow-hidden cursor-pointer"
                            renderImage={() => 
                            <img className="cursor-pointer" width={500} height={500} src={projectcoverurl} alt="image 1" />
                            
                        }
                            >
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {modelname}
                            </h5>

                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {description}
                            </p>

                            <p className="flex flex-col flex-wrap justify-center">
                                <span>
                                    <span className="mr-1 font-semibold">Creator:</span>
                                    <span className="cursor-pointer border border-gray-300 rounded-md px-2 py-1
                                    bg-yellow-100
                                    ">
                                        {creator}</span>
                                </span>
                                <span className="flex items-center">
                                    <span className="mr-1 font-semibold">Creator Rating:</span>
                                    <span className="flex flex-nowrap text-yellow-500">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStarHalfAlt />
                                        <FaRegStar />
                                    </span>
                                </span>

                                <span className="flex items-center">
                                    <span className="mr-1 font-semibold">Efficiency:</span>
                                    <span className="">{efficiency}</span>
                                </span>

                                <span className="">
                                    <span className="mr-1 font-semibold">Floor Price:</span>
                                    <span>{floorprice}</span>
                                </span>

                                <span className="">
                                    <span className="mr-1 font-semibold">Remaining Mint:</span>
                                    <span>{remaining}</span>
                                </span>
                            </p>

                            <p className="flex flex-wrap items-center">
                                <span className="mr-1 font-semibold">Tags:</span>
                                <Badge className="w-fit cursor-pointer"
                                color="warning">mining</Badge>
                            </p>
                        </Card>
    )
}
