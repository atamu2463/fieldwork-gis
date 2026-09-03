export type Point = {
     id: string;
     name: string;
     category: string;
     memo: string;
     surveyedAt: string;
     latitude: number;
     longitude: number
}

export type PointFormValues = {
     name: string;
     category: string;
     memo: string;
     surveyedAt: string;
}