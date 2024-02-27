import React, {useState, useEffect} from 'react';
import { CreateNavBar } from '@/components/Navbar';

import { TbCircleNumber1, TbCircleNumber2,
    TbCircleNumber3, TbCircleNumber4 } from "react-icons/tb";

import { Status, statuses, projectParamMapping } from '@/constants/createresource_projectslist';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routing/routes';

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

import { TextInput, FileInput, Label, Checkbox, Spinner } from 'flowbite-react';
import { Check } from 'lucide-react';

export const CreateModel = () => {
    const [open, setOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(
        null
    )
    
    const [ project_address, setProjectAddress ] = useState<string|undefined>(undefined)
    const [ project_url, setProjectUrl ] = useState<string|undefined>(undefined)
    const [ project_cover_path, setProjectCover ] = useState<string|undefined>(undefined)
    
    const [showUploadModelSpinner, setShowUploadModelSpinner] = useState(false);
    const [showInitializeModelSpinner, setShowInitializeModelSpinner] = useState(false);

    const navigate = useNavigate();

    const delayUploadModelSpinner = () => {
        setShowUploadModelSpinner(true); // Show the spinner
    
        setTimeout(() => {
            setShowUploadModelSpinner(false); // Hide the spinner after 5 seconds
        }, 2000); // 2000 milliseconds = 2 seconds
    };

    const delayModelMintInitializeSpinner = () => {
        setShowInitializeModelSpinner(true); // Show the spinner
    
        setTimeout(() => {
            setShowInitializeModelSpinner(false); // Hide the spinner after 5 seconds
        }, 2000); // 2000 milliseconds = 2 seconds
    };

    useEffect(() => {
        setProjectAddress(selectedStatus ? projectParamMapping[selectedStatus.value]?.project_address : undefined)
        setProjectUrl(selectedStatus ? projectParamMapping[selectedStatus.value]?.project_url : undefined)
        setProjectCover(selectedStatus ? projectParamMapping[selectedStatus.value]?.project_cover_path : undefined)
    },[selectedStatus])

    return (
        <div className="pb-20">
            <CreateNavBar title="Create Model for Project" />
            <div className="container flex items-start justify-between px-10 py-4 mx-auto mt-5 ">
            
                {/* functions div */}
                <div className="flex flex-col items-center justify-start w-4/5 gap-4 px-10 ">
                        
                        {/* 1. select a project */}
                        <div className="flex items-center w-4/5 gap-1 my-4 text-3xl font-semibold">
                        
                            <span className="mr-4 text-4xl"><TbCircleNumber1/></span>
                            <span>Select a Project to associate your model with.</span>
                        </div>

                        {/* list of shadcn popover */}
                        <div className="flex items-center w-4/5 space-x-4 overflow-hidden border border-black rounded ">
                            <span className="text-sm text-muted-foreground mx-2 px-2 w-[9rem]
                            
                            ">Parent Project:</span>
                            <Popover 
                            open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" 
                                    className="justify-start w-full rounded-none border-l-black ">
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
                        <div className="w-4/5 h-32 border rounded-md border-black/80 bg-black cursor-pointer"
                            style={{backgroundImage: `url(${project_cover_path})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center center"
                                    }}
                            onClick={()=>navigate(ROUTES.project+`/${selectedStatus?.value}`)}
                        >

                        </div>

                        {/* project address input */}
                        <div className="w-4/5 border border-black rounded-md">
                            <TextInput id="contractaddress" placeholder="Project Main Contract" addon="Project_Address" value={project_address}  />
                        </div>

                        {/* project url input */}
                        <div className="w-4/5 border border-black rounded-md">
                            <TextInput id="projectsite" placeholder="Project HomePage" addon="Project_URL" value={project_url}/>
                        </div>
                        

                        {/* 2. upload model to ipfs */}
                        <div className="flex items-center w-4/5 gap-1 mt-8 text-3xl font-semibold">
                        
                            <span className="mr-4 text-4xl"><TbCircleNumber2/></span>
                            <span>Upload Onnx Model to IPFS</span>
                        </div>
                        {/* project url input */}
                        <div className="w-4/5 border border-black rounded-md">
                            <TextInput id="modelname" placeholder="Model Name" addon="Model_Name" required />
                        </div>
                        <div className="w-4/5">
                            <div className="block mb-2">
                                <Label htmlFor="file-upload" value="Upload Onnx Model to IPFS" />
                            </div>
                                <FileInput id="file-upload" />
                        </div>

                        {/* model upload button */}
                        <div className="flex w-4/5 items-center gap-4">
                            <button className="flex items-center justify-center px-4 py-2 font-semibold bg-blue-300 
                            rounded-md hover:bg-blue-500 hover:text-white "
                            onClick={delayUploadModelSpinner}
                            >Upload Model to IPFS</button>
                            <Spinner className={`${!showUploadModelSpinner? "hidden":""}`} size="xl" color="info"/>
                        </div>

                        {/* 3. Set Sales Params */}
                        <div className="flex items-center w-4/5 gap-1 mt-8 text-3xl font-semibold">
                        
                            <span className="mr-4 text-4xl"><TbCircleNumber3/></span>
                            <span>Set Sales Terms and Parameters</span>
                        </div>

                        {/* model mint price input */}
                        <div className="flex items-center w-4/5 border border-black rounded-md ">
                            <Label className="px-4">Model Price</Label>
                            <input id="modelprice" type="number" step="0.01"
                            className="flex-grow text-end" 
                            name="modelprice" min="1"
                            />
                            <Label className="px-8">ETH</Label>
                        </div>

                        {/* Number of Units on Sale input */}
                        <div className="flex items-center w-4/5 border border-black rounded-md ">
                            <Label className="px-4">Max Supply</Label>
                            <input id="unitsonsale" type="number" step="1"
                            className="flex-grow text-end" 
                            name="unitsonsale" min="1"
                            />
                        </div>
                        
                        <div className="flex items-center w-4/5 rounded-md">
                            <Checkbox className="mx-4 text-4xl" id="unlimitedmint"/>
                            <Label className="text-lg" htmlFor="unlimitedmint">
                                Unlimited Mint
                            </Label>
                        </div>

                        {/* 3. Mint Model NFT */}
                        <div className="flex items-center w-4/5 gap-1 mt-8 text-3xl font-semibold">
                        
                            <span className="mr-4 text-4xl"><TbCircleNumber4/></span>
                            <span>Initialize Model Minting!</span>
                        </div>
                        
                        {/* model mint intialize button */}
                        <div className="flex w-4/5 items-center gap-4">
                            <button className="flex items-center justify-center px-4 py-2 
                            font-semibold bg-green-300 rounded-md hover:bg-green-500 hover:text-white
                            "
                            onClick={delayModelMintInitializeSpinner}
                            >Initialize Model Mint!</button>
                            <Spinner className={`${!showInitializeModelSpinner?"hidden":""}`} size="xl" color="success"/>
                        </div>



                    </div>

                {/* explanation div */}
                <div className="rounded-lg w-[400px]
                    px-10 py-10 bg-gray-300 ml-auto
                    ">
                        <p className="flex font-semibold text-lg gap-2 my-2 mb-4">
                            <TbCircleNumber1 className="text-7xl"/>
                            <div>Select from a list of Registerd Parent Projects to associate your model collection to.</div>
                        </p>

                        <p className="flex font-semibold text-lg gap-2 my-2 mb-4">
                            <TbCircleNumber2 className="text-3xl"/>
                            <div>Upload a game agent model to IPFS.</div>
                        </p>

                        <p className="my-2 flex items-center gap-4 justify-between font-semibold text-black/70">
                            <div className="w-2/5 flex justify-center items-center text-xl"></div>
                            <div className="">Once you have uploaded the model and received the model URI link, our backend will initialize Giza backend to 
                            convert your model to Cairo code and upload that to IPFS as well.
                            </div>
                        </p>

                        <p className="flex font-semibold text-lg gap-2 my-2 mb-4">
                            <TbCircleNumber3 className="text-8xl"/>
                            <div>To start creating your model collection for listing and sale, enter the sales parameters and initialize mint.</div>
                        </p>

                        <p className="my-2 flex items-center gap-4 justify-start font-semibold text-black/70">
                            <div className="w-2/5 flex justify-center items-center text-xl"></div>
                            <div className="">The action of initializing mint here will cause the Project Registration Contract to deploy an 
                            NFT contract that points to the parent project registration ID and contract address. This helps prove ownership of model and 
                            usage in parent game sessions.
                            </div>
                        </p>

                        <p className="my-2 flex items-center gap-4 justify-start font-semibold text-black/70">
                            <div className="w-1/5 flex justify-center items-center text-xl"></div>
                            <div className="">You can then click on the project cover to view your model 
                            collection under the project page in the Marketplace.
                            </div>
                        </p>

                    </div>
            </div>
        </div>
    )
}
