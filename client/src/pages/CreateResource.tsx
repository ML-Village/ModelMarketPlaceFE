import React, {useState} from 'react';
import { CreateNavBar } from '@/components/Navbar';
import { BiDumbbell } from "react-icons/bi";
import { FaBridge } from "react-icons/fa6";
import { HiArrowUpOnSquareStack } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type Status = {
    value: string
    label: string
}
const statuses: Status[] = [
    {
        value: "influence",
        label: "Influence",
    },
    {
        value: "lootsurvivor",
        label: "Loot Survivor",
    },
    {
        value: "pistolsat10blocks",
        label: "Pistols At 10 Blocks",
    },
    {
        value: "rollyourown",
        label: "Roll Your Own",
    },
    {
        value: "tsubasa",
        label: "Tsubasa",
    },
    {
        value: "pokemonshowdown",
        label: "Pokemon Showdown",
    },
    {
        value: "skystrife",
        label: "Sky Strife",
    },
]

export const CreateResource = () => {
    const [open, setOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(
        null
    )

    return (
        <div>
            <CreateNavBar />
            
            <div className="container mx-auto mt-5 border flex justify-between items-start
            px-10 py-4
            ">

                {/* functions div */}
                <div className="w-4/5 border border-orange-300
                flex flex-col justify-start items-center px-10
                ">
                    <div className="w-4/5 border my-2
                    text-3xl font-semibold">
                        Pick From A List of Available Project Contracts To Supply Model Training and Integration Resources To
                    </div>
                    
                    {/* list of shadcn popover */}
                    <div className="
                    border border-gray-300 w-4/5 rounded
                    flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground mx-2 px-2 w-[9rem]">Parent Project:</span>
                        <Popover 
                        open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" 
                                className="justify-start border border-red-300
                                w-full
                                ">
                                    {selectedStatus ? <>{selectedStatus.label}</> : <>+ Select Parent Project</>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0" side="bottom" align="start">
                                <Command className="">
                                    <CommandInput placeholder="Select Project..." />
                                    <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup>
                                        {statuses.map((status) => (
                                        <CommandItem
                                            key={status.value}
                                            value={status.value}
                                            onSelect={(value) => {
                                            setSelectedStatus(
                                                statuses.find((priority) => priority.value === value) ||
                                                null
                                            )
                                            setOpen(false)
                                            }}
                                        >
                                            {status.label}
                                        </CommandItem>
                                        ))}
                                    </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        </div>

                </div>

                {/* explanation div */}
                <div className="border rounded-lg w-[400px]
                px-10 py-10 bg-gray-300 ml-auto
                ">
                    
                    <p className="font-semibold text-lg">
                    If there is a Project Contract deployed, you'll be able to:
                    </p>

                    <p className="my-2 flex items-center gap-4 justify-between font-semibold text-black/70">
                        <div className="w-2/5 flex justify-center items-center text-xl"><BiDumbbell /></div>
                        <div className="">Register and Share Python Repositories/Libraries/APIs that provide state outcomes to help train agents and models for the project.</div>
                    </p>

                    <p className="my-2 flex items-center gap-4 justify-between font-semibold text-black/70">
                        <div className="w-2/5 flex justify-center items-center text-xl"><FaBridge /></div>
                        <div className="">Deploy and Register Cairo contracts that wrap around listed Giza/Orion Models and Agents so that they integrate back into the parent project contracts.</div>
                    </p>

                    <br></br>

                    <p className="font-semibold text-lg">
                    The community can:
                    </p>

                    <p className="my-2 flex items-center gap-4 justify-between font-semibold text-black/70">
                        <div className="w-2/5 flex justify-center items-center text-xl"><HiArrowUpOnSquareStack /></div>
                        <div className="">Upload, Register and List Models that work with the parent project contracts via Giza/Orion compiled Cairo code.</div>
                    </p>

                </div>

                

            </div>
        </div>
    )
}
