import React, {useState} from 'react';
import { CreateNavBar } from '@/components/Navbar';

import { TbCircleNumber1, TbCircleNumber2,
    TbCircleNumber3, TbCircleNumber4 } from "react-icons/tb";


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

import { TextInput, FileInput, Label, Checkbox } from 'flowbite-react';
import { Check } from 'lucide-react';

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

export const CreateModel = () => {
    const [open, setOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(
        null
    )

    return (
        <div>
            <CreateNavBar title="Create Model for Project" />
            <div className="container mx-auto mt-5 flex justify-between items-start
            px-10 py-4
            ">
            
                {/* functions div */}
                <div className="w-4/5
                    flex flex-col justify-start items-center px-10 gap-4
                    ">
                        
                        {/* 1. select a project */}
                        <div className="w-4/5 my-4 flex gap-1 items-center
                            text-3xl font-semibold">
                        
                            <span className="text-4xl mr-4"><TbCircleNumber1/></span>
                            <span>Select a Project to associate your model with.</span>
                        </div>

                        {/* list of shadcn popover */}
                        <div className="
                        border border-black w-4/5 rounded overflow-hidden
                        flex items-center space-x-4">
                            <span className="text-sm text-muted-foreground mx-2 px-2 w-[9rem]
                            
                            ">Parent Project:</span>
                            <Popover 
                            open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" 
                                    className="justify-start
                                    w-full border-l-black rounded-none
                                    ">
                                        {selectedStatus ? <>{selectedStatus.label}</> : <>+ Select Parent Project</>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 bg-white" side="bottom" align="start">
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
                        
                        {/* image div of project cover */}
                        <div className="w-4/5 h-32 
                        border border-black/80 rounded-md">

                        </div>

                        {/* project address input */}
                        <div className="border border-black w-4/5 rounded-md">
                            <TextInput id="contractaddress" placeholder="Project Main Contract" addon="Project_Address" required />
                        </div>

                        {/* project url input */}
                        <div className="border border-black w-4/5 rounded-md">
                            <TextInput id="projectsite" placeholder="Project HomePage" addon="Project_URL" required />
                        </div>
                        

                        {/* 2. upload model to ipfs */}
                        <div className="w-4/5 mt-8 flex gap-1 items-center
                            text-3xl font-semibold">
                        
                            <span className="text-4xl mr-4"><TbCircleNumber2/></span>
                            <span>Upload Onnx Model to IPFS</span>
                        </div>
                        {/* project url input */}
                        <div className="border border-black w-4/5 rounded-md">
                            <TextInput id="modelname" placeholder="Model Name" addon="Model_Name" required />
                        </div>
                        <div className="w-4/5">
                            <div className="mb-2 block">
                                <Label htmlFor="file-upload" value="Upload Onnx Model to IPFS" />
                            </div>
                                <FileInput id="file-upload" />
                        </div>

                        {/* model upload button */}
                        <div className="flex w-4/5 ">
                            <button className="bg-blue-300 hover:bg-blue-500
                            font-semibold hover:text-white
                            px-4 py-2 rounded-md flex justify-center items-center
                            ">Upload Model to IPFS</button>
                        </div>

                        {/* 3. Set Sales Params */}
                        <div className="w-4/5 mt-8 flex gap-1 items-center
                            text-3xl font-semibold">
                        
                            <span className="text-4xl mr-4"><TbCircleNumber3/></span>
                            <span>Set Sales Terms and Parameters</span>
                        </div>

                        {/* model mint price input */}
                        <div className="border border-black w-4/5 rounded-md flex
                        items-center
                        ">
                            <Label className="px-4">Model Price</Label>
                            <input id="modelprice" type="number" step="0.01"
                            className="flex-grow text-end" 
                            name="modelprice" min="1"
                            />
                            <Label className="px-8">ETH</Label>
                        </div>

                        {/* Number of Units on Sale input */}
                        <div className="border border-black w-4/5 rounded-md flex
                        items-center
                        ">
                            <Label className="px-4">Max Supply</Label>
                            <input id="unitsonsale" type="number" step="1"
                            className="flex-grow text-end" 
                            name="unitsonsale" min="1"
                            />
                        </div>
                        
                        <div className="w-4/5 rounded-md flex
                        items-center">
                            <Checkbox className="text-4xl mx-4" id="unlimitedmint"/>
                            <Label className="text-lg" htmlFor="unlimitedmint">
                                Unlimited Mint
                            </Label>
                        </div>

                        {/* 3. Mint Model NFT */}
                        <div className="w-4/5 mt-8 flex gap-1 items-center
                            text-3xl font-semibold">
                        
                            <span className="text-4xl mr-4"><TbCircleNumber4/></span>
                            <span>Initialize Model Minting!</span>
                        </div>
                        
                        {/* model mint intialize button */}
                        <div className="flex w-4/5 ">
                            <button className="bg-green-300 hover:bg-green-500
                            font-semibold hover:text-white
                            px-4 py-2 rounded-md flex justify-center items-center
                            ">Initialize Model Mint!</button>
                        </div>



                    </div>

                {/* explanation div */}
                <div className="rounded-lg w-[400px]
                    px-10 py-10 bg-gray-300 ml-auto
                    ">

                    </div>
            </div>
        </div>
    )
}
