const maps = {
    kamehouse: {
        north: "satancity"
    },
    satancity: {
        north: "jingerucity",
        west: "centralcapital",
        south: "kamehouse",
        northeast: "eastcapital",
        southeast: "papayaisland"
    },
    eastcaptital: {
        southwest: "satancity"
    },
    papayaisland:{
        northwest: "satancity"
    },
    jingeruvillage:{
        west: "northcapital",
        south: "satancity"
    },
    pilafcastle:{
        north: "centralcapital"
    },
    centralcapital:{
        north: "northcapital",
        west: "gingertown",
        south: "pilafcastel",
        east: "satancity"
    },
    northcapital:{
        west: "yunzabitheight",
        south: "centralcapital",
        east: "jingeruvillage"
    },
    baserucity:{
        north: "gingertown",
        west: "redribbon",
        southwest: "primaljungle"
    },
    gingertown:{
        west: "karinland",
        south: "baserucity",
        east: "centralcapital",
        northeast: "northcapital"
    },
    yunzabitheight:{
        west: "muscletower",
        east: "northcapital"
    },
    primaljungle:{
        northeast: "baserucity"
    },
    redribbon:{
        east: "baserucity"
    },
    karinland:{
        north: "muscletower",
        east: "gingertown"
    },
    musclwtower:{
        south: "karinland",
        east: "yunzabitheight"
    }
}