export interface GraphsModel {
    _id: string;
    name: string;
    description: string;
    date: Date;
    dataType: string;
    dataVisualisation: string;
    state: string;
    data: object;
}
