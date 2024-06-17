export interface Hero {
    id: number;
    name: string;
    attributeType: string;
    theme: string;
    tag: string;
    shortDescription: string;
    description: string;
    realName: string;
    history1: string;
    history2: string;
    history3: string;
    history4: string;
    profilePic: string;
    bodyPic: string;
    attributePic: string;
    starred: boolean;
    winRates: any;
    pickRates: any;
}

export interface Account {
    username: string;
    accPassword: string;
    displayName: string;
    dateOfBirth: string;
    profile: string;
    favourites: any;
}

export interface Item {
    name: string;
    cost: string;
    bonus: string;
    active: string;
    passive: string;
    icon: string;
    description: string;
}

export interface Location {
    id: string;
    title: string;
    venue: string;
    champion: string;
    prizePool: string;
    date: string;
    lat: number;
    lng: number;
}