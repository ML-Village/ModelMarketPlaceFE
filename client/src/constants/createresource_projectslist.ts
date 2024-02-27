export type Status = {
    value: string
    label: string
}

export const statuses: Status[] = [
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
    {
        value: "none",
        label: "none",
    },
]

export const projectParamMapping = {
    influence: {
        project_address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        project_name: "Influence",
        project_url: "https://www.influenceth.io/",
        project_cover_path: "/gameimages/influence.png",
    },
    lootsurvivor: {
        project_address: "0x0158160018d590d93528995b340260e65aedd76d28a686e9daa5c4e8fad0c5dd",
        project_name: "Loot Survivor",
        project_url: "https://survivor.realms.world/",
        project_cover_path: "/gameimages/lootsurvivor.jpeg",
    },
    pistolsat10blocks: {
        project_address: "0x01b9feadb8e14e50048637b1ef96f16ffc10065ef5cdb88eed4198306b3c6926",
        project_name: "Pistols At 10 Blocks",
        project_url: "https://pistols.lootunder.world/",
        project_cover_path: "/gameimages/pistols10.jpeg",
    },
    rollyourown: {
        project_address: "0x01b9feadb8e14e50048637b1ef96f16ffc10065ef5cdb88eed4198306b3c6926",
        project_name: "Roll Your Own",
        project_url: "https://rollyourown.preview.cartridge.gg/",
        project_cover_path: "/gameimages/ryocover.png",
    },
    tsubasa: {
        project_address: "0x06a9f9de2d75e4ac8748f7ebed1beda236cb19a0b8447de001e280538aea633f",
        project_name: "Tsubasa",
        project_url: "https://play.tsubasa.win/",
        project_cover_path: "/gameimages/tsubasa.jpeg",
    },
    pokemonshowdown: {
        project_address: "0x044dcac024427434e0d4fa51c827f6af52dcff5904f14f9cd2cf2682e0ccd3f9",
        project_name: "Pokemon Showdown",
        project_url: "https://pokemonshowdown.com/",
        project_cover_path: "/gameimages/pokemonshowdown.jpg",

    },
    skystrife: {
        project_address: "0x05ebd0c9b1e800030a7b6d5b30b6ac7f8ef546aebf249e8635feed34aeb66829",
        project_name: "Sky Strife",
        project_url: "https://skystrife.xyz/",
        project_cover_path: "/gameimages/skystrife.png",
    },
    none: {
        project_address: "",
        project_name: "",
        project_url: "",
        project_cover_path: "",
    },
}