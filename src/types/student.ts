export interface Student {
    Id: string;
    FullName: string;
    Email: string;
    Role: "Student";
    CreatedAt: string;
}

export interface LostFoundItem {
    Id: string;
    Title: string;
    Description: string;
    Location: string;
    Type: "Lost" | "Found";
    CreatedAt: string;
}

export interface TeamFinderPost {
    Id: string;
    Title: string;
    Description: string;
    NeededMembers: number;
    Skill: string;
    CreatedAt: string;
}
